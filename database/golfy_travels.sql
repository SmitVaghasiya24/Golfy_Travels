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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-18  8:42:11
