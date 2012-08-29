# --- First database schema
 
# --- !Ups

CREATE SEQUENCE medewerkers_id_seq;
CREATE TABLE medewerkers (
  id                        integer NOT NULL DEFAULT nextval('medewerkers_id_seq'),
  voornaam                  VARCHAR(255) NOT NULL,
  achternaam                VARCHAR(255) NOT NULL
);

insert into medewerkers(voornaam,achternaam) values ('Koos','Koets');
insert into medewerkers(voornaam,achternaam) values ('Fred','Flintstone');
 
# --- !Downs
 
DROP TABLE IF EXISTS medewerkers;
DROP SEQUENCE medewerkers_id_seq;

