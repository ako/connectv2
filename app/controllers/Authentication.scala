package controllers

import play.api.Logger
import play.api._
import libs.json.{Json, JsValue}
import libs.ws
import play.api.mvc._
import play.api.libs.openid._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.concurrent._
import play.api.libs.ws.WS

/**
 * Created with IntelliJ IDEA.
 * User: akoelewijn
 * Date: 9/1/12
 * Time: 5:26 PM
 * To change this template use File | Settings | File Templates.
 */
object Authentication extends Controller {

  val clientId = "672117013692-pnps2esp4nh7ejcjbb79mta6cdtb7sel.apps.googleusercontent.com"
  //  val email = "672117013692-pnps2esp4nh7ejcjbb79mta6cdtb7sel@developer.gserviceaccount.com"
  val secret = "0TCVA2LxmErvylnRrcNkR7qH"
  var redirectUri = "http://connectv2.herokuapp.com/login/callback"
  var jsOrigin = "http://connectv2.herokuapp.com"


  def login = Action {
    request =>
      Logger.info("login: " + request.domain + ", " + request.host)

      if (request.domain.equals("localhost")) {
        redirectUri = "http://localhost:9000/login/callback"
        jsOrigin = "http://localhost:9000/"
      }
      val scope = "https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
      val state = "/profile"

      Ok(views.html.login(clientId, redirectUri, scope, state))
  }

  def callback() = Action {
    request =>
      Logger.info("callback after oauth2 login: " + request)
      var queryString: Map[String, scala.Seq[String]] = request.queryString
      Logger.info("queryString: " + queryString)
      val code: String = queryString.get("code").get(0)
      val state: String = queryString.get("state").get(0)

      Logger.info("code: " + code + ", state: " + state)
      var accessToken: String = null
      var username: String = null
      if (state.equals("/profile")) {
        if (request.domain.equals("localhost")) {
          redirectUri = "http://localhost:9000/login/callback"
          jsOrigin = "http://localhost:9000/"
        }
        accessToken = getAccessToken(code)
        username = getUsername(accessToken)
        Logger.info("username: " + username)
      }
      Logger.info("done: " + accessToken)
      //Ok(views.html.auth("hi there!" + accessToken))
      Redirect("http://" + request.host + "/assets/app2/connect.html").withSession("access_token" -> accessToken)
  }

  def getAccessToken(code: String): String = {
    Logger.info("getAccessToken")

    val promise: Promise[ws.Response] = WS.url("http://accounts.google.com/o/oauth2/token").post(
      Map("code" -> Seq(code)
        , "client_id" -> Seq(clientId)
        , "client_secret" -> Seq(secret)
        , "redirect_uri" -> Seq(redirectUri)
        , "grant_type" -> Seq("authorization_code")
      ))
    val tokenBody = promise.value.get.body
    val json: JsValue = Json.parse(tokenBody)
    val access_token = json.\("access_token").as[String]
    val id_token = (json \ "id_token").as[String]
    Logger.info("tokens: " + access_token + ", " + id_token)
    return access_token.toString()
  }

  def getUsername(accessToken: String): String = {
    Logger.info("getUsername: " + accessToken)

    val promise: Promise[ws.Response] = WS.url("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken).get()
    Logger.info("get")
    val body = promise.value.get.body
    Logger.info("body: " + body)
    //    Logger.info(body.toString())
    //    val json: JsValue = Json.parse(tokenBody)
    //    val access_token = json.\("access_token")
    //    val id_token = json \ "id_token"
    //    Logger.info("tokens: " + access_token + ", " + id_token)
    //    return access_token.toString()
    (Json.parse(body) \ "name").as[String]
  }

}
