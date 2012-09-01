package controllers

import play.api._
import play.api.mvc._


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

}