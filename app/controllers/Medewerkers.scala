package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import models.Medewerker

object Medewerkers extends Controller {

  def listAll = Action {
  	val mdws = Medewerker.findAll()
	  val json = com.codahale.jerkson.Json.generate(mdws)
    Ok(json).as(JSON)
  }

  def get(id:Long) = Action {
    val mdw = Medewerker.byId(id)
    val json = com.codahale.jerkson.Json.generate(mdw)
    Ok(json).as(JSON)
  }

}
