package models
 
import play.api.db._
import play.api.Play.current
 
import anorm._
import anorm.SqlParser._

case class Medewerker(id: Pk[Long], voornaam: String, achternaam: String)

object Medewerker {
 
  val simple = {
    get[Pk[Long]]("id") ~
      get[String]("voornaam") ~
      get[String]("achternaam") map {
        case id ~ voornaam ~ achternaam => Medewerker(id, voornaam, achternaam)
      }
  }

 
  def findAll(): Seq[Medewerker] = {
    DB.withConnection { implicit connection =>
      SQL("select * from medewerkers").as(Medewerker.simple *)
    }
  }
 
  def create(medewerker: Medewerker): Unit = {
    DB.withConnection { implicit connection =>
      SQL("insert into medewerker(voornaam) values ({voornaam})").on(
        'voornaam -> medewerker.voornaam
      ).executeUpdate()
    }
  }

  def byId(id:Long): Medewerker = {
    DB.withConnection { implicit connection =>
      SQL("select * from medewerkers where id = {id}")
      .on('id -> id)
      .as(Medewerker.simple single)
    }

  }
 
}
