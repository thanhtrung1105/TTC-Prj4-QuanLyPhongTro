CREATE DATABASE  IF NOT EXISTS `tnmtquanlyphongtro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tnmtquanlyphongtro`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: tnmtquanlyphongtro
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `tnmtchitiethodon`
--

DROP TABLE IF EXISTS `tnmtchitiethodon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtchitiethodon` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'VD: Tiền điện, Tiền nước, Tiền wifi,...',
  `quantity` decimal(10,2) NOT NULL DEFAULT '1.00' COMMENT 'Số lượng (kWh, m3,...)',
  `unit_price` decimal(12,2) NOT NULL COMMENT 'Đơn giá',
  `amount` decimal(12,2) NOT NULL COMMENT 'Thành tiền = quantity * unit_price',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_chitiethodon_hoadon` (`invoice_id`),
  CONSTRAINT `fk_chitiethodon_hoadon` FOREIGN KEY (`invoice_id`) REFERENCES `tnmthoadon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtchitiethodon`
--

LOCK TABLES `tnmtchitiethodon` WRITE;
/*!40000 ALTER TABLE `tnmtchitiethodon` DISABLE KEYS */;
INSERT INTO `tnmtchitiethodon` VALUES (1,1,'Tiền phòng',1.00,3000000.00,3000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,1,'Tiền điện',120.00,3500.00,420000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,1,'Tiền nước',10.00,25000.00,250000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,1,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,1,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(6,2,'Tiền phòng',1.00,2500000.00,2500000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(7,2,'Tiền điện',100.00,3500.00,350000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(8,2,'Tiền nước',8.00,25000.00,200000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(9,2,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(10,2,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(11,3,'Tiền phòng',1.00,3500000.00,3500000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(12,3,'Tiền điện',150.00,3500.00,525000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(13,3,'Tiền nước',8.00,25000.00,200000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(14,3,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(15,3,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(16,4,'Tiền phòng',1.00,3000000.00,3000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(17,4,'Tiền điện',130.00,3500.00,455000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(18,4,'Tiền nước',7.00,25000.00,175000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(19,4,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(20,4,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(21,5,'Tiền phòng',1.00,4000000.00,4000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(22,5,'Tiền điện',160.00,3500.00,560000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(23,5,'Tiền nước',9.00,25000.00,225000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(24,5,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(25,5,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(26,6,'Tiền phòng',1.00,3000000.00,3000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(27,6,'Tiền điện',135.00,3500.00,472500.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(28,6,'Tiền nước',11.00,25000.00,275000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(29,6,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(30,6,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(31,7,'Tiền phòng',1.00,2500000.00,2500000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(32,7,'Tiền điện',110.00,3500.00,385000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(33,7,'Tiền nước',9.00,25000.00,225000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(34,7,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(35,7,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(36,8,'Tiền phòng',1.00,3500000.00,3500000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(37,8,'Tiền điện',140.00,3500.00,490000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(38,8,'Tiền nước',9.00,25000.00,225000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(39,8,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(40,8,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(41,9,'Tiền phòng',1.00,3000000.00,3000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(42,9,'Tiền điện',140.00,3500.00,490000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(43,9,'Tiền nước',8.00,25000.00,200000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(44,9,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(45,9,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(46,10,'Tiền phòng',1.00,4000000.00,4000000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(47,10,'Tiền điện',170.00,3500.00,595000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(48,10,'Tiền nước',10.00,25000.00,250000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(49,10,'Tiền wifi',1.00,100000.00,100000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(50,10,'Tiền rác',1.00,80000.00,80000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtchitiethodon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmthoadon`
--

DROP TABLE IF EXISTS `tnmthoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmthoadon` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contract_id` bigint unsigned NOT NULL,
  `month` tinyint NOT NULL COMMENT 'Tháng (1-12)',
  `year` smallint NOT NULL COMMENT 'Năm',
  `total_amount` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT 'Tổng tiền (VNĐ)',
  `status` enum('pending','paid','overdue') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_hoadon_thang` (`contract_id`,`month`,`year`),
  KEY `idx_hoadon_hopdong` (`contract_id`),
  KEY `idx_hoadon_trangthai` (`status`),
  KEY `idx_hoadon_thang_nam` (`month`,`year`),
  CONSTRAINT `fk_hoadon_hopdong` FOREIGN KEY (`contract_id`) REFERENCES `tnmthopdong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmthoadon`
--

LOCK TABLES `tnmthoadon` WRITE;
/*!40000 ALTER TABLE `tnmthoadon` DISABLE KEYS */;
INSERT INTO `tnmthoadon` VALUES (1,1,3,2026,3850000.00,'paid','2026-03-10 02:00:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,2,3,2026,3180000.00,'paid','2026-03-11 03:30:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,3,3,2026,4300000.00,'paid','2026-03-12 07:30:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,4,3,2026,3750000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,5,3,2026,4850000.00,'paid','2026-03-08 01:00:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(6,1,4,2026,3950000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(7,2,4,2026,3280000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(8,3,4,2026,4150000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(9,4,4,2026,3850000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(10,5,4,2026,4950000.00,'pending',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmthoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmthopdong`
--

DROP TABLE IF EXISTS `tnmthopdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmthopdong` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tenant_id` bigint unsigned NOT NULL,
  `room_id` bigint unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `monthly_price` decimal(12,2) NOT NULL COMMENT 'Giá thuê hàng tháng (VNĐ)',
  `deposit_amount` decimal(12,2) DEFAULT '0.00' COMMENT 'Tiền đặt cọc (VNĐ)',
  `status` enum('active','expired','terminated') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `contract_file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'File hợp đồng scan',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_hopdong_khachthue` (`tenant_id`),
  KEY `idx_hopdong_phong` (`room_id`),
  KEY `idx_hopdong_trangthai` (`status`),
  CONSTRAINT `fk_hopdong_khachthue` FOREIGN KEY (`tenant_id`) REFERENCES `tnmtkhachthue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hopdong_phong` FOREIGN KEY (`room_id`) REFERENCES `tnmtphong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmthopdong`
--

LOCK TABLES `tnmthopdong` WRITE;
/*!40000 ALTER TABLE `tnmthopdong` DISABLE KEYS */;
INSERT INTO `tnmthopdong` VALUES (1,1,1,'2026-01-01','2026-12-31',3000000.00,3000000.00,'active',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,2,2,'2026-01-15','2026-07-15',2500000.00,2500000.00,'active',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,3,4,'2026-02-01','2027-01-31',3500000.00,3500000.00,'active',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,4,5,'2026-03-01','2026-08-31',3000000.00,3000000.00,'active',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,5,7,'2026-01-01','2026-12-31',4000000.00,4000000.00,'active',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmthopdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtkhachthue`
--

DROP TABLE IF EXISTS `tnmtkhachthue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtkhachthue` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cmnd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'CMND/CCCD',
  `address` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Địa chỉ thường trú',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_khachthue_nguoidung` (`user_id`),
  CONSTRAINT `fk_khachthue_nguoidung` FOREIGN KEY (`user_id`) REFERENCES `tnmtnguoidung` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtkhachthue`
--

LOCK TABLES `tnmtkhachthue` WRITE;
/*!40000 ALTER TABLE `tnmtkhachthue` DISABLE KEYS */;
INSERT INTO `tnmtkhachthue` VALUES (1,3,'Nguyễn Văn Minh','vanminhham0896745231@gmail.com','0923456789','001205034567','Hà Nội',NULL,'active','2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,4,'Quách Xuân Thịnh','quachxuanthinh20092005@gmail.com','0934567890','001205045678','Hà Nội',NULL,'active','2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,5,'Trần Văn Hùng','tranvanhung@gmail.com','0945678901','001200067890','Hải Phòng',NULL,'active','2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,6,'Lê Thị Mai','lethimai@gmail.com','0956789012','001200098765','Nam Định',NULL,'active','2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,7,'Phạm Đức Anh','phamducanh@gmail.com','0967890123','001200054321','Hà Nội',NULL,'active','2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtkhachthue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtnguoidung`
--

DROP TABLE IF EXISTS `tnmtnguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtnguoidung` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','chu_tro','khach_thue') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'khach_thue',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_nguoidung_vaitro` (`role`),
  KEY `idx_nguoidung_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtnguoidung`
--

LOCK TABLES `tnmtnguoidung` WRITE;
/*!40000 ALTER TABLE `tnmtnguoidung` DISABLE KEYS */;
INSERT INTO `tnmtnguoidung` VALUES (1,'buitrung4212@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Bùi Thành Trung','0901234567','admin',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,'namlong145@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Nguyễn Đỗ Hiền Nam','0912345678','chu_tro',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,'vanminhham0896745231@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Nguyễn Văn Minh','0923456789','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,'quachxuanthinh20092005@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Quách Xuân Thịnh','0934567890','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,'tranvanhung@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Trần Văn Hùng','0945678901','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(6,'lethimai@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Lê Thị Mai','0956789012','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(7,'phamducanh@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Phạm Đức Anh','0967890123','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(8,'nguyenthilan@gmail.com','$2y$12$LJ3a4N0Xq8VKPX1FQhGOeOQXBwE8Rj1V0Hs5y6X3kq8FnZkYdJ6e','Nguyễn Thị Lan','0978901234','khach_thue',NULL,'active',NULL,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(9,'admin@tnmt.com','$2b$12$qndCBq8Bno2xptZDeQMZkOii5ENaAY6iav.23n839OPssIMNAn.Q2','Admin TNMT',NULL,'admin',NULL,'active',NULL,NULL,'2026-05-04 08:22:38','2026-05-04 08:22:38');
/*!40000 ALTER TABLE `tnmtnguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtnhanvien`
--

DROP TABLE IF EXISTS `tnmtnhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtnhanvien` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Chức vụ: Quản lý, Bảo vệ, Kỹ thuật,...',
  `salary` decimal(12,2) DEFAULT NULL COMMENT 'Lương (VNĐ)',
  `hire_date` date NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_nhanvien_nguoidung` (`user_id`),
  CONSTRAINT `fk_nhanvien_nguoidung` FOREIGN KEY (`user_id`) REFERENCES `tnmtnguoidung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtnhanvien`
--

LOCK TABLES `tnmtnhanvien` WRITE;
/*!40000 ALTER TABLE `tnmtnhanvien` DISABLE KEYS */;
INSERT INTO `tnmtnhanvien` VALUES (1,1,'Quản lý hệ thống',15000000.00,'2025-01-01','active','2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtnhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtphong`
--

DROP TABLE IF EXISTS `tnmtphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtphong` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `landlord_id` bigint unsigned NOT NULL,
  `room_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int DEFAULT '1',
  `area` decimal(8,2) DEFAULT NULL COMMENT 'Diện tích (m2)',
  `base_price` decimal(12,2) NOT NULL COMMENT 'Giá thuê cơ bản (VNĐ)',
  `status` enum('available','occupied','maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Ảnh phòng để quảng cáo (JSON)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_phong_chunha` (`landlord_id`),
  KEY `idx_phong_trangthai` (`status`),
  CONSTRAINT `fk_phong_chunha` FOREIGN KEY (`landlord_id`) REFERENCES `tnmtnguoidung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtphong`
--

LOCK TABLES `tnmtphong` WRITE;
/*!40000 ALTER TABLE `tnmtphong` DISABLE KEYS */;
INSERT INTO `tnmtphong` VALUES (1,2,'P101',1,20.00,3000000.00,'occupied','Phòng trọ tầng 1, có ban công, ánh sáng tự nhiên tốt',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,2,'P102',1,18.00,2500000.00,'occupied','Phòng trọ tầng 1, gần cầu thang, yên tĩnh',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,2,'P103',1,15.00,2000000.00,'available','Phòng trọ nhỏ tầng 1, phù hợp 1 người',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,2,'P201',2,22.00,3500000.00,'occupied','Phòng trọ tầng 2, rộng rãi, view đẹp',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,2,'P202',2,20.00,3000000.00,'occupied','Phòng trọ tầng 2, thoáng mát',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(6,2,'P203',2,18.00,2500000.00,'available','Phòng trọ tầng 2, mới sơn lại',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(7,2,'P301',3,25.00,4000000.00,'occupied','Phòng trọ tầng 3, rộng nhất, có gác lửng',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(8,2,'P302',3,22.00,3500000.00,'available','Phòng trọ tầng 3, thoáng gió',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(9,2,'P303',3,20.00,3000000.00,'maintenance','Phòng trọ tầng 3, đang sửa chữa',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(10,2,'P401',4,28.00,4500000.00,'available','Phòng trọ tầng 4, penthouse, view toàn cảnh',NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtthanhtoan`
--

DROP TABLE IF EXISTS `tnmtthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtthanhtoan` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `amount` decimal(12,2) NOT NULL COMMENT 'Số tiền thanh toán (VNĐ)',
  `payment_method` enum('cash','bank_transfer','momo','zalopay','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `paid_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_thanhtoan_hoadon` (`invoice_id`),
  CONSTRAINT `fk_thanhtoan_hoadon` FOREIGN KEY (`invoice_id`) REFERENCES `tnmthoadon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtthanhtoan`
--

LOCK TABLES `tnmtthanhtoan` WRITE;
/*!40000 ALTER TABLE `tnmtthanhtoan` DISABLE KEYS */;
INSERT INTO `tnmtthanhtoan` VALUES (1,1,3850000.00,'bank_transfer','2026-03-10 02:00:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,2,3180000.00,'momo','2026-03-11 03:30:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,3,4300000.00,'cash','2026-03-12 07:30:00','2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,5,4850000.00,'bank_transfer','2026-03-08 01:00:00','2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtthanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmttienichphong`
--

DROP TABLE IF EXISTS `tnmttienichphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmttienichphong` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` bigint unsigned NOT NULL,
  `utility_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'VD: wifi, điện hòa, nóng lạnh, tủ lạnh,...',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_tienich_phong` (`room_id`),
  CONSTRAINT `fk_tienich_phong` FOREIGN KEY (`room_id`) REFERENCES `tnmtphong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmttienichphong`
--

LOCK TABLES `tnmttienichphong` WRITE;
/*!40000 ALTER TABLE `tnmttienichphong` DISABLE KEYS */;
INSERT INTO `tnmttienichphong` VALUES (1,1,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,1,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,1,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,1,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,2,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(6,2,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(7,2,'Tủ quần áo','2026-04-11 13:36:07','2026-04-11 13:36:07'),(8,3,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(9,3,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(10,4,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(11,4,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(12,4,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(13,4,'Máy giặt','2026-04-11 13:36:07','2026-04-11 13:36:07'),(14,4,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(15,5,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(16,5,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(17,5,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(18,5,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(19,6,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(20,6,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(21,6,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(22,7,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(23,7,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(24,7,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(25,7,'Máy giặt','2026-04-11 13:36:07','2026-04-11 13:36:07'),(26,7,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(27,7,'Bếp điện','2026-04-11 13:36:07','2026-04-11 13:36:07'),(28,8,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(29,8,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(30,8,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(31,8,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(32,9,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(33,9,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(34,9,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(35,10,'Wifi','2026-04-11 13:36:07','2026-04-11 13:36:07'),(36,10,'Điều hòa','2026-04-11 13:36:07','2026-04-11 13:36:07'),(37,10,'Nóng lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(38,10,'Máy giặt','2026-04-11 13:36:07','2026-04-11 13:36:07'),(39,10,'Tủ lạnh','2026-04-11 13:36:07','2026-04-11 13:36:07'),(40,10,'Bếp điện','2026-04-11 13:36:07','2026-04-11 13:36:07'),(41,10,'Ban công','2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmttienichphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tnmtyeucaubaoduong`
--

DROP TABLE IF EXISTS `tnmtyeucaubaoduong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnmtyeucaubaoduong` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` bigint unsigned NOT NULL,
  `tenant_id` bigint unsigned NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tiêu đề yêu cầu',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả chi tiết',
  `status` enum('pending','in_progress','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `estimated_cost` decimal(12,2) DEFAULT NULL COMMENT 'Chi phí dự kiến',
  `actual_cost` decimal(12,2) DEFAULT NULL COMMENT 'Chi phí thực tế',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_yeucau_khachthue` (`tenant_id`),
  KEY `idx_yeucau_phong` (`room_id`),
  KEY `idx_yeucau_trangthai` (`status`),
  CONSTRAINT `fk_yeucau_khachthue` FOREIGN KEY (`tenant_id`) REFERENCES `tnmtkhachthue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_yeucau_phong` FOREIGN KEY (`room_id`) REFERENCES `tnmtphong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnmtyeucaubaoduong`
--

LOCK TABLES `tnmtyeucaubaoduong` WRITE;
/*!40000 ALTER TABLE `tnmtyeucaubaoduong` DISABLE KEYS */;
INSERT INTO `tnmtyeucaubaoduong` VALUES (1,1,1,'Hỏng vòi nước','Vòi nước trong nhà vệ sinh bị rỉ nước, cần thay mới','completed',200000.00,180000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(2,4,3,'Điều hòa không mát','Điều hòa chạy nhưng không mát, cần kiểm tra gas','in_progress',500000.00,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(3,9,1,'Sơn lại phòng P303','Tường phòng bị bong tróc sơn, cần sơn lại toàn bộ','pending',1500000.00,NULL,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(4,2,2,'Hỏng ổ khóa cửa','Ổ khóa cửa chính bị kẹt, không mở được','completed',300000.00,250000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07'),(5,7,5,'Bóng đèn hỏng','Bóng đèn phòng ngủ bị cháy, cần thay bóng LED mới','completed',50000.00,45000.00,'2026-04-11 13:36:07','2026-04-11 13:36:07');
/*!40000 ALTER TABLE `tnmtyeucaubaoduong` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-04 15:27:01
