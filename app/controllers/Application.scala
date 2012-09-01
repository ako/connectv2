package controllers

import play.api._
import play.api.mvc._
import play.api.libs.openid._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.concurrent._

object Application extends Controller {

  def index = Action {
    Ok("HelloWorld!")
  }

  def test1() = Action {
    Ok("test1")
  }

  def test2(name: String) = Action {
    Ok("test2" + name)
  }

  def login = Action {
    request =>
      Logger.info("login: " + request.domain + ", " + request.host)
      val clientId = "672117013692-pnps2esp4nh7ejcjbb79mta6cdtb7sel.apps.googleusercontent.com"
      val email = "672117013692-pnps2esp4nh7ejcjbb79mta6cdtb7sel@developer.gserviceaccount.com"
      val secret = "0TCVA2LxmErvylnRrcNkR7qH"
      var redirectUri = "http://connectv2.herokuapp.com/login/callback"
      var jsOrigin = "http://connectv2.herokuapp.com"

      if (request.domain.equals("localhost")) {
        redirectUri = "http://localhost:9000/login/callback"
        jsOrigin = "http://localhost:9000/"
      }
      val scope = "https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
      val state = "/profile"
      Ok(views.html.login(clientId, redirectUri, scope, state))
  }

  def callback = Action {
    Ok(views.html.auth())
  }

}