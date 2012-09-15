# --- First database schema
 
# --- !Ups

CREATE SEQUENCE medewerkers_id_seq;
CREATE TABLE medewerkers (
  id                        integer NOT NULL DEFAULT nextval('medewerkers_id_seq'),
  voornaam                  VARCHAR(255) NOT NULL,
  achternaam                VARCHAR(255) NOT NULL
);

create table timesheets (
	medewerker_id	integer not null,
	jaar			integer not null,
	maand			integer not null,
	project         varchar(255) not null,
	uren_dag_1      integer not null,
	uren_dag_2      integer not null
);

create table accounts (
    id                      varchar(255) not null,
    firstname               varchar(255) not null,
    lastname                varchar(255) not null,
    email                   varchar(255) not null
);

create sequence action_id_seq;
create table actions (
    id                      integer not null default nextval('action_id_seq'),
    omschrijving            varchar(255) not null
);

insert into medewerkers(voornaam,achternaam) values ('Koos','Koets');
insert into medewerkers(voornaam,achternaam) values ('Fred','Flintstone');
insert into timesheets(medewerker_id,jaar,maand,project,uren_dag_1,uren_dag_2) values(1,2012,8,'Herbouw connect',8,7);
insert into timesheets(medewerker_id,jaar,maand,project,uren_dag_1,uren_dag_2) values(1,2012,8,'Mobile client',1,1);

# --- !Downs

DROP TABLE IF EXISTS timesheets;
DROP TABLE IF EXISTS medewerkers;
DROP SEQUENCE medewerkers_id_seq;
drop table if exists accounts;
drop table if exists actions;
drop sequence action_id_seq;

