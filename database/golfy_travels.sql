CREATE DATABASE  IF NOT EXISTS `golfy_travel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `golfy_travel`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: golfy_travel
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_amenities`
--

DROP TABLE IF EXISTS `tbl_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_amenities` (
  `amenity_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_amenities`
--

LOCK TABLES `tbl_amenities` WRITE;
/*!40000 ALTER TABLE `tbl_amenities` DISABLE KEYS */;
INSERT INTO `tbl_amenities` VALUES (2,'Air Conditioning','inactive',NULL,NULL,'2025-11-14 13:35:44','2025-11-14 13:35:44'),(3,'Airport Transfers','inactive',NULL,NULL,'2025-11-17 09:11:41','2025-11-17 09:11:41'),(4,'Babysitting Services','inactive',NULL,NULL,'2025-11-17 09:12:30','2025-11-17 09:12:30'),(5,'Balcony / Terrace','inactive',NULL,NULL,'2025-11-17 09:12:51','2025-11-17 09:12:51'),(6,'Family Rooms','inactive',NULL,NULL,'2025-11-17 09:15:15','2025-11-17 09:15:15'),(7,'Fitness Center','inactive',NULL,NULL,'2025-11-17 09:15:32','2025-11-17 09:15:32'),(8,'Free Wi-Fi','inactive',NULL,NULL,'2025-11-17 09:15:50','2025-11-17 09:15:50'),(9,'Transport','inactive',NULL,NULL,'2025-11-17 09:18:21','2025-11-17 09:18:21'),(10,'Yoga & Meditaion','inactive',NULL,NULL,'2025-11-17 09:18:43','2025-11-17 09:18:43');
/*!40000 ALTER TABLE `tbl_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_billing_addresses`
--

DROP TABLE IF EXISTS `tbl_billing_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_billing_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `apartment` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_billing_addresses`
--

LOCK TABLES `tbl_billing_addresses` WRITE;
/*!40000 ALTER TABLE `tbl_billing_addresses` DISABLE KEYS */;
INSERT INTO `tbl_billing_addresses` VALUES (1,1,'Smit','Vaghasiya','India','Street 123',NULL,'Surat','Gujarat','394210','9876543210','smit1@example.com','inactive','2025-11-20 07:59:15','2025-11-20 13:29:15',NULL,NULL),(2,2,'Smit','vaghasiya','India','Vrundavan Chokdi',NULL,'vadodara','Gujarat','390019','8791467916','smit@gmail.com','inactive','2025-11-20 11:05:15','2025-11-20 17:31:57',NULL,NULL);
/*!40000 ALTER TABLE `tbl_billing_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_blogs`
--

DROP TABLE IF EXISTS `tbl_blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_blogs` (
  `blog_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  `published_date` date DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `comments_count` int DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blog_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `tbl_blogs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tbl_categories` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `tbl_blogs_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tbl_tags` (`tag_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_blogs`
--

LOCK TABLES `tbl_blogs` WRITE;
/*!40000 ALTER TABLE `tbl_blogs` DISABLE KEYS */;
INSERT INTO `tbl_blogs` VALUES (2,'Explore Culture, Art, & Timeless Landmarks.','explore-culture-art-and-timeless-landmarks','Summer is here, and it’s time to soak up the sun on some of the world’s most stunning beaches! Whether you’re looking to relax on golden sands, dive into crystal-clear waters, or try exciting water sports, these 10 beaches offer something for every type of traveler. From remote island paradises to iconic coastal destinations.','http://localhost:5000/uploads/blog/1763382202199.jpg','smit','Brazil',1,1,'2025-11-05','draft',1,NULL,NULL,'2025-11-12 09:50:07','2025-11-17 12:23:22');
/*!40000 ALTER TABLE `tbl_blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_categories`
--

DROP TABLE IF EXISTS `tbl_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categories`
--

LOCK TABLES `tbl_categories` WRITE;
/*!40000 ALTER TABLE `tbl_categories` DISABLE KEYS */;
INSERT INTO `tbl_categories` VALUES (1,'Visa','visa','inactive',NULL,NULL,'2025-11-11 08:34:14','2025-11-11 08:48:46'),(2,'Adventure Tour','adventure-tour','inactive',NULL,NULL,'2025-11-11 08:34:27','2025-11-11 08:34:27');
/*!40000 ALTER TABLE `tbl_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_comments`
--

DROP TABLE IF EXISTS `tbl_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `blog_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_comments_blog` (`blog_id`),
  CONSTRAINT `fk_comments_blog` FOREIGN KEY (`blog_id`) REFERENCES `tbl_blogs` (`blog_id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `tbl_blogs` (`blog_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_comments`
--

LOCK TABLES `tbl_comments` WRITE;
/*!40000 ALTER TABLE `tbl_comments` DISABLE KEYS */;
INSERT INTO `tbl_comments` VALUES (4,2,'raj','raj@yahoo.com','This is test Comment.','active',NULL,NULL,'2025-11-12 09:55:58','2025-11-17 12:36:03');
/*!40000 ALTER TABLE `tbl_comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_increment_comment_count` AFTER INSERT ON `tbl_comments` FOR EACH ROW BEGIN
  UPDATE tbl_blogs
  SET comments_count = comments_count + 1
  WHERE blog_id = NEW.blog_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_decrement_comment_count` AFTER DELETE ON `tbl_comments` FOR EACH ROW BEGIN
  UPDATE tbl_blogs
  SET comments_count = comments_count - 1
  WHERE blog_id = OLD.blog_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_companies`
--

DROP TABLE IF EXISTS `tbl_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `company_slug` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_slug` (`company_slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_companies`
--

LOCK TABLES `tbl_companies` WRITE;
/*!40000 ALTER TABLE `tbl_companies` DISABLE KEYS */;
INSERT INTO `tbl_companies` VALUES (1,'Travel','travel','http://localhost:5000/uploads/company/1763818217985.png',NULL,'active',NULL,NULL,'2025-11-22 13:30:17','2025-11-22 13:30:17'),(2,'G-Fly','g-fly','http://localhost:5000/uploads/company/1763818261409.png',NULL,'active',NULL,NULL,'2025-11-22 13:31:01','2025-11-22 13:31:01'),(3,'Taverse','taverse','http://localhost:5000/uploads/company/1763818295094.png',NULL,'active',NULL,NULL,'2025-11-22 13:31:35','2025-11-22 13:31:35'),(4,'Tripzone','tripzone','http://localhost:5000/uploads/company/1763818319364.png',NULL,'active',NULL,NULL,'2025-11-22 13:31:59','2025-11-22 13:31:59'),(5,'Borcelle','borcelle','http://localhost:5000/uploads/company/1763818359796.png',NULL,'active',NULL,NULL,'2025-11-22 13:32:39','2025-11-22 13:32:39'),(6,'GoTrip','gotrip','http://localhost:5000/uploads/company/1763818390538.png',NULL,'active',NULL,NULL,'2025-11-22 13:33:10','2025-11-22 13:33:10');
/*!40000 ALTER TABLE `tbl_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contact_info`
--

DROP TABLE IF EXISTS `tbl_contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `whatsapp_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact_info`
--

LOCK TABLES `tbl_contact_info` WRITE;
/*!40000 ALTER TABLE `tbl_contact_info` DISABLE KEYS */;
INSERT INTO `tbl_contact_info` VALUES (1,'9516548557','info@example.com','inactive','2025-11-20 13:51:15','2025-11-20 19:21:15',NULL,NULL);
/*!40000 ALTER TABLE `tbl_contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contact_inquiries`
--

DROP TABLE IF EXISTS `tbl_contact_inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contact_inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `message` text,
  `agreed_terms` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact_inquiries`
--

LOCK TABLES `tbl_contact_inquiries` WRITE;
/*!40000 ALTER TABLE `tbl_contact_inquiries` DISABLE KEYS */;
INSERT INTO `tbl_contact_inquiries` VALUES (1,'Raj','raj@gmail.com','9501512545','Africa','this is test comment',1,'inactive',NULL,NULL,'2025-11-12 07:58:22','2025-11-17 12:34:44'),(2,'Raj','raj@gmail.com','9501512545','Africa','this is test comment',1,'active',NULL,NULL,'2025-11-21 08:21:29','2025-11-21 08:21:29'),(3,'Idola Mclean','rapawefem@mailinator.com','+1 (673) 696-9302',NULL,'Adipisci esse magna ',1,'active',NULL,NULL,'2025-11-21 09:07:36','2025-11-21 09:07:36');
/*!40000 ALTER TABLE `tbl_contact_inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_destinations`
--

DROP TABLE IF EXISTS `tbl_destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `country_name` varchar(150) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `images` json DEFAULT NULL,
  `tours` int DEFAULT '0',
  `departures` int DEFAULT '0',
  `guests_travelled` int DEFAULT '0',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `tbl_destinations_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `tbl_regions` (`region_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_destinations`
--

LOCK TABLES `tbl_destinations` WRITE;
/*!40000 ALTER TABLE `tbl_destinations` DISABLE KEYS */;
INSERT INTO `tbl_destinations` VALUES (2,1,'Senegal','senegal','[\"1763025905355.webp\", \"1763025905357.webp\"]',1,297,12550,'inactive',NULL,NULL,'2025-11-13 09:24:12','2025-11-13 09:25:05'),(3,1,'Ghana','ghana','[\"1763385216951.webp\", \"1763385216952.webp\"]',1,191,11458,'active',NULL,NULL,'2025-11-13 09:27:12','2025-11-17 13:13:36'),(4,1,'Egypt','egypt','[\"1763800212660.webp\"]',1,397,15777,'inactive',NULL,NULL,'2025-11-22 08:30:12','2025-11-22 08:30:12'),(5,1,'Kenya','kenya','[\"1763800253085.webp\"]',1,195,14950,'inactive',NULL,NULL,'2025-11-22 08:30:53','2025-11-22 08:30:53'),(6,1,'Morocco','morocco','[\"1763800290452.webp\"]',1,205,12000,'inactive',NULL,NULL,'2025-11-22 08:31:30','2025-11-22 08:31:30'),(7,1,'Zimbabwe','zimbabwe','[\"1763801450002.webp\"]',1,199,16859,'inactive',NULL,NULL,'2025-11-22 08:50:50','2025-11-22 08:50:50'),(8,2,'Singapore','singapore','[\"1763802814946.webp\"]',2,256,12549,'inactive',NULL,NULL,'2025-11-22 09:13:34','2025-11-22 09:13:34'),(9,3,'Portugal','portugal','[\"1763802897786.webp\"]',1,185,13255,'inactive',NULL,NULL,'2025-11-22 09:14:57','2025-11-22 09:14:57'),(10,4,'Jordan','jordan','[\"1763802970604.webp\"]',1,185,13479,'inactive',NULL,NULL,'2025-11-22 09:16:10','2025-11-22 09:16:10'),(11,5,'United Stated','united-stated','[\"1763803029770.webp\"]',1,249,15479,'inactive',NULL,NULL,'2025-11-22 09:17:09','2025-11-22 09:17:09'),(12,6,'New Zeland','new-zeland','[\"1763803091210.webp\"]',1,249,11497,'inactive',NULL,NULL,'2025-11-22 09:18:11','2025-11-22 09:18:11');
/*!40000 ALTER TABLE `tbl_destinations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_increase_country_count` AFTER INSERT ON `tbl_destinations` FOR EACH ROW BEGIN
    UPDATE tbl_regions
    SET country_count = country_count + 1
    WHERE region_id = NEW.region_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tg_decrease_country_count` AFTER DELETE ON `tbl_destinations` FOR EACH ROW BEGIN
    UPDATE tbl_regions
    SET country_count = country_count - 1
    WHERE region_id = OLD.region_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_discount_banners`
--

DROP TABLE IF EXISTS `tbl_discount_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_discount_banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `days_nights` varchar(50) DEFAULT NULL,
  `condition_text` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_discount_banners`
--

LOCK TABLES `tbl_discount_banners` WRITE;
/*!40000 ALTER TABLE `tbl_discount_banners` DISABLE KEYS */;
INSERT INTO `tbl_discount_banners` VALUES (1,'Save Up tp 40% off','',750.00,'5,6','','http://localhost:5000/uploads/coupon/1763784284927.webp','inactive',NULL,NULL,'2025-11-22 04:04:44','2025-11-22 04:04:44'),(2,'Bali Indonesia','',750.00,'5','','http://localhost:5000/uploads/coupon/1763784410967.webp','inactive',NULL,NULL,'2025-11-22 04:06:50','2025-11-22 04:06:50'),(3,'Travel Around The World','',399.00,'5','','http://localhost:5000/uploads/coupon/1763784461712.webp','inactive',NULL,NULL,'2025-11-22 04:07:41','2025-11-22 04:07:41'),(4,'Himachal Pradesh','',299.00,'4,3','','http://localhost:5000/uploads/coupon/1763784496847.webp','inactive',NULL,NULL,'2025-11-22 04:08:16','2025-11-22 04:08:16'),(5,'Maldivas','',399.00,'4,3','','http://localhost:5000/uploads/coupon/1763784523114.webp','inactive',NULL,NULL,'2025-11-22 04:08:43','2025-11-22 04:08:43');
/*!40000 ALTER TABLE `tbl_discount_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_experiences`
--

DROP TABLE IF EXISTS `tbl_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_experiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_experiences`
--

LOCK TABLES `tbl_experiences` WRITE;
/*!40000 ALTER TABLE `tbl_experiences` DISABLE KEYS */;
INSERT INTO `tbl_experiences` VALUES (1,'Stories in Every Step','inactive',NULL,NULL,'2025-11-13 07:53:12','2025-11-13 07:53:12'),(2,'Unforgatabble journeys','inactive',NULL,NULL,'2025-11-13 07:58:10','2025-11-13 07:58:10'),(5,'Wander & Discover','inactive',NULL,NULL,'2025-11-13 09:51:47','2025-11-13 09:51:47');
/*!40000 ALTER TABLE `tbl_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_faqs`
--

DROP TABLE IF EXISTS `tbl_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_faqs`
--

LOCK TABLES `tbl_faqs` WRITE;
/*!40000 ALTER TABLE `tbl_faqs` DISABLE KEYS */;
INSERT INTO `tbl_faqs` VALUES (1,'What Services Does Your Travwl Agency Provide','A travel agency typically provides a wide range of services to ensure a smooth and enjoyable travel experience. As like-Hotel booking, Flight Booking, Visa & Customized Travel Packcge etc.','inactive',NULL,NULL,'2025-11-11 04:32:14','2025-11-11 04:50:12');
/*!40000 ALTER TABLE `tbl_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_forgot_password`
--

DROP TABLE IF EXISTS `tbl_forgot_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_forgot_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_forgot_password_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_forgot_password`
--

LOCK TABLES `tbl_forgot_password` WRITE;
/*!40000 ALTER TABLE `tbl_forgot_password` DISABLE KEYS */;
INSERT INTO `tbl_forgot_password` VALUES (1,1,'a5b19d8fe3db70e8888a7d08fe38346d7c247716f1bef14c4a7efca206e084e0','2025-11-10 17:03:43',0,'2025-11-10 16:33:42','2025-11-10 16:33:42'),(2,1,'7a369a54878023e3595120baf470768cf6e23e60fbf3c6a717e5592dc54beea7','2025-11-10 17:04:48',0,'2025-11-10 16:34:47','2025-11-10 16:34:47'),(3,1,'e75fd36ad6314998000ea59e640f392f899ca481792b99ee50f2882168009ec0','2025-11-10 17:05:52',0,'2025-11-10 16:35:52','2025-11-10 16:35:52'),(4,1,'cd06e56b6b30ba2408f038140d6f116c85fd075e095d4c198035b1eac7e77668','2025-11-10 17:09:49',1,'2025-11-10 16:39:49','2025-11-10 16:46:35');
/*!40000 ALTER TABLE `tbl_forgot_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_amenities`
--

DROP TABLE IF EXISTS `tbl_hotel_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `amenity_id` int NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hotel_id` (`hotel_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `tbl_hotel_amenities_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `tbl_hotels` (`hotel_id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_hotel_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `tbl_amenities` (`amenity_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_amenities`
--

LOCK TABLES `tbl_hotel_amenities` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_amenities` DISABLE KEYS */;
INSERT INTO `tbl_hotel_amenities` VALUES (1,2,2,'inactive','2025-11-17 09:57:27','2025-11-17 09:57:27',NULL,NULL),(2,2,4,'inactive','2025-11-17 09:57:27','2025-11-17 09:57:27',NULL,NULL),(3,3,5,'inactive','2025-11-17 09:57:41','2025-11-17 09:57:41',NULL,NULL),(4,3,8,'inactive','2025-11-17 09:57:41','2025-11-17 09:57:41',NULL,NULL),(5,4,3,'inactive','2025-11-17 09:57:51','2025-11-17 09:57:51',NULL,NULL),(6,4,7,'inactive','2025-11-17 09:57:51','2025-11-17 09:57:51',NULL,NULL),(7,5,8,'inactive','2025-11-17 09:58:03','2025-11-17 09:58:03',NULL,NULL),(8,5,9,'inactive','2025-11-17 09:58:03','2025-11-17 09:58:03',NULL,NULL),(9,5,10,'inactive','2025-11-17 09:58:03','2025-11-17 09:58:03',NULL,NULL);
/*!40000 ALTER TABLE `tbl_hotel_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_categories`
--

DROP TABLE IF EXISTS `tbl_hotel_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_categories`
--

LOCK TABLES `tbl_hotel_categories` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_categories` DISABLE KEYS */;
INSERT INTO `tbl_hotel_categories` VALUES (1,'Luxury Hotels','inactive',NULL,NULL,'2025-11-14 11:53:53','2025-11-14 11:53:53'),(2,'Apartments & Condos','inactive',NULL,NULL,'2025-11-14 11:54:17','2025-11-14 11:54:17'),(3,'Luxury Villas','inactive',NULL,NULL,'2025-11-14 11:54:33','2025-11-14 11:54:33'),(4,'Bungalows','inactive',NULL,NULL,'2025-11-14 11:54:54','2025-11-14 11:54:54'),(5,'Cabbins & Cottages','inactive',NULL,NULL,'2025-11-17 04:18:42','2025-11-17 04:18:42'),(6,'Luxury Hotels','inactive',NULL,NULL,'2025-11-17 04:20:01','2025-11-17 04:20:38');
/*!40000 ALTER TABLE `tbl_hotel_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_category_map`
--

DROP TABLE IF EXISTS `tbl_hotel_category_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_category_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_hcm_hotel` (`hotel_id`),
  KEY `fk_hcm_category` (`category_id`),
  CONSTRAINT `fk_hcm_category` FOREIGN KEY (`category_id`) REFERENCES `tbl_hotel_categories` (`category_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_hcm_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `tbl_hotels` (`hotel_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_category_map`
--

LOCK TABLES `tbl_hotel_category_map` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_category_map` DISABLE KEYS */;
INSERT INTO `tbl_hotel_category_map` VALUES (1,2,1,'2025-11-17 04:35:05','2025-11-17 04:35:05'),(2,2,3,'2025-11-17 04:35:05','2025-11-17 04:35:05'),(4,3,4,'2025-11-17 05:53:41','2025-11-17 05:53:41'),(5,3,6,'2025-11-17 05:53:41','2025-11-17 05:53:41'),(6,4,5,'2025-11-17 05:53:54','2025-11-17 05:53:54'),(7,5,1,'2025-11-17 05:54:36','2025-11-17 05:54:36'),(8,5,4,'2025-11-17 05:54:36','2025-11-17 05:54:36'),(9,5,6,'2025-11-17 05:54:36','2025-11-17 05:54:36');
/*!40000 ALTER TABLE `tbl_hotel_category_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_rooms`
--

DROP TABLE IF EXISTS `tbl_hotel_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `room_subtitle` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` json DEFAULT NULL,
  `description` text,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `tbl_hotel_rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `tbl_hotels` (`hotel_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_rooms`
--

LOCK TABLES `tbl_hotel_rooms` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_rooms` DISABLE KEYS */;
INSERT INTO `tbl_hotel_rooms` VALUES (2,2,'Standard Room','standard-room','Standard Comfort Suite',160.00,'[\"1763296957826.webp\", \"1763296957829.webp\"]','Guests can pre-set room ambiance—temperature, lighting, media settings—for a home-like arrival experience.','inactive',NULL,NULL,'2025-11-16 12:42:37','2025-11-16 12:42:37'),(3,2,'Superior Room','superior-room','Superior Comfort Suite',220.00,'[\"1763350669905.webp\", \"1763350669909.webp\"]','Guests can pre-set room ambiance—temperature, lighting, media settings—for a home-like arrival experience.','inactive',NULL,NULL,'2025-11-17 03:37:49','2025-11-17 03:37:49'),(4,2,'Premium Room','premium-room','Premium Comfort Suite',300.00,'[\"1763350691017.webp\", \"1763350691022.webp\"]','Guests can pre-set room ambiance—temperature, lighting, media settings—for a home-like arrival experience.','inactive',NULL,NULL,'2025-11-17 03:38:11','2025-11-17 03:38:11');
/*!40000 ALTER TABLE `tbl_hotel_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_tag_map`
--

DROP TABLE IF EXISTS `tbl_hotel_tag_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_tag_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_htm_hotel` (`hotel_id`),
  KEY `fk_htm_tag` (`tag_id`),
  CONSTRAINT `fk_htm_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `tbl_hotels` (`hotel_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_htm_tag` FOREIGN KEY (`tag_id`) REFERENCES `tbl_hotel_tags` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_tag_map`
--

LOCK TABLES `tbl_hotel_tag_map` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_tag_map` DISABLE KEYS */;
INSERT INTO `tbl_hotel_tag_map` VALUES (1,2,2,'inactive',NULL,NULL,'2025-11-17 06:17:04','2025-11-17 06:17:04'),(2,2,4,'inactive',NULL,NULL,'2025-11-17 06:17:04','2025-11-17 06:17:04'),(4,3,5,'inactive',NULL,NULL,'2025-11-17 06:22:43','2025-11-17 06:22:43'),(5,4,4,'inactive',NULL,NULL,'2025-11-17 06:22:53','2025-11-17 06:22:53'),(6,4,6,'inactive',NULL,NULL,'2025-11-17 06:22:53','2025-11-17 06:22:53'),(7,5,2,'inactive',NULL,NULL,'2025-11-17 06:23:04','2025-11-17 06:23:04');
/*!40000 ALTER TABLE `tbl_hotel_tag_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotel_tags`
--

DROP TABLE IF EXISTS `tbl_hotel_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotel_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotel_tags`
--

LOCK TABLES `tbl_hotel_tags` WRITE;
/*!40000 ALTER TABLE `tbl_hotel_tags` DISABLE KEYS */;
INSERT INTO `tbl_hotel_tags` VALUES (2,'Premium Hotel','inactive',NULL,NULL,'2025-11-14 13:01:27','2025-11-17 06:12:58'),(4,'Resort Room','inactive',NULL,NULL,'2025-11-17 06:10:54','2025-11-17 06:10:54'),(5,'VIP Hotel','inactive',NULL,NULL,'2025-11-17 06:11:41','2025-11-17 06:11:41'),(6,'Standard Room','inactive',NULL,NULL,'2025-11-17 06:11:53','2025-11-17 06:11:53');
/*!40000 ALTER TABLE `tbl_hotel_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_hotels`
--

DROP TABLE IF EXISTS `tbl_hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_hotels` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `image_url` json DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `review_count` int DEFAULT '0',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`hotel_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_hotels`
--

LOCK TABLES `tbl_hotels` WRITE;
/*!40000 ALTER TABLE `tbl_hotels` DISABLE KEYS */;
INSERT INTO `tbl_hotels` VALUES (2,'Le Méridien Dhaka','le-meridien-dhaka','Bangladesh','Dhaka',160.00,0.00,'[\"1763351907397.webp\", \"1763351907401.webp\"]',0.0,0,'inactive',NULL,NULL,'2025-11-16 10:34:03','2025-11-17 03:58:27'),(3,'Raffles Hotels & Resorts','raffles-hotels-and-resorts','Thailand','Bangkok',40.00,0.00,'[\"1763352361852.webp\", \"1763352361853.webp\"]',0.0,0,'inactive',NULL,NULL,'2025-11-17 04:06:01','2025-11-17 04:06:01'),(4,'Mandarin Oriental Hotel','mandarin-oriental-hotel','Portugal','Lisbon',88.00,0.00,'[\"1763352401951.webp\", \"1763352401952.webp\"]',0.0,0,'inactive',NULL,NULL,'2025-11-17 04:06:42','2025-11-17 04:06:42'),(5,'Radisson Blu','radisson-blu','Bangladesh','Dhaka',40.00,55.00,'[\"1763352532446.webp\", \"1763352532450.webp\"]',0.0,0,'inactive',NULL,NULL,'2025-11-17 04:08:52','2025-11-17 04:08:52');
/*!40000 ALTER TABLE `tbl_hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_regions`
--

DROP TABLE IF EXISTS `tbl_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_regions` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `country_count` int DEFAULT '0',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`region_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_regions`
--

LOCK TABLES `tbl_regions` WRITE;
/*!40000 ALTER TABLE `tbl_regions` DISABLE KEYS */;
INSERT INTO `tbl_regions` VALUES (1,'Africa',7,'inactive',NULL,NULL,'2025-11-12 06:04:49','2025-11-22 08:50:50'),(2,'Asia',1,'inactive',NULL,NULL,'2025-11-12 08:14:12','2025-11-22 09:13:34'),(3,'Europe',1,'inactive',NULL,NULL,'2025-11-12 10:13:06','2025-11-22 09:14:57'),(4,'Middle East',1,'inactive',NULL,NULL,'2025-11-12 10:13:20','2025-11-22 09:16:10'),(5,'North America',1,'inactive',NULL,NULL,'2025-11-12 10:13:53','2025-11-22 09:17:09'),(6,'Oceneia',1,'inactive',NULL,NULL,'2025-11-12 10:14:05','2025-11-22 09:18:11');
/*!40000 ALTER TABLE `tbl_regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_shipping_addresses`
--

DROP TABLE IF EXISTS `tbl_shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_shipping_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `apartment` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_shipping_addresses`
--

LOCK TABLES `tbl_shipping_addresses` WRITE;
/*!40000 ALTER TABLE `tbl_shipping_addresses` DISABLE KEYS */;
INSERT INTO `tbl_shipping_addresses` VALUES (1,1,'Smit','Vaghasiya','India','House 10, ABC Road','202, Tower B','Surat','Gujarat','395006','active','2025-11-20 08:33:57','2025-11-20 14:03:57',NULL,NULL),(2,2,'smit','vaghasiya','India','waghodia','','vadodara','Gujarat','391760','active','2025-11-20 09:27:22','2025-11-20 14:58:19',NULL,NULL);
/*!40000 ALTER TABLE `tbl_shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tags`
--

DROP TABLE IF EXISTS `tbl_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tags`
--

LOCK TABLES `tbl_tags` WRITE;
/*!40000 ALTER TABLE `tbl_tags` DISABLE KEYS */;
INSERT INTO `tbl_tags` VALUES (1,'Cultural','cultural','inactive',NULL,NULL,'2025-11-11 09:10:07','2025-11-11 09:32:18'),(2,'Activities','activities','inactive',NULL,NULL,'2025-11-11 09:10:50','2025-11-11 09:10:50');
/*!40000 ALTER TABLE `tbl_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tour_destinations`
--

DROP TABLE IF EXISTS `tbl_tour_destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tour_destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `destination_id` int NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tour_id` (`tour_id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `tbl_tour_destinations_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tbl_tours` (`tour_id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_tour_destinations_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `tbl_destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tour_destinations`
--

LOCK TABLES `tbl_tour_destinations` WRITE;
/*!40000 ALTER TABLE `tbl_tour_destinations` DISABLE KEYS */;
INSERT INTO `tbl_tour_destinations` VALUES (8,2,3,'inactive',NULL,NULL,'2025-11-14 08:49:45','2025-11-14 08:49:45'),(10,2,2,'inactive',NULL,NULL,'2025-11-14 12:00:56','2025-11-14 12:00:56');
/*!40000 ALTER TABLE `tbl_tour_destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tour_experiences`
--

DROP TABLE IF EXISTS `tbl_tour_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tour_experiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int DEFAULT NULL,
  `experience_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tour_id` (`tour_id`),
  KEY `experience_id` (`experience_id`),
  CONSTRAINT `tbl_tour_experiences_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tbl_tours` (`tour_id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_tour_experiences_ibfk_2` FOREIGN KEY (`experience_id`) REFERENCES `tbl_experiences` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tour_experiences`
--

LOCK TABLES `tbl_tour_experiences` WRITE;
/*!40000 ALTER TABLE `tbl_tour_experiences` DISABLE KEYS */;
INSERT INTO `tbl_tour_experiences` VALUES (4,2,1,'2025-11-14 09:15:30'),(5,2,2,'2025-11-14 09:15:30');
/*!40000 ALTER TABLE `tbl_tour_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tour_types`
--

DROP TABLE IF EXISTS `tbl_tour_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tour_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tour_types`
--

LOCK TABLES `tbl_tour_types` WRITE;
/*!40000 ALTER TABLE `tbl_tour_types` DISABLE KEYS */;
INSERT INTO `tbl_tour_types` VALUES (1,'Solo tour','inactive',NULL,NULL,'2025-11-13 09:44:00','2025-11-13 09:46:17'),(2,'Family Tour','inactive',NULL,NULL,'2025-11-13 09:44:06','2025-11-13 09:44:06'),(3,'Group Tour','inactive',NULL,NULL,'2025-11-13 09:44:16','2025-11-13 09:44:16'),(4,'Adventure Tour','inactive',NULL,NULL,'2025-11-14 03:57:59','2025-11-14 03:57:59');
/*!40000 ALTER TABLE `tbl_tour_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tours`
--

DROP TABLE IF EXISTS `tbl_tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tours` (
  `tour_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  `days` int DEFAULT NULL,
  `nights` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `tour_type_id` int DEFAULT NULL,
  `review_count` int DEFAULT '0',
  `is_featured` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tour_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_tours_region` (`region_id`),
  KEY `fk_tours_type` (`tour_type_id`),
  CONSTRAINT `fk_tours_region` FOREIGN KEY (`region_id`) REFERENCES `tbl_regions` (`region_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tours_type` FOREIGN KEY (`tour_type_id`) REFERENCES `tbl_tour_types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tours`
--

LOCK TABLES `tbl_tours` WRITE;
/*!40000 ALTER TABLE `tbl_tours` DISABLE KEYS */;
INSERT INTO `tbl_tours` VALUES (2,'Kiwi Adventures Await','kiwi-adventures-await','Paris, the City of Lights, and the surrounding Île-de-France region offer a perfect blend of history, culture, luxury, and romance. Whether you’re exploring iconic landmarks, indulging in French cuisine, or enjoying the charming countryside, this region has something for every traveler.','http://localhost:5000/uploads/tours/1763096821698.webp',1,5,4,780.00,449.00,4,0,1,'inactive',NULL,NULL,'2025-11-14 05:06:34','2025-11-14 05:07:01');
/*!40000 ALTER TABLE `tbl_tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `auth_provider` enum('local','google') DEFAULT 'local',
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,NULL,'smit','smit1@example.com','$2b$10$T1X2AiZX68EoZD9P9yVTVOvDGj0nEO2CKBk3y9jdgepofWf9HK782','http://localhost:5000/uploads/profile_images/1762848333372.jpg','local','inactive',NULL,NULL,'2025-11-10 10:40:11','2025-11-20 04:12:33'),(2,NULL,'Smit','smit@example.com','$2b$10$kWO7ywUFXNuVtUP9ScVc1.eVc9DmbkUSv0hrgRbQmFpU5LqeNrQoe','http://localhost:5000/uploads/profile_images/1762848233983.jpg','local','inactive',NULL,NULL,'2025-11-10 12:31:04','2025-11-20 04:26:45'),(3,NULL,'Smit Vaghasiya','smit2@example.com','$2b$10$/Z0La082gsDfepZI4yAQKeSmejmkqbVwrZOGlYVcwhyYQZ6eKHsim',NULL,'local','inactive',NULL,NULL,'2025-11-10 12:34:13','2025-11-10 12:34:13'),(4,NULL,'Raj Patel','raj@example.com','$2b$10$5I0qp7dzTSlkv0YNszZBee8iwaws.shML35oqieVSCChyeHubktVC',NULL,'local','inactive',NULL,NULL,'2025-11-17 11:30:06','2025-11-17 11:30:06'),(5,NULL,'Totam sit dolores cu','hyrijyny@mailinator.com','$2b$10$qTekmJkE70eHAJJvd7eaV.rDkuT/wZHq1acTXFHaltt1VBVoCjdoa',NULL,'local','inactive',NULL,NULL,'2025-11-19 12:30:03','2025-11-19 12:30:03'),(6,NULL,'Tempora ipsum volup','wosutelak@mailinator.com','$2b$10$mrfayrNpikg4PqktNJQ4Aek88i8a7CT0vSiHBajwWVNPDNSHdxYia',NULL,'local','inactive',NULL,NULL,'2025-11-19 13:13:39','2025-11-19 13:13:39'),(9,NULL,'Recusandae Incidunt','hype@mailinator.com','$2b$10$QnIynj5UWuGtI2UHTSnms.IF9bLdl1aNaZUw9N7I4zeohkAsTkpEy',NULL,'local','inactive',NULL,NULL,'2025-11-19 13:14:57','2025-11-19 13:14:57'),(10,NULL,'In voluptatem maxime','bosop@mailinator.com','$2b$10$EoJokkZ2xiaIvsiqXtbpQOa/swYNKnbwKdlLopqNZcBa1tdR6j4lO',NULL,'local','inactive',NULL,NULL,'2025-11-19 16:41:15','2025-11-19 16:41:15'),(11,NULL,'Corporis laboriosam','bahec@mailinator.com','$2b$10$sObmzdCwfQaNSsowwhEI4eA9I8unHZJIMOXYGXDVwztfpaaIe9fBS',NULL,'local','inactive',NULL,NULL,'2025-11-19 16:50:25','2025-11-19 16:50:25'),(12,NULL,'Eligendi quam consec','waqofew@mailinator.com','$2b$10$cLMC/BmLAx0egDgSG/t4ae0AluqYXbdainfeT7K/IrdKrTDM7WQ8i',NULL,'local','inactive',NULL,NULL,'2025-11-19 16:53:53','2025-11-19 16:53:53'),(13,NULL,'Dicta reprehenderit','fycyhi@mailinator.com','$2b$10$JMJ5ojdJiF0./M32J.Iqi.92pqok.5kYJKAVJFqxG7FzDtuAgaZGW',NULL,'local','inactive',NULL,NULL,'2025-11-19 16:56:47','2025-11-19 16:56:47'),(14,NULL,'Fugiat proident do','varejan@mailinator.com','$2b$10$24jcLGvL6H09T6AyYXyIG.JcJB0XXVO0QDmoxoBZAyLmEOlezvA72',NULL,'local','inactive',NULL,NULL,'2025-11-19 17:00:24','2025-11-19 17:00:24'),(15,NULL,'Placeat rerum quia ','galaraqud@mailinator.com','$2b$10$xx1jM2i8T7xCNEXYfneDDedv0YbciqjnzobK9oY4KzXaBSesPUBFq',NULL,'local','inactive',NULL,NULL,'2025-11-19 17:05:05','2025-11-19 17:05:05'),(16,NULL,'Omnis aliqua Rerum ','jadolalypi@mailinator.com','$2b$10$0LI5XQUbrGBFHxAUhbs5cuVK3ReLVpJSdKp6cGVu2JICkaobOs9Fq',NULL,'local','inactive',NULL,NULL,'2025-11-20 03:07:12','2025-11-20 03:07:12');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_visa_countries`
--

DROP TABLE IF EXISTS `tbl_visa_countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_visa_countries` (
  `visa_id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(100) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `min_days` int NOT NULL,
  `max_days` int NOT NULL,
  `notes` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`visa_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_visa_countries`
--

LOCK TABLES `tbl_visa_countries` WRITE;
/*!40000 ALTER TABLE `tbl_visa_countries` DISABLE KEYS */;
INSERT INTO `tbl_visa_countries` VALUES (1,'Switzerland ','switzerland',10,20,'Days','http://localhost:5000/uploads/visa_country/1763440983101.webp','inactive',NULL,NULL,'2025-11-18 04:43:03','2025-11-18 07:46:04'),(3,'Germany','germany',15,30,'Days','http://localhost:5000/uploads/visa_country/1763451793049.webp','inactive',NULL,NULL,'2025-11-18 07:35:00','2025-11-18 07:43:13'),(4,'Qatar','qatar',15,25,'Days','http://localhost:5000/uploads/visa_country/1763452046439.webp','inactive',NULL,NULL,'2025-11-18 07:47:01','2025-11-18 07:47:26'),(5,'France','france',1,3,'Month','http://localhost:5000/uploads/visa_country/1763452089943.webp','inactive',NULL,NULL,'2025-11-18 07:48:09','2025-11-18 07:48:09');
/*!40000 ALTER TABLE `tbl_visa_countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_visa_types`
--

DROP TABLE IF EXISTS `tbl_visa_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_visa_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_id` int NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `validity_days` int DEFAULT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_country_id` (`country_id`),
  CONSTRAINT `tbl_visa_types_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `tbl_visa_countries` (`visa_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_visa_types`
--

LOCK TABLES `tbl_visa_types` WRITE;
/*!40000 ALTER TABLE `tbl_visa_types` DISABLE KEYS */;
INSERT INTO `tbl_visa_types` VALUES (1,1,'Tourist Visa',8000.00,60,'inactive',NULL,NULL,'2025-11-18 08:19:53','2025-11-18 08:19:53'),(2,1,'Business Visa',10000.00,50,'inactive',NULL,NULL,'2025-11-18 08:20:43','2025-11-18 08:42:03'),(3,1,'Student Visa',13000.00,60,'inactive',NULL,NULL,'2025-11-18 08:21:13','2025-11-18 08:21:13'),(4,1,'Work Visa',10000.00,60,'inactive',NULL,NULL,'2025-11-18 08:21:34','2025-11-18 08:21:34'),(5,1,'Medical Visa',6000.00,50,'inactive',NULL,NULL,'2025-11-18 08:22:03','2025-11-18 08:22:03'),(6,1,'Spouse Visa',5000.00,50,'inactive',NULL,NULL,'2025-11-18 08:22:34','2025-11-18 08:22:34'),(7,3,'Tourist Visa',8000.00,60,'inactive',NULL,NULL,'2025-11-18 08:44:09','2025-11-18 08:47:13'),(8,3,'Business Visa',10000.00,40,'inactive',NULL,NULL,'2025-11-18 08:44:54','2025-11-18 08:44:54'),(9,3,'Student Visa',13000.00,50,'inactive',NULL,NULL,'2025-11-18 08:45:15','2025-11-18 08:45:15'),(10,3,'Work Visa',10000.00,50,'inactive',NULL,NULL,'2025-11-18 08:45:35','2025-11-18 08:45:35'),(11,3,'Medical Visa',6000.00,50,'inactive',NULL,NULL,'2025-11-18 08:45:51','2025-11-18 08:45:51'),(12,3,'Spouse Visa',5000.00,50,'inactive',NULL,NULL,'2025-11-18 08:46:06','2025-11-18 08:46:06');
/*!40000 ALTER TABLE `tbl_visa_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'golfy_travel'
--

--
-- Dumping routines for database 'golfy_travel'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_blog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_blog`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_content TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_author VARCHAR(100),
    IN p_location VARCHAR(150),
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_published_date DATE,
    IN p_status ENUM('draft','published','archived')
)
BEGIN
    INSERT INTO blogs (title, slug, content, thumbnail, author, location, category_id, tag_id, published_date, status, comments_count, created_at, updated_at)
    VALUES (p_title, p_slug, p_content, p_thumbnail, p_author, p_location, p_category_id, p_tag_id, p_published_date, p_status, 0, NOW(), NOW());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_destination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_destination`(
    IN p_region_id INT,
    IN p_country_name VARCHAR(150),
    IN p_slug VARCHAR(255),
    IN p_images JSON,
    IN p_tours INT,
    IN p_departures INT,
    IN p_guests_travelled INT
)
BEGIN
    INSERT INTO destinations (
        region_id,
        country_name,
        slug,
        images,
        tours,
        departures,
        guests_travelled
    )
    VALUES (
        p_region_id,
        p_country_name,
        p_slug,
        p_images,
        IFNULL(p_tours, 0),
        IFNULL(p_departures, 0),
        IFNULL(p_guests_travelled, 0)
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_experience` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_experience`(
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO experiences (name)
    VALUES (p_name);

    SELECT LAST_INSERT_ID() AS id, p_name AS name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_experince` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_experince`(
	IN p_name VARCHAR(100)
)
BEGIN 
	INSERT INTO experiences (name)
    VALUES (p_name);
    
 SELECT LAST_INSERT_ID() AS id, p_name AS name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_faq`(
    IN p_question VARCHAR(255),
    IN p_answer TEXT
)
BEGIN
    INSERT INTO faqs (question, answer)
    VALUES (p_question, p_answer);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_region` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_region`(
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO regions (name, country_count)
    VALUES (p_name, 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_tour` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_tour`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_description TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_region_id INT,
    IN p_days INT,
    IN p_nights INT,
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_tour_type_id INT,
    IN p_is_featured BOOLEAN
)
BEGIN
    INSERT INTO tours (
        title,
        slug,
        description,
        thumbnail,
        region_id,
        days,
        nights,
        price,
        discount_price,
        tour_type_id,
        is_featured
    )
    VALUES (
        p_title,
        p_slug,
        p_description,
        p_thumbnail,
        p_region_id,
        p_days,
        p_nights,
        p_price,
        p_discount_price,
        p_tour_type_id,
        p_is_featured
    );

    SELECT * FROM tours WHERE tour_id = LAST_INSERT_ID();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_tag`(
    IN p_tag_id INT
)
BEGIN
    DELETE FROM tags WHERE tag_id = p_tag_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_hotels` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_hotels`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    -- 1) Hotels list with limit-offset
    SELECT 
        hotel_id,
        hotel_name,
        slug,
        country,
        city,
        price,
        discount_price,
        image_url,
        rating,
        review_count,
        created_at,
        updated_at
    FROM hotels
    ORDER BY hotel_id DESC
    LIMIT p_limit OFFSET p_offset;

    SELECT COUNT(*) AS total_count FROM hotels;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_blog_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_blog_by_slug`(IN p_slug VARCHAR(255))
BEGIN
    SELECT 
      b.blog_id,
      b.title,
      b.slug,
      b.content,
      b.thumbnail,
      b.author,
      b.location,
      b.published_date,
      b.status,
      b.comments_count,
      b.created_at,
      b.updated_at,
      c.name AS category_name,
      t.name AS tag_name
    FROM blogs b
    LEFT JOIN categories c ON b.category_id = c.category_id
    LEFT JOIN tags t ON b.tag_id = t.tag_id
    WHERE b.slug = p_slug;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_experiences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_experiences`()
BEGIN
    SELECT * FROM experiences ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_hotel_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_hotel_by_slug`(
    IN p_slug VARCHAR(255)
)
BEGIN
    SELECT 
        hotel_id,
        hotel_name,
        slug,
        country,
        city,
        price,
        discount_price,
        image_url,
        rating,
        review_count,
        created_at,
        updated_at
    FROM hotels
    WHERE slug = p_slug
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_category`(
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(100)
)
BEGIN
    INSERT INTO tbl_categories (name, slug, created_at)
    VALUES (p_name, p_slug, NOW());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_contact_inquiry` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_contact_inquiry`(
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_destination VARCHAR(100),
    IN p_message TEXT,
    IN p_agreed_terms BOOLEAN,
    IN p_admin_id INT
)
BEGIN
    INSERT INTO tbl_contact_inquiries (
        full_name,
        email,
        phone,
        destination,
        message,
        agreed_terms,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_full_name,
        p_email,
        p_phone,
        p_destination,
        p_message,
        p_agreed_terms,
        'active',
        p_admin_id,
        NULL
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_faq`(
    IN p_question VARCHAR(255),
    IN p_answer TEXT
)
BEGIN
    INSERT INTO tbl_faqs (question, answer)
    VALUES (p_question, p_answer);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_tag`(
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    INSERT INTO tbl_tags (
        name,
        slug,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_name,
        p_slug,
        'inactive',
        p_admin_id,
        NULL
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_amenity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_amenity`(
    IN p_amenity_id INT
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_amenities WHERE amenity_id = p_amenity_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    DELETE FROM tbl_amenities 
    WHERE amenity_id = p_amenity_id;

    SELECT 'DELETED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_blog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_blog`(IN p_blog_id INT)
BEGIN
    DELETE FROM tbl_blogs WHERE blog_id = p_blog_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_category`(
    IN p_category_id INT
)
BEGIN
    DELETE FROM tbl_categories 
    WHERE category_id = p_category_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_destination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_destination`(IN p_id INT)
BEGIN
    DELETE FROM tbl_destinations WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_experience` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_experience`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_experiences WHERE id = p_id;

    IF ROW_COUNT() = 0 THEN
        SELECT NULL AS deleted_id;
    ELSE
        SELECT p_id AS deleted_id;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_hotel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_hotel`(
    IN p_hotel_id INT
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_hotels WHERE hotel_id = p_hotel_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    DELETE FROM tbl_hotels 
    WHERE hotel_id = p_hotel_id;

    SELECT 'DELETED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_hotel_amenities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_hotel_amenities`(
    IN p_hotel_id INT,
    IN p_amenity_ids VARCHAR(255)
)
BEGIN
    DECLARE v_amenity_id VARCHAR(10);

    WHILE LENGTH(p_amenity_ids) > 0 DO
        
        SET v_amenity_id = SUBSTRING_INDEX(p_amenity_ids, ',', 1);

        DELETE FROM tbl_hotel_amenities
        WHERE hotel_id = p_hotel_id
          AND amenity_id = v_amenity_id;   -- FIXED HERE

        SET p_amenity_ids = SUBSTRING(
            p_amenity_ids,
            LENGTH(v_amenity_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_hotel_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_hotel_category`(
    IN p_category_id INT
)
BEGIN
    SELECT * 
    FROM tbl_hotel_categories
    WHERE category_id = p_category_id;

    DELETE FROM tbl_hotel_categories
    WHERE category_id = p_category_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_hotel_room` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_hotel_room`(
    IN p_room_id INT
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_hotel_rooms WHERE room_id = p_room_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    DELETE FROM tbl_hotel_rooms
    WHERE room_id = p_room_id;

    SELECT 'DELETED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_hotel_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_hotel_tag`(
    IN p_tag_id INT
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_hotel_tags WHERE tag_id = p_tag_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    DELETE FROM tbl_hotel_tags 
    WHERE tag_id = p_tag_id;

    SELECT 'DELETED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_region` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_region`(
    IN p_region_id INT
)
BEGIN
    DELETE FROM tbl_regions 
    WHERE region_id = p_region_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_single_tour_destination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_single_tour_destination`(
    IN p_tour_id INT,
    IN p_destination_id INT
)
BEGIN
    DELETE FROM tbl_tour_destinations
    WHERE tour_id = p_tour_id
      AND destination_id = p_destination_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_single_tour_experience` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_single_tour_experience`(
    IN p_tour_id INT,
    IN p_experience_id INT
)
BEGIN
    DELETE FROM tbl_tour_experiences
    WHERE tour_id = p_tour_id
      AND experience_id = p_experience_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_tag`(
    IN p_tag_id INT
)
BEGIN
    DELETE FROM tbl_tags WHERE tag_id = p_tag_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_tour` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_tour`(
    IN p_tour_id INT
)
BEGIN
    DELETE FROM tbl_tours WHERE tour_id = p_tour_id;

    SELECT ROW_COUNT() AS deleted_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_visa_country` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_visa_country`(
    IN p_visa_id INT
)
BEGIN
    DELETE FROM tbl_visa_countries WHERE visa_id = p_visa_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_visa_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_visa_type`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_visa_types 
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_blogs_paginated` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_blogs_paginated`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
      b.blog_id,
      b.title,
      b.slug,
      b.content,
      b.thumbnail,
      b.author,
      b.location,
      b.published_date,
      b.status,
      b.comments_count,
      b.created_at,
      b.updated_at,
      c.name AS category_name,
      t.name AS tag_name
    FROM tbl_blogs b
    LEFT JOIN tbl_categories c ON b.category_id = c.category_id
    LEFT JOIN tbl_tags t ON b.tag_id = t.tag_id
    ORDER BY b.blog_id DESC
    LIMIT p_limit OFFSET p_offset;

    SELECT COUNT(*) AS total FROM tbl_blogs;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_destinations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_destinations`()
BEGIN
    SELECT *
    FROM tbl_destinations
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_hotels` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_hotels`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    -- Paginated hotels
    SELECT 
        hotel_id,
        hotel_name,
        slug,
        country,
        city,
        price,
        discount_price,
        image_url,
        rating,
        review_count,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_hotels
    ORDER BY hotel_id DESC
    LIMIT p_limit OFFSET p_offset;

    -- Total count
    SELECT COUNT(*) AS total_count 
    FROM tbl_hotels;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_hotel_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_hotel_categories`()
BEGIN
    SELECT *
    FROM tbl_hotel_categories
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_tags` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_tags`()
BEGIN
    SELECT * FROM tbl_tags ORDER BY tag_id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_tours` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_tours`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        t.*,
        tt.name AS tour_type_name,

        (SELECT GROUP_CONCAT(e.name SEPARATOR ', ')
         FROM tbl_tour_experiences te
         LEFT JOIN tbl_experiences e ON te.experience_id = e.id
         WHERE te.tour_id = t.tour_id
        ) AS experiences,

        (SELECT GROUP_CONCAT(d.country_name SEPARATOR ', ')
         FROM tbl_tour_destinations td
         LEFT JOIN tbl_destinations d ON td.destination_id = d.id
         WHERE td.tour_id = t.tour_id
        ) AS countries

    FROM tbl_tours t
    LEFT JOIN tbl_tour_types tt ON t.tour_type_id = tt.id
    ORDER BY t.created_at DESC
    LIMIT p_limit OFFSET p_offset;

    SELECT COUNT(*) AS total FROM tbl_tours;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_visa_countries` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_visa_countries`()
BEGIN
    SELECT 
        visa_id,
        country,
        slug,
        min_days,
        max_days,
        notes,
        thumbnail,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_visa_countries
    ORDER BY visa_id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_blog_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_blog_by_slug`(IN p_slug VARCHAR(255))
BEGIN
    SELECT 
      b.blog_id,
      b.title,
      b.slug,
      b.content,
      b.thumbnail,
      b.author,
      b.location,
      b.published_date,
      b.status,
      b.comments_count,
      b.created_at,
      b.updated_at,
      c.name AS category_name,
      t.name AS tag_name
    FROM tbl_blogs b
    LEFT JOIN tbl_categories c ON b.category_id = c.category_id
    LEFT JOIN tbl_tags t ON b.tag_id = t.tag_id
    WHERE b.slug = p_slug;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_destination_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_destination_by_slug`(IN p_slug VARCHAR(255))
BEGIN
    SELECT *
    FROM tbl_destinations
    WHERE slug = p_slug
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_experiences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_experiences`()
BEGIN
    SELECT * FROM tbl_experiences 
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_hotel_with_rooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_hotel_with_rooms`(
    IN p_slug VARCHAR(255)
)
BEGIN
    SELECT 
        h.hotel_id,
        h.hotel_name,
        h.slug,
        h.image_url AS hotel_images,
        r.room_id,
        r.room_name,
        r.slug AS room_slug,
        r.room_subtitle,
        r.price,
        r.image_url AS room_images,
        r.description AS room_description
    FROM tbl_hotels h
    LEFT JOIN tbl_hotel_rooms r ON h.hotel_id = r.hotel_id
    WHERE h.slug = p_slug;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_tag_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tag_by_slug`(
    IN p_slug VARCHAR(100)
)
BEGIN
    SELECT * FROM tbl_tags WHERE slug = p_slug;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_tour_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tour_by_slug`(
    IN p_slug VARCHAR(255)
)
BEGIN
    SELECT 
        t.*,
        tt.name AS tour_type_name,

        (SELECT GROUP_CONCAT(e.name SEPARATOR ', ')
         FROM tbl_tour_experiences te
         LEFT JOIN tbl_experiences e ON te.experience_id = e.id
         WHERE te.tour_id = t.tour_id
        ) AS experiences,

        (SELECT GROUP_CONCAT(d.country_name SEPARATOR ', ')
         FROM tbl_tour_destinations td
         LEFT JOIN tbl_destinations d ON td.destination_id = d.id
         WHERE td.tour_id = t.tour_id
        ) AS countries

    FROM tbl_tours t
    LEFT JOIN tbl_tour_types tt ON t.tour_type_id = tt.id
    WHERE t.slug = p_slug
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_visa_country_with_types_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_visa_country_with_types_by_slug`(
    IN p_slug VARCHAR(255)
)
BEGIN
    -- 1) Fetch country details
    SELECT 
        visa_id,
        country,
        slug,
        min_days,
        max_days,
        notes,
        thumbnail,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_visa_countries
    WHERE slug = p_slug
    LIMIT 1;

    -- 2) Fetch visa types for this country
    SELECT 
        id,
        country_id,
        type_name,
        price,
        validity_days,
        status
    FROM tbl_visa_types
    WHERE country_id = (
        SELECT visa_id FROM tbl_visa_countries WHERE slug = p_slug LIMIT 1
    )
    ORDER BY id DESC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_visa_types_by_country` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_visa_types_by_country`(
    IN p_country_id INT
)
BEGIN
    SELECT 
        id,
        country_id,
        type_name,
        price,
        validity_days,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_visa_types
    WHERE country_id = p_country_id
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_amenity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_amenity`(
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO tbl_amenities (name)
    VALUES (p_name);

    SELECT * FROM tbl_amenities
    WHERE amenity_id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_blog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_blog`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_content TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_author VARCHAR(100),
    IN p_location VARCHAR(150),
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_published_date DATE,
    IN p_status ENUM('draft','published','archived')
)
BEGIN
    INSERT INTO tbl_blogs (
        title,
        slug,
        content,
        thumbnail,
        author,
        location,
        category_id,
        tag_id,
        published_date,
        status,
        comments_count
    )
    VALUES (
        p_title,
        p_slug,
        p_content,
        p_thumbnail,
        p_author,
        p_location,
        p_category_id,
        p_tag_id,
        p_published_date,
        p_status,
        0
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_category`(
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    INSERT INTO tbl_categories (
        name,
        slug,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_name,
        p_slug,
        'inactive',
        p_admin_id,
        NULL
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_destination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_destination`(
    IN p_region_id INT,
    IN p_country_name VARCHAR(150),
    IN p_slug VARCHAR(255),
    IN p_images JSON,
    IN p_tours INT,
    IN p_departures INT,
    IN p_guests_travelled INT,
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_destinations (
        region_id,
        country_name,
        slug,
        images,
        tours,
        departures,
        guests_travelled,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_region_id,
        p_country_name,
        p_slug,
        p_images,
        IFNULL(p_tours, 0),
        IFNULL(p_departures, 0),
        IFNULL(p_guests_travelled, 0),
        IFNULL(p_status, 'inactive'),
        p_created_by,
        NULL
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_experience` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_experience`(
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_experiences (name, status, created_by)
    VALUES (p_name, IFNULL(p_status, 'inactive'), p_created_by);

    SELECT LAST_INSERT_ID() AS id, p_name AS name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel`(
    IN p_hotel_name VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_country VARCHAR(100),
    IN p_city VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_image_url JSON,
    IN p_rating DECIMAL(2,1),
    IN p_review_count INT,
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    INSERT INTO tbl_hotels (
        hotel_name,
        slug,
        country,
        city,
        price,
        discount_price,
        image_url,
        rating,
        review_count,
        status
    ) VALUES (
        p_hotel_name,
        p_slug,
        p_country,
        p_city,
        p_price,
        p_discount_price,
        p_image_url,
        p_rating,
        p_review_count,
        IFNULL(p_status, 'inactive')
    );

    SELECT LAST_INSERT_ID() AS hotel_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_amenities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_amenities`(
    IN p_hotel_id INT,
    IN p_amenity_ids VARCHAR(255),
    IN p_admin_id INT
)
BEGIN
    DECLARE amenity VARCHAR(20);
    DECLARE inserted_ids TEXT DEFAULT '';

    WHILE LENGTH(p_amenity_ids) > 0 DO

        SET amenity = SUBSTRING_INDEX(p_amenity_ids, ',', 1);

        INSERT INTO tbl_hotel_amenities (
            hotel_id,
            amenity_id,
            status,
            created_by,
            updated_by
        )
        SELECT 
            p_hotel_id,
            amenity,
            'inactive',
            p_admin_id,
            NULL
        WHERE NOT EXISTS (
            SELECT 1 FROM tbl_hotel_amenities 
            WHERE hotel_id = p_hotel_id AND amenity_id = amenity
        );

        IF ROW_COUNT() > 0 THEN
            SET inserted_ids = CONCAT(inserted_ids, LAST_INSERT_ID(), ',');
        END IF;

        SET p_amenity_ids = SUBSTRING(p_amenity_ids, LENGTH(amenity) + 2);

    END WHILE;

    SELECT inserted_ids AS inserted_ids;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_amenity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_amenity`(
    IN p_hotel_id INT,
    IN p_amenity_id INT,
    IN p_admin_id INT   
)
BEGIN
    INSERT INTO tbl_hotel_amenities (
        hotel_id,
        amenity_id,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_hotel_id,
        p_amenity_id,
        'active',                     
        CASE WHEN p_admin_id IS NOT NULL THEN p_admin_id ELSE NULL END,
        NULL                                   
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_categories`(
    IN p_hotel_id INT,
    IN p_category_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    DECLARE cat_id VARCHAR(10);

    WHILE LENGTH(p_category_ids) > 0 DO
        
        SET cat_id = SUBSTRING_INDEX(p_category_ids, ',', 1);

        INSERT INTO tbl_hotel_category_map (hotel_id, category_id, status)
        VALUES (p_hotel_id, cat_id, IFNULL(p_status, 'inactive'));

        SET p_category_ids = SUBSTRING(
            p_category_ids,
            LENGTH(cat_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_category`(
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO tbl_hotel_categories (name)
    VALUES (p_name);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_room` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_room`(
    IN p_hotel_id INT,
    IN p_room_name VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_room_subtitle VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_image_url JSON,
    IN p_description TEXT,
    IN p_status ENUM('active','inactive','archived') 
)
BEGIN
    INSERT INTO tbl_hotel_rooms (
        hotel_id,
        room_name,
        slug,
        room_subtitle,
        price,
        image_url,
        description,
        status
    )
    VALUES (
        p_hotel_id,
        p_room_name,
        p_slug,
        p_room_subtitle,
        p_price,
        p_image_url,
        p_description,
        IFNULL(p_status, 'inactive')
    );
    
    SELECT LAST_INSERT_ID() AS room_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_hotel_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_hotel_tag`(
    IN p_name VARCHAR(100)
)
BEGIN
    INSERT INTO tbl_hotel_tags (name) 
    VALUES (p_name);

    SELECT * FROM tbl_hotel_tags 
    WHERE tag_id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_or_update_hotel_tags` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_or_update_hotel_tags`(
    IN p_hotel_id INT,
    IN p_tag_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived') 
)
BEGIN
    DECLARE tag VARCHAR(10);

    WHILE LENGTH(p_tag_ids) > 0 DO

        SET tag = SUBSTRING_INDEX(p_tag_ids, ',', 1);

        INSERT INTO tbl_hotel_tag_map (hotel_id, tag_id, status)
        SELECT p_hotel_id, tag, IFNULL(p_status, 'inactive')
        WHERE NOT EXISTS (
            SELECT 1 
            FROM tbl_hotel_tag_map
            WHERE hotel_id = p_hotel_id 
              AND tag_id = tag
        );

        UPDATE tbl_hotel_tag_map
        SET status = IFNULL(p_status, status)
        WHERE hotel_id = p_hotel_id
          AND tag_id = tag;

        SET p_tag_ids = SUBSTRING(
            p_tag_ids,
            LENGTH(tag) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_region` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_region`(
    IN p_name VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    INSERT INTO tbl_regions (
        name,
        country_count,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_name,
        0,
        'inactive',
        p_admin_id,
        NULL
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_tour` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_tour`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_description TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_region_id INT,
    IN p_days INT,
    IN p_nights INT,
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_tour_type_id INT,
    IN p_is_featured TINYINT(1),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_tours (
        title, slug, description, thumbnail,
        region_id, days, nights, price, discount_price,
        tour_type_id, is_featured, status, created_by
    )
    VALUES (
        p_title, p_slug, p_description, p_thumbnail,
        p_region_id, p_days, p_nights, p_price, p_discount_price,
        p_tour_type_id, p_is_featured,
        IFNULL(p_status, 'inactive'),
        p_created_by
    );

    SELECT * FROM tbl_tours WHERE tour_id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_tour_destinations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_tour_destinations`(
    IN p_tour_id INT,
    IN p_destination_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    DECLARE dest_id VARCHAR(10);

    WHILE LENGTH(p_destination_ids) > 0 DO

        SET dest_id = SUBSTRING_INDEX(p_destination_ids, ',', 1);

        INSERT INTO tbl_tour_destinations (
            tour_id,
            destination_id,
            status,
            created_by
        )
        VALUES (
            p_tour_id,
            dest_id,
            IFNULL(p_status, 'inactive'),
            p_created_by
        );

        SET p_destination_ids = SUBSTRING(
            p_destination_ids,
            LENGTH(dest_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_tour_experiences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_tour_experiences`(
    IN p_tour_id INT,
    IN p_experience_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    DECLARE exp_id VARCHAR(10);

    WHILE LENGTH(p_experience_ids) > 0 DO
        
        SET exp_id = SUBSTRING_INDEX(p_experience_ids, ',', 1);

        INSERT INTO tbl_tour_experiences (
            tour_id,
            experience_id,
            status,
            created_by
        )
        VALUES (
            p_tour_id,
            exp_id,
            IFNULL(p_status, 'inactive'),
            p_created_by
        );

        SET p_experience_ids = SUBSTRING(p_experience_ids, LENGTH(exp_id) + 2);

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_tour_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_tour_type`(
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_tour_types (name, status, created_by)
    VALUES (p_name, IFNULL(p_status, 'inactive'), p_created_by);

    SELECT 
        id,
        name,
        status,
        created_by,
        created_at,
        updated_at
    FROM tbl_tour_types
    WHERE id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_visa_country` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_visa_country`(
    IN p_country VARCHAR(100),
    IN p_slug VARCHAR(255),
    IN p_min_days INT,
    IN p_max_days INT,
    IN p_notes TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_visa_countries (
        country,
        slug,
        min_days,
        max_days,
        notes,
        thumbnail,
        status,
        created_by
    ) VALUES (
        p_country,
        p_slug,
        p_min_days,
        p_max_days,
        p_notes,
        p_thumbnail,
        p_status,
        p_created_by
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_visa_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_visa_type`(
    IN p_country_id INT,
    IN p_type_name VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_validity_days INT,
    IN p_status ENUM('active','inactive','archived'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_visa_types (
        country_id,
        type_name,
        price,
        validity_days,
        status,
        created_by
    )
    VALUES (
        p_country_id,
        p_type_name,
        p_price,
        p_validity_days,
        p_status,
        p_created_by
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_register_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register_user`(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO tbl_users (name, email, password)
    VALUES (p_name, p_email, p_password);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_remove_hotel_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_remove_hotel_categories`(
    IN p_hotel_id INT,
    IN p_category_ids VARCHAR(255)
)
BEGIN
    DECLARE cat_id VARCHAR(10);

    WHILE LENGTH(p_category_ids) > 0 DO

        SET cat_id = SUBSTRING_INDEX(p_category_ids, ',', 1);

        DELETE FROM tbl_hotel_category_map
        WHERE hotel_id = p_hotel_id
          AND category_id = cat_id;

        SET p_category_ids = SUBSTRING(
            p_category_ids,
            LENGTH(cat_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_remove_hotel_tags` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_remove_hotel_tags`(
    IN p_hotel_id INT,
    IN p_tag_ids VARCHAR(255)
)
BEGIN
    DECLARE tag VARCHAR(10);

    WHILE LENGTH(p_tag_ids) > 0 DO

        SET tag = SUBSTRING_INDEX(p_tag_ids, ',', 1);

        DELETE FROM tbl_hotel_tag_map
        WHERE hotel_id = p_hotel_id
          AND tag_id = tag;

        SET p_tag_ids = SUBSTRING(
            p_tag_ids,
            LENGTH(tag) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_amenity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_amenity`(
    IN p_amenity_id INT,
    IN p_name VARCHAR(100)
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_amenities WHERE amenity_id = p_amenity_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    UPDATE tbl_amenities
    SET name = p_name
    WHERE amenity_id = p_amenity_id;

    SELECT * FROM tbl_amenities 
    WHERE amenity_id = p_amenity_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_blog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_blog`(
    IN p_blog_id INT,
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_content TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_author VARCHAR(100),
    IN p_location VARCHAR(150),
    IN p_category_id INT,
    IN p_tag_id INT,
    IN p_published_date DATE,
    IN p_status ENUM('draft','published','archived')
)
BEGIN
    UPDATE tbl_blogs
    SET
        title = p_title,
        slug = p_slug,
        content = p_content,
        thumbnail = p_thumbnail,
        author = p_author,
        location = p_location,
        category_id = p_category_id,
        tag_id = p_tag_id,
        published_date = p_published_date,
        status = p_status
    WHERE blog_id = p_blog_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_category`(
    IN p_category_id INT,
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    UPDATE tbl_categories
    SET
        name = p_name,
        slug = p_slug,
        updated_by = p_admin_id
    WHERE category_id = p_category_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_destination` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_destination`(
    IN p_id INT,
    IN p_region_id INT,
    IN p_country_name VARCHAR(150),
    IN p_slug VARCHAR(255),
    IN p_images JSON,
    IN p_tours INT,
    IN p_departures INT,
    IN p_guests_travelled INT,
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    UPDATE tbl_destinations
    SET
        region_id = p_region_id,
        country_name = p_country_name,
        slug = p_slug,
        images = p_images,
        tours = IFNULL(p_tours, tours),
        departures = IFNULL(p_departures, departures),
        guests_travelled = IFNULL(p_guests_travelled, guests_travelled),
        status = p_status,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_experience` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_experience`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive','archived'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_experiences
    SET 
        name = p_name,
        status = IFNULL(p_status, status),
        updated_by = p_updated_by
    WHERE id = p_id;

    SELECT * FROM tbl_experiences WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_faq`(
    IN p_id INT,
    IN p_question VARCHAR(255),
    IN p_answer TEXT
)
BEGIN
    UPDATE tbl_faqs
    SET
        question = p_question,
        answer = p_answer
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel`(
    IN p_hotel_id INT,
    IN p_hotel_name VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_country VARCHAR(100),
    IN p_city VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_discount_price DECIMAL(10,2),
    IN p_image_url JSON,
    IN p_rating DECIMAL(2,1),
    IN p_review_count INT,
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    UPDATE tbl_hotels
    SET
        hotel_name = p_hotel_name,
        slug = p_slug,
        country = p_country,
        city = p_city,
        price = p_price,
        discount_price = p_discount_price,
        image_url = p_image_url,
        rating = p_rating,
        review_count = p_review_count,
        status = IFNULL(p_status, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE hotel_id = p_hotel_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel_amenities` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel_amenities`(
    IN p_hotel_id INT,
    IN p_amenity_ids VARCHAR(255)
)
BEGIN
    DECLARE amenity_id VARCHAR(10);

    -- Step 1: Remove all existing amenities for this hotel
    DELETE FROM tbl_hotel_amenities 
    WHERE hotel_id = p_hotel_id;

    -- Step 2: Insert new amenity list
    WHILE LENGTH(p_amenity_ids) > 0 DO
        
        SET amenity_id = SUBSTRING_INDEX(p_amenity_ids, ',', 1);

        INSERT INTO tbl_hotel_amenities (hotel_id, amenity_id)
        VALUES (p_hotel_id, amenity_id);

        SET p_amenity_ids = SUBSTRING(
            p_amenity_ids,
            LENGTH(amenity_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel_categories`(
    IN p_hotel_id INT,
    IN p_category_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    DECLARE cat_id VARCHAR(10);

    WHILE LENGTH(p_category_ids) > 0 DO

        SET cat_id = SUBSTRING_INDEX(p_category_ids, ',', 1);

        INSERT INTO tbl_hotel_category_map (hotel_id, category_id, status)
        SELECT p_hotel_id, cat_id, IFNULL(p_status, 'inactive')
        WHERE NOT EXISTS (
            SELECT 1 
            FROM tbl_hotel_category_map
            WHERE hotel_id = p_hotel_id 
              AND category_id = cat_id
        );

        SET p_category_ids = SUBSTRING(
            p_category_ids,
            LENGTH(cat_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel_category`(
    IN p_category_id INT,
    IN p_name VARCHAR(100)
)
BEGIN
    UPDATE tbl_hotel_categories
    SET name = p_name
    WHERE category_id = p_category_id;

    SELECT * FROM tbl_hotel_categories
    WHERE category_id = p_category_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel_room` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel_room`(
    IN p_room_id INT,
    IN p_room_name VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_room_subtitle VARCHAR(255),
    IN p_price DECIMAL(10,2),
    IN p_image_url JSON,
    IN p_description TEXT,
    IN p_status ENUM('active','inactive','archived')
)
BEGIN
    UPDATE tbl_hotel_rooms
    SET 
        room_name = p_room_name,
        slug = p_slug,
        room_subtitle = p_room_subtitle,
        price = p_price,
        image_url = p_image_url,
        description = p_description,
        status = IFNULL(p_status, status),
        updated_at = NOW()
    WHERE room_id = p_room_id;
    
    SELECT p_room_id AS updated_room_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_hotel_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_hotel_tag`(
    IN p_tag_id INT,
    IN p_name VARCHAR(100)
)
main_block:
BEGIN
    IF (SELECT COUNT(*) FROM tbl_hotel_tags WHERE tag_id = p_tag_id) = 0 THEN
        SELECT 'NOT_FOUND' AS status;
        LEAVE main_block;
    END IF;

    UPDATE tbl_hotel_tags
    SET name = p_name
    WHERE tag_id = p_tag_id;

    SELECT * FROM tbl_hotel_tags 
    WHERE tag_id = p_tag_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_region` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_region`(
    IN p_region_id INT,
    IN p_name VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    UPDATE tbl_regions
    SET 
        name = p_name,
        updated_by = p_admin_id
    WHERE region_id = p_region_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_tag`(
    IN p_tag_id INT,
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    UPDATE tbl_tags
    SET
        name = p_name,
        slug = p_slug,
        updated_by = p_admin_id
    WHERE tag_id = p_tag_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_tour_destinations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_tour_destinations`(
    IN p_tour_id INT,
    IN p_destination_ids VARCHAR(255),
    IN p_status ENUM('active','inactive','archived'),
    IN p_updated_by INT
)
BEGIN
    DECLARE dest_id VARCHAR(10);

    DELETE FROM tbl_tour_destinations WHERE tour_id = p_tour_id;

    WHILE LENGTH(p_destination_ids) > 0 DO

        SET dest_id = SUBSTRING_INDEX(p_destination_ids, ',', 1);

        INSERT INTO tbl_tour_destinations (
            tour_id,
            destination_id,
            status,
            updated_by
        ) VALUES (
            p_tour_id,
            dest_id,
            IFNULL(p_status, 'inactive'),
            p_updated_by
        );

        SET p_destination_ids = SUBSTRING(
            p_destination_ids,
            LENGTH(dest_id) + 2
        );

    END WHILE;

    -- Return updated list
    SELECT * FROM tbl_tour_destinations WHERE tour_id = p_tour_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_tour_experiences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_tour_experiences`(
    IN p_tour_id INT,
    IN p_experience_ids VARCHAR(255)
)
BEGIN
    DECLARE exp_id VARCHAR(10);

    -- Delete previous experience mappings
    DELETE FROM tbl_tour_experiences 
    WHERE tour_id = p_tour_id;

    -- Insert new experience mappings
    WHILE LENGTH(p_experience_ids) > 0 DO
        
        SET exp_id = SUBSTRING_INDEX(p_experience_ids, ',', 1);

        INSERT INTO tbl_tour_experiences (tour_id, experience_id)
        VALUES (p_tour_id, exp_id);

        SET p_experience_ids = SUBSTRING(
            p_experience_ids,
            LENGTH(exp_id) + 2
        );

    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_tour_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_tour_type`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive','archived'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_tour_types
    SET
        name = p_name,
        status = IFNULL(p_status, status),
        updated_by = p_updated_by
    WHERE id = p_id;

    SELECT 
        id,
        name,
        status,
        updated_by,
        created_at,
        updated_at
    FROM tbl_tour_types
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_visa_country` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_visa_country`(
    IN p_visa_id INT,
    IN p_country VARCHAR(100),
    IN p_slug VARCHAR(255),
    IN p_min_days INT,
    IN p_max_days INT,
    IN p_notes TEXT,
    IN p_thumbnail VARCHAR(255),
    IN p_status ENUM('active','inactive','archived'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_visa_countries
    SET 
        country = p_country,
        slug = p_slug,
        min_days = p_min_days,
        max_days = p_max_days,
        notes = p_notes,
        thumbnail = p_thumbnail,
        status = p_status,
        updated_by = p_updated_by
    WHERE visa_id = p_visa_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_visa_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_visa_type`(
    IN p_id INT,
    IN p_country_id INT,
    IN p_type_name VARCHAR(100),
    IN p_price DECIMAL(10,2),
    IN p_validity_days INT,
    IN p_status ENUM('active','inactive','archived'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_visa_types
    SET 
        country_id = p_country_id,
        type_name = p_type_name,
        price = p_price,
        validity_days = p_validity_days,
        status = p_status,
        updated_by = p_updated_by
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_faq`(
    IN p_id INT,
    IN p_question VARCHAR(255),
    IN p_answer TEXT
)
BEGIN
    UPDATE faqs
    SET
        question = p_question,
        answer = p_answer
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 11:38:52
