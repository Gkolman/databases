
DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE `rooms` (
  `id` SERIAL PRIMARY KEY,
  `roomname` Varchar(255),
  `time_created` TIMESTAMP
);

CREATE TABLE `users` (
  `id` SERIAL PRIMARY KEY,
  `username` varchar(255),
  `time_created` TIMESTAMP
);

CREATE TABLE `messages` (
  `id` SERIAL PRIMARY KEY,
  `text` varchar(255) ,
  `roomname_id` varchar(255),
  `user_id` varchar(255),
  `time_created` TIMESTAMP
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

