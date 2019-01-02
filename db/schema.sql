CREATE DATABASE gooderreads_db;
USE gooderreads_db;

-- MySQL dump 9.11
--
-- Host: localhost    Database: Book-Crossing
-- ------------------------------------------------------
-- Server version	4.0.20a-debug

--
-- Table structure for table users
--

CREATE TABLE users (
  `User-ID` int(11) NOT NULL default '0',
  `Location` varchar(250) default NULL,
  `Age` int(11) default NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword varchar`(255) NOT NULL,
  `userEmail varchar`(255) NOT NULLF
  PRIMARY KEY  (`User-ID`)
) ENGINE=MyISAM;

--
-- Table structure for table books
--

CREATE TABLE books (
  `ISBN` varchar(13) binary NOT NULL default '',
  `Book-Title` varchar(255) default NULL,
  `Book-Author` varchar(255) default NULL,
  `Year-Of-Publication` int(10) unsigned default NULL,
  `Publisher` varchar(255) default NULL,
  `Image-URL-S` varchar(255) binary default NULL,
  `Image-URL-M` varchar(255) binary default NULL,
  `Image-URL-L` varchar(255) binary default NULL,
  PRIMARY KEY  (`ISBN`)
) ENGINE=MyISAM;

--
-- Table structure for table ratings
--

CREATE TABLE ratings (
  `User-ID` int(11) NOT NULL default '0',
  `ISBN` varchar(13) NOT NULL default '',
  `Book-Rating` int(11) NOT NULL default '0',
  PRIMARY KEY  (`User-ID`,`ISBN`)
) ENGINE=MyISAM;

