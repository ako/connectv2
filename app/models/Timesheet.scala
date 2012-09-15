package models

import play.api.db._
import play.api.Play.current

import anorm._
import anorm.SqlParser._

case class Timesheet(medewerkerid: Long, jaar:Long, maand:Long,project:String,urenDag1:Int,urenDag2:Int)

object Timesheet {

  val simple = {
      get[Long]("medewerker_id") ~
      get[Long]("jaar") ~
      get[Long]("maand") ~
      get[String]("project") ~
      get[Int]("uren_dag_1") ~
      get[Int]("uren_dag_2") map {
      case medewerker_id ~ jaar ~ maand ~ project ~ uren_dag_1 ~ uren_dag_2 =>
        Timesheet(medewerker_id, jaar, maand, project, uren_dag_1, uren_dag_2)
    }
  }


  def findAll(): Seq[Timesheet] = {
    DB.withConnection { implicit connection =>
      SQL("select * from timesheets").as(Timesheet.simple *)
    }
  }
/*
  def create(medewerker: Medewerker): Unit = {
    DB.withConnection { implicit connection =>
      SQL("insert into medewerker(voornaam) values ({voornaam})").on(
        'voornaam -> medewerker.voornaam
      ).executeUpdate()
    }
  }
  */
  def byJaarMaand(jaar:Int,maand:Int): Seq[Timesheet] = {
    DB.withConnection { implicit connection =>
      SQL("select * from timesheets where maand = {maand} and jaar = {jaar}")
        .on('jaar -> jaar)
        .on('maand -> maand)
        .as(Timesheet.simple *)
    }

  }

}