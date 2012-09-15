package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import models.{Timesheet}

object Timesheets extends Controller {

  def listAll = Action {
  	val sheets = Timesheet.findAll()
	  val json = com.codahale.jerkson.Json.generate(sheets)
    Ok(json).as(JSON)
  }

  def get(jaar:Int,maand:Int) = Action {
    val sheets = Timesheet.byJaarMaand(jaar,maand)
    val json = com.codahale.jerkson.Json.generate(sheets)
    Ok(json).as(JSON)
  }

}
