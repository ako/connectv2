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

  def test2(name:String) = Action {
    Ok("test2" + name)
  }

  def login = Action {
    Ok(views.html.login())
  }

  def loginPost = Action { implicit request =>
    Form(single(
      "openid" -> nonEmptyText
    )).bindFromRequest.fold(
      error => {
        Logger.info("bad request " + error.toString)
        BadRequest(error.toString)
      },
      {
        case (openid) => AsyncResult(OpenID.redirectURL(openid, routes.Application.openIDCallback.absoluteURL())
            .extend( _.value match {
                case Redeemed(url) => Redirect(url)
                case Thrown(t) => Redirect(routes.Application.login)
            }))
      }
    )
  }

  def openIDCallback = Action { implicit request =>
    AsyncResult(
      OpenID.verifiedId.extend( _.value match {
        case Redeemed(info) => Ok(info.id + "\n" + info.attributes)
        case Thrown(t) => {
          // Here you should look at the error, and give feedback to the user
          Redirect(routes.Application.login)
        }
      })
    )
  }

}