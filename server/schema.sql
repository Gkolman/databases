
DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE `rooms` (
  `id` SERIAL PRIMARY KEY,
  `roomName` Varchar(255),
  `time_created` TIMESTAMP
);

CREATE TABLE `users` (
  `id` SERIAL PRIMARY KEY,
  `user` varchar(255),
  `time_created` TIMESTAMP
);

CREATE TABLE `messages` (
  `id` SERIAL PRIMARY KEY,
  `text` varchar(255) ,
  `roomname_id` INTEGER REFERENCES rooms(id),
  `user_id` INTEGER REFERENCES users(id),
  `time_created` TIMESTAMP
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

