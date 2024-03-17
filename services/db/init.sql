CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION inc(val integer) RETURNS varchar AS $$
DECLARE
   DB_VERSION  numeric;
BEGIN
	UPDATE spc.settings SET value=$1+1 WHERE spc.settings.key='ver';
	SELECT spc.settings.value::INTEGER into DB_VERSION from spc.settings WHERE spc.settings.key='ver';
	RETURN CAST(DB_VERSION as varchar);
END; $$
LANGUAGE PLPGSQL;


DO $$
DECLARE
   DB_VERSION  varchar;
BEGIN
IF EXISTS (
   SELECT 1
   FROM   information_schema.tables 
   WHERE  table_schema = 'spc'
   AND    table_name = 'settings'
   ) THEN
	SELECT spc.settings.value::INTEGER into DB_VERSION from spc.settings WHERE spc.settings.key='ver';
ELSE 
   SELECT '0'::INTEGER into DB_VERSION;
END IF;

IF DB_VERSION='0' THEN
  --- VERSION 1
  CREATE SCHEMA IF NOT EXISTS spc;

  CREATE TABLE spc."user" ( 
    id serial NOT NULL,
    user_name varchar(25),
    password_salt varchar(256) NOT NULL,
    password_hash varchar(256) NOT NULL,
    first_name varchar(64),
    last_name varchar(64),
    tel varchar(256),
    custom_password bool DEFAULT true,
    id_user_role integer,
    CONSTRAINT user_pk PRIMARY KEY (user_name),
    CONSTRAINT "user name is unique" UNIQUE (user_name)
  );

  CREATE TABLE spc.patient ( 
    id serial NOT NULL,
    first_name varchar(64),
    last_name varchar(64),
    egn varchar(10),
    born timestamp,
    patient_data jsonb,
    diagnosis integer,
    parent integer,
    CONSTRAINT patient_pk PRIMARY KEY (egn),
    CONSTRAINT "egn is unique" UNIQUE (egn)
  );

  CREATE TABLE spc.user_role (
    id serial NOT NULL,
    name varchar(128),
    CONSTRAINT user_role_pk PRIMARY KEY (id)
  );

  CREATE TABLE spc.diagnosis (
    id serial NOT NULL,
    code VARCHAR(10),
    name varchar(128),
    CONSTRAINT diagnosis_pk PRIMARY KEY (code),
    CONSTRAINT "code is unique" UNIQUE (code)
  );

  CREATE TABLE spc.patient_user (
    patient_egn varchar(10) NOT NULL, 
    user_name varchar(25) NOT NULL, 
    PRIMARY KEY (patient_egn, user_name), 
    FOREIGN KEY (patient_egn) REFERENCES spc.patient(egn), 
    FOREIGN KEY (user_name) REFERENCES spc."user"(user_name)
  );

  CREATE  TABLE spc.settings ( 
    "key"                varchar  NOT NULL  ,
    "value"              varchar    ,
    CONSTRAINT pk_settings PRIMARY KEY ( "key" )
   );

  ALTER TABLE spc."user" ADD CONSTRAINT user_role_fk FOREIGN KEY (id_user_role)
  REFERENCES spc.user_role (id) MATCH FULL
  ON DELETE SET NULL ON UPDATE CASCADE;

  INSERT INTO spc.user_role (id, name) VALUES (E'1', E'Администратор');
  INSERT INTO spc.user_role (id, name) VALUES (E'2', E'Родител');
  INSERT INTO spc.user_role (id, name) VALUES (E'3', E'Терапевт');

  INSERT INTO spc."user"("user_name","password_salt","password_hash","first_name","last_name","tel","id_user_role")
	VALUES
	(E'admin@spectar.com',E'12cc275d2469f1abf91395448df3561c5fee500659a25d3fadb06bee89afbeb7',E'dbdc35ef62999370e2eaf258bc76e50b02cb6d832ee9eee7cc9ec36a56a0113c',E'Admin',E'Adminov',E'666',1);

  INSERT INTO spc.diagnosis (code, name) VALUES (E'F20.0',E'Параноидна Шизофрения');

	INSERT INTO spc.settings (key, value) VALUES (E'ver', E'1');
  -- END VERSION 1
END IF;

DROP FUNCTION inc(integer);
END $$;
