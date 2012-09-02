# --- First database schema
 
# --- !Ups

CREATE SEQUENCE medewerkers_id_seq;
CREATE TABLE medewerkers (
  id                        integer NOT NULL DEFAULT nextval('medewerkers_id_seq'),
  voornaam                  VARCHAR(255) NOT NULL,
  achternaam                VARCHAR(255) NOT NULL
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
 
# --- !Downs
 
DROP TABLE IF EXISTS medewerkers;
DROP SEQUENCE medewerkers_id_seq;
drop table if exists accounts;
drop table if exists actions;
drop sequence action_id_seq;

