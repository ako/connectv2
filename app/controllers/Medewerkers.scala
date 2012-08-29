package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import models.Medewerker

object Medewerkers extends Controller {

  def listAll = Action {
//    Ok("""
//   {'medewerkers':[
//        {'medewerker':{'id':"1",'voornaam':"Pietje",'achternaam':"Puck"}},
//        {'medewerker':{'id':"2",'voornaam':"Koos",'achternaam':"Koets"}}
//    ]}
//    """).as(JSON)
/*
    val mdws = Json.toJson(
      Seq(
        Map(
            "id" -> Json.toJson(1),
            "voornaam" -> Json.toJson("Koos"),
            "achternaam" -> Json.toJson("Koets")
        ),
        Map(
            "id" -> Json.toJson(2),
            "voornaam" -> Json.toJson("Pietje"),
            "achternaam" -> Json.toJson("Puck")
        ),
        Map(
            "id" -> Json.toJson(3),
            "voornaam" -> Json.toJson("Donald"),
            "achternaam" -> Json.toJson("Duck")
        )
      )
    )
*/
	val mdws = Medewerker.findAll()
	val json = com.codahale.jerkson.Json.generate(mdws)
    Ok(json).as(JSON)
  }

  def get(id:Long) = Action {
//    Ok("""{medewerker:{id:"%d",voornaam:"Koos",achternaam:"Koets"}}""".format(id)).as(JSON)
//    Ok("""medewerker:{voornaam:"Koos"}""").as(JSON)
//    val mdw = Json.toJson(
//        Map(
//            "id" -> Json.toJson(id),
//            "voornaam" -> Json.toJson("Koos" + id),
//            "achternaam" -> Json.toJson("Koets" + id)
//        )
//    )
    val mdw = Medewerker.byId(id)
    Logger.info("medewerker: " + mdw)
    val json = com.codahale.jerkson.Json.generate(mdw)
    Logger.info("medewerker: " + json)
    Ok(json).as(JSON)
  }

}
