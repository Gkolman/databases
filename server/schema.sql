CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (

  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user` INTEGER NULL DEFAULT NULL,
  `message` INTEGER NULL DEFAULT NULL,
  `roomName ` INTEGER NULL DEFAULT NULL,
  `timeCreated ` INTEGER NULL DEFAULT NULL,

  PRIMARY KEY (`id`)

  /* Describe your table here.*/
);

CREATE TABLE users (

  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `User Names` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)

  /* Describe your table here.*/
);


CREATE TABLE rooms (

  `id` INTEGER NULL AUTO_INCREMENT DEFAULT 1,
  `Room names ` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

