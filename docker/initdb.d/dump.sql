-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: acs
-- ------------------------------------------------------
-- Server version	5.5.5-10.10.7-MariaDB-1:10.10.7+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- ✅ 1. 사용자 생성
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- ✅ 2. 데이터베이스 생성 및 선택
CREATE DATABASE IF NOT EXISTS acs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE acs;


--
-- Table structure for table `acs_site_master`
--

DROP TABLE IF EXISTS `acs_site_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_site_master` (
  `site_cd` varchar(50) NOT NULL COMMENT '사이트 고유 코드',
  `site_nm` varchar(255) NOT NULL COMMENT '사이트 명칭',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`site_cd`),
  UNIQUE KEY `IDX_8915b3298faa3cae7b44603e0b` (`site_nm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_site_master`
--

LOCK TABLES `acs_site_master` WRITE;
/*!40000 ALTER TABLE `acs_site_master` DISABLE KEYS */;
INSERT INTO `acs_site_master` VALUES ('HU','HUBIS',1,'2025-01-17 17:36:21.000000','2025-01-17 17:36:21.000000',NULL,NULL,NULL,'','administrator','administrator',NULL);
/*!40000 ALTER TABLE `acs_site_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_role_master`
--

DROP TABLE IF EXISTS `acs_role_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_role_master` (
  `role_cd` varchar(50) NOT NULL COMMENT '역할 코드',
  `role_nm` varchar(255) NOT NULL COMMENT '역할 이름',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`role_cd`,`site_cd`),
  KEY `role_site_cd_fk` (`site_cd`),
  CONSTRAINT `role_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Role 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_role_master`
--

LOCK TABLES `acs_role_master` WRITE;
/*!40000 ALTER TABLE `acs_role_master` DISABLE KEYS */;
INSERT INTO `acs_role_master` VALUES ('Administrator','admin',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:39:09','administrator','2025-01-17 17:39:09',NULL,NULL),('Guest','guest',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:39:09','administrator','2025-01-17 17:39:09',NULL,NULL);
/*!40000 ALTER TABLE `acs_role_master` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `acs_rule_master`
--

DROP TABLE IF EXISTS `acs_rule_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_rule_master` (
  `rule_cd` varchar(50) NOT NULL COMMENT '규칙 코드',
  `rule_nm` varchar(255) NOT NULL COMMENT '규칙 이름',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`rule_cd`,`site_cd`),
  KEY `rule_site_cd_fk` (`site_cd`),
  CONSTRAINT `rule_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Rule 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_rule_master`
--

LOCK TABLES `acs_rule_master` WRITE;
/*!40000 ALTER TABLE `acs_rule_master` DISABLE KEYS */;
INSERT INTO `acs_rule_master` VALUES ('MENU_001','MENU_UPDATE',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:47:43','administrator','2025-01-17 17:47:43',NULL,NULL);
/*!40000 ALTER TABLE `acs_rule_master` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `acs_userclass_master`
--

DROP TABLE IF EXISTS `acs_userclass_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_userclass_master` (
  `class_cd` varchar(50) NOT NULL COMMENT '그룹 코드',
  `class_nm` varchar(255) NOT NULL COMMENT '그룹 명칭',
  `role_cd` varchar(50) NOT NULL COMMENT '그룹에 할당된 역할 코드',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`class_cd`,`site_cd`),
  KEY `userclass_role_cd_fk` (`role_cd`),
  KEY `userclass_site_cd_fk` (`site_cd`),
  CONSTRAINT `userclass_role_cd_fk` FOREIGN KEY (`role_cd`) REFERENCES `acs_role_master` (`role_cd`) ON UPDATE CASCADE,
  CONSTRAINT `userclass_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User Group 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_userclass_master`
--

LOCK TABLES `acs_userclass_master` WRITE;
/*!40000 ALTER TABLE `acs_userclass_master` DISABLE KEYS */;
INSERT INTO `acs_userclass_master` VALUES ('HUBIS_ACS-00','HUBIS_ACS','Administrator',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:39:28','administrator','2025-01-17 17:39:28',NULL,NULL);
/*!40000 ALTER TABLE `acs_userclass_master` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `acs_user_master`
--

DROP TABLE IF EXISTS `acs_user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_user_master` (
  `account_id` varchar(255) NOT NULL COMMENT '계정 ID',
  `user_nm` varchar(255) DEFAULT NULL COMMENT '사용자 이름',
  `password_tx` varchar(255) NOT NULL COMMENT '암호화된 비밀번호',
  `email_nm` varchar(255) DEFAULT NULL COMMENT '이메일 주소',
  `role_cd` varchar(50) NOT NULL DEFAULT 'Guest' COMMENT '그룹에 할당된 역할 코드',
  `class_cd` varchar(50) DEFAULT NULL COMMENT '유저가 속한 그룹정보',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`account_id`,`site_cd`),
  KEY `user_role_cd_fk` (`role_cd`),
  KEY `user_site_cd_fk` (`site_cd`),
  KEY `user_class_cd_fk` (`class_cd`),
  CONSTRAINT `user_class_cd_fk` FOREIGN KEY (`class_cd`) REFERENCES `acs_userclass_master` (`class_cd`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_role_cd_fk` FOREIGN KEY (`role_cd`) REFERENCES `acs_role_master` (`role_cd`) ON UPDATE CASCADE,
  CONSTRAINT `user_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_user_master`
--

LOCK TABLES `acs_user_master` WRITE;
/*!40000 ALTER TABLE `acs_user_master` DISABLE KEYS */;
INSERT INTO `acs_user_master` VALUES ('admin','admin','$2b$10$1J94HgnbcbSK/qe/NwasceQIq6x/fJQbVCTjcKVSUjfKGm.fCPaqW','srchoi_2@hubis.ai','Administrator','HUBIS_ACS-00',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:39:54','administrator','2025-01-17 17:39:54',NULL,NULL),('admin2',NULL,'$2b$10$1J94HgnbcbSK/qe/NwasceQIq6x/fJQbVCTjcKVSUjfKGm.fCPaqW','srchoi_2@hubis.ai','Guest',NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-02-19 09:22:18',NULL,'2025-02-19 09:22:18',NULL,NULL),('operoper','operoper','$2b$10$1J94HgnbcbSK/qe/NwasceQIq6x/fJQbVCTjcKVSUjfKGm.fCPaqW','operoper','Guest',NULL,1,'HU',NULL,NULL,NULL,'administrator','2025-01-17 17:39:54','administrator','2025-01-17 17:39:54',NULL,NULL);
/*!40000 ALTER TABLE `acs_user_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_area_master`
--

DROP TABLE IF EXISTS `acs_area_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_area_master` (
  `area_id` varchar(20) NOT NULL COMMENT '영역 ID',
  `area_nm` varchar(255) DEFAULT NULL COMMENT '영역 명칭',
  `area_tp` varchar(255) DEFAULT NULL COMMENT '영역 타입',
  `point_cnt` varchar(255) DEFAULT NULL COMMENT '영역 포인트 개수',
  `point_val` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '포인트 정보',
  `map_uuid` bigint(11) NOT NULL COMMENT '맵 고유 ID',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`area_id`,`map_uuid`,`site_cd`),
  KEY `area_site_cd_fk` (`site_cd`),
  KEY `area_map_uuid_fk` (`map_uuid`),
  CONSTRAINT `area_map_uuid_fk` FOREIGN KEY (`map_uuid`) REFERENCES `acs_map_master` (`map_uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `area_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='map area Master정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_area_master`
--

LOCK TABLES `acs_area_master` WRITE;
/*!40000 ALTER TABLE `acs_area_master` DISABLE KEYS */;
INSERT INTO `acs_area_master` VALUES ('area_01','area_01','traffic','3','{ \"point1\" : 12,3, \"point2\" : 4,5, \"point3\":6,7}',123,1,'HU',NULL,NULL,'','administrator','2025-01-17 17:41:35','administrator','2025-01-17 17:41:35',NULL,NULL);
/*!40000 ALTER TABLE `acs_area_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_carrier_hist`
--

DROP TABLE IF EXISTS `acs_carrier_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_carrier_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `carrier_id` varchar(255) DEFAULT NULL COMMENT 'carrier ID',
  `carrier_tp` varchar(255) DEFAULT NULL COMMENT 'carrier 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `carrier_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `carrier_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='carrier 변경 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_carrier_hist`
--

LOCK TABLES `acs_carrier_hist` WRITE;
/*!40000 ALTER TABLE `acs_carrier_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_carrier_hist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_carrier_master`
--

DROP TABLE IF EXISTS `acs_carrier_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_carrier_master` (
  `carrier_id` varchar(255) NOT NULL COMMENT 'carrier ID',
  `carrier_tp` varchar(255) DEFAULT NULL COMMENT 'carrier 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `port_id` varchar(50) NOT NULL COMMENT '포트 명칭',
    `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`carrier_id`,`port_id`,`site_cd`),
  KEY `carrier_port_id_fk` (`port_id`),
  KEY `carrier_site_cd_fk` (`site_cd`),
  CONSTRAINT `carrier_port_id_fk` FOREIGN KEY (`port_id`) REFERENCES `acs_port_master` (`port_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carrier_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='carrier Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_carrier_master`
--

LOCK TABLES `acs_carrier_master` WRITE;
/*!40000 ALTER TABLE `acs_carrier_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_carrier_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_const_master`
--

DROP TABLE IF EXISTS `acs_const_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_const_master` (
  `constant_cd` varchar(255) NOT NULL COMMENT '상수 코드',
  `constant_tp` varchar(255) NOT NULL COMMENT '상수 타입',
  `constant_nm` varchar(255) NOT NULL COMMENT '상수 명칭',
  `constant_val` varchar(255) NOT NULL COMMENT '상수 값',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`constant_cd`,`constant_tp`,`site_cd`),
  KEY `const_site_cd_fk` (`site_cd`),
  CONSTRAINT `const_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Constant Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_const_master`
--

LOCK TABLES `acs_const_master` WRITE;
/*!40000 ALTER TABLE `acs_const_master` DISABLE KEYS */;
INSERT INTO `acs_const_master` VALUES ('FLEET_01','TRAFFIC','FLEET_01','true',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:42:39','administrator','2025-01-17 17:42:39',NULL,NULL);
/*!40000 ALTER TABLE `acs_const_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_equipment_hist`
--

DROP TABLE IF EXISTS `acs_equipment_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_equipment_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `equipment_id` varchar(255) DEFAULT NULL COMMENT '설비 명칭',
  `equipment_tp` varchar(255) DEFAULT NULL COMMENT '설비 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `equipment_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `equipment_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='equipment 변경 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_equipment_hist`
--

LOCK TABLES `acs_equipment_hist` WRITE;
/*!40000 ALTER TABLE `acs_equipment_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_equipment_hist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_equipment_master`
--

DROP TABLE IF EXISTS `acs_equipment_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_equipment_master` (
  `equipment_id` varchar(50) NOT NULL COMMENT '설비 명칭',
  `equipment_tp` varchar(255) DEFAULT NULL COMMENT '설비 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`equipment_id`,`site_cd`),
  KEY `equipment_site_cd_fk` (`site_cd`),
  CONSTRAINT `equipment_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='equipment Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_equipment_master`
--

LOCK TABLES `acs_equipment_master` WRITE;
/*!40000 ALTER TABLE `acs_equipment_master` DISABLE KEYS */;
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P2', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P3', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P4', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P5', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P6', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P7', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P8', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
INSERT INTO acs.acs_equipment_master
(equipment_id, equipment_tp, status_tx, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('Q1', 'Muitl', 'RUNNING', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:35:43.000', NULL, '2025-04-17 15:35:43.000', NULL, NULL);
/*!40000 ALTER TABLE `acs_equipment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_lang_master`
--

DROP TABLE IF EXISTS `acs_lang_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_lang_master` (
  `lang_cd` varchar(50) NOT NULL COMMENT '다국어 코드',
  `lang_tp` varchar(50) NOT NULL COMMENT '다국어 타입',
  `lang_val` varchar(255) NOT NULL COMMENT '다국어 값',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`lang_cd`,`lang_tp`,`site_cd`),
  KEY `lang_site_cd_fk` (`site_cd`),
  CONSTRAINT `lang_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Language Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_lang_master`
--

LOCK TABLES `acs_lang_master` WRITE;
/*!40000 ALTER TABLE `acs_lang_master` DISABLE KEYS */;
INSERT INTO `acs_lang_master` VALUES ('OPENING_01','KR','대시보드',1,'HU',NULL,NULL,'','administrator','2025-02-20 16:41:55','administrator','2025-02-20 16:41:55',NULL,NULL),('OPENING_02','KR','설정',1,'HU',NULL,NULL,'','administrator','2025-02-20 16:42:08','administrator','2025-02-20 16:42:08',NULL,NULL);
/*!40000 ALTER TABLE `acs_lang_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_link_master`
--

DROP TABLE IF EXISTS `acs_link_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_link_master` (
  `link_id` varchar(255) NOT NULL COMMENT '링크 ID',
  `link_nm` varchar(255) DEFAULT NULL COMMENT '링크 명칭',
  `degree_val` varchar(255) DEFAULT NULL COMMENT '연결 방향',
  `map_uuid` bigint(11) NOT NULL COMMENT '맵 고유 ID',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`link_id`,`map_uuid`,`site_cd`),
  KEY `link_site_cd_fk` (`site_cd`),
  KEY `link_map_uuid_fk` (`map_uuid`),
  CONSTRAINT `link_map_uuid_fk` FOREIGN KEY (`map_uuid`) REFERENCES `acs_map_master` (`map_uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `link_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='link Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_link_master`
--

LOCK TABLES `acs_link_master` WRITE;
/*!40000 ALTER TABLE `acs_link_master` DISABLE KEYS */;
INSERT INTO `acs_link_master` VALUES ('NODE_01_NODE_02','LINK_01','90',123,1,'HU',NULL,NULL,'','administrator','2025-01-17 17:49:04','administrator','2025-01-17 17:49:04',NULL,NULL);
/*!40000 ALTER TABLE `acs_link_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_login_hist`
--

DROP TABLE IF EXISTS `acs_login_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_login_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `user_nm` varchar(255) DEFAULT NULL COMMENT '사용자 이름',
  `role_cd` varchar(255) NOT NULL COMMENT '역할 코드',
  `access_by` datetime NOT NULL DEFAULT current_timestamp() COMMENT '접속 시간',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `login_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `login_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='로그인 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_login_hist`
--

LOCK TABLES `acs_login_hist` WRITE;
/*!40000 ALTER TABLE `acs_login_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_login_hist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_map_master`
--

DROP TABLE IF EXISTS `acs_map_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_map_master` (
  `map_uuid` bigint(11) NOT NULL COMMENT '맵 고유 ID',
  `map_nm` varchar(255) DEFAULT NULL COMMENT '맵 명칭',
  `map_val` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '맵 정보',
  `map_res` tinyint(2) NOT NULL DEFAULT 1 COMMENT '맵 해상도',
  `map_ver` varchar(255) DEFAULT NULL COMMENT '맵 버전',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`map_uuid`,`site_cd`),
  UNIQUE KEY `map_nm_site_cd_uq` (`map_nm`,`site_cd`),
  KEY `map_site_cd_fk` (`site_cd`),
  CONSTRAINT `map_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='map Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_map_master`
--

LOCK TABLES `acs_map_master` WRITE;
/*!40000 ALTER TABLE `acs_map_master` DISABLE KEYS */;
INSERT INTO `acs_map_master` VALUES (123,'map_01','{ \"map_uuid\":\"123123\",\"map_nm\":\"test\"}',1,'0.1.0',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:40:46','administrator','2025-01-17 17:40:46',NULL,NULL);
/*!40000 ALTER TABLE `acs_map_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_menu_master`
--

DROP TABLE IF EXISTS `acs_menu_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_menu_master` (
  `menu_cd` varchar(50) NOT NULL COMMENT '메뉴 고유 코드',
  `menu_nm` varchar(255) NOT NULL COMMENT '메뉴 이름',
  `menu_url` varchar(255) NOT NULL COMMENT '메뉴 URL',
  `parent_id` varchar(50) DEFAULT NULL COMMENT '상위 메뉴 ID',
  `menu_seq` int(11) DEFAULT 1 COMMENT '메뉴 정렬 순서',
  `menu_depth` int(11) DEFAULT 0 COMMENT '메뉴 깊이 (0: 최상위, 1: 1단계 하위, ...)',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`menu_cd`,`site_cd`),
  KEY `menu_parent_id_fk` (`parent_id`),
  KEY `menu_site_cd_fk` (`site_cd`),
  CONSTRAINT `menu_parent_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `acs_menu_master` (`menu_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Menu Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_menu_master`
--

LOCK TABLES `acs_menu_master` WRITE;
/*!40000 ALTER TABLE `acs_menu_master` DISABLE KEYS */;
INSERT INTO `acs_menu_master` VALUES ('DASHBOARD','대시보드','/',NULL,2,0,1,'HU',NULL,NULL,NULL,NULL,'2025-02-19 09:56:51',NULL,'2025-02-19 09:56:51',NULL,NULL),('LANGUAGE','다국어','/language','SETTING',1,1,1,'HU',NULL,NULL,NULL,NULL,'2025-02-25 10:42:43',NULL,'2025-02-25 10:42:43',NULL,NULL),('LOGIN','로그인','/login',NULL,1,0,1,'HU',NULL,NULL,'','administrator','2025-01-17 17:48:35','administrator','2025-01-17 17:48:35',NULL,NULL),('PERMISSION','권한관리','/permission','SETTING',3,1,1,'HU',NULL,NULL,NULL,NULL,'2025-02-25 13:25:16',NULL,'2025-02-25 13:25:16',NULL,NULL),('SETTING','설정','/settings',NULL,3,0,1,'HU',NULL,NULL,NULL,NULL,'2025-02-19 09:57:14',NULL,'2025-02-19 09:57:14',NULL,NULL),('SITE','사이트','/site','SETTING',2,1,1,'HU',NULL,NULL,NULL,NULL,'2025-02-25 13:24:35',NULL,'2025-02-25 13:24:35',NULL,NULL),('TRANSFER','작업','/transfer',NULL,4,0,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:27:58',NULL,'2025-04-11 15:27:58',NULL,NULL),('TRANSFERCREATE','작업생성','/transfercreate','TRANSFER',4,1,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:27:58',NULL,'2025-04-11 15:27:58',NULL,NULL);
/*!40000 ALTER TABLE `acs_menu_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_menu_role_rel`
--

DROP TABLE IF EXISTS `acs_menu_role_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_menu_role_rel` (
  `menu_cd` varchar(50) NOT NULL COMMENT '메뉴 고유 코드',
  `role_cd` varchar(50) NOT NULL COMMENT '규칙 코드',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`menu_cd`,`role_cd`,`site_cd`),
  KEY `menu_rel_role_cd_fk` (`role_cd`),
  KEY `menu_rel_menu_cd_fk` (`menu_cd`),
  KEY `menu_rel_site_cd_fk` (`site_cd`),
  CONSTRAINT `menu_rel_menu_cd_fk` FOREIGN KEY (`menu_cd`) REFERENCES `acs_menu_master` (`menu_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_rel_role_cd_fk` FOREIGN KEY (`role_cd`) REFERENCES `acs_role_master` (`role_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_rel_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Menu_Role 관계 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_menu_role_rel`
--

LOCK TABLES `acs_menu_role_rel` WRITE;
/*!40000 ALTER TABLE `acs_menu_role_rel` DISABLE KEYS */;
INSERT INTO `acs_menu_role_rel` VALUES ('DASHBOARD','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-20 17:44:25','administrator','2025-02-20 17:44:25',NULL,NULL),('DASHBOARD','Guest',1,'HU',NULL,NULL,'','administrator','2025-02-20 17:44:25','administrator','2025-02-20 17:44:25',NULL,NULL),('LANGUAGE','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-25 10:43:58','administrator','2025-02-25 10:43:58',NULL,NULL),('LOGIN','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-20 17:44:25','administrator','2025-02-20 17:44:25',NULL,NULL),('PERMISSION','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-25 13:29:24','administrator','2025-02-25 13:29:24',NULL,NULL),('SETTING','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-20 17:44:25','administrator','2025-02-20 17:44:25',NULL,NULL),('SETTING','Guest',1,'HU',NULL,NULL,'','administrator','2025-02-20 17:44:25','administrator','2025-02-20 17:44:25',NULL,NULL),('SITE','Administrator',1,'HU',NULL,NULL,'','administrator','2025-02-25 13:29:24','administrator','2025-02-25 13:29:24',NULL,NULL),('TRANSFER','Administrator',1,'HU',NULL,NULL,'','administrator','2025-04-11 15:29:21','administrator','2025-04-11 15:29:21',NULL,NULL),('TRANSFERCREATE','Administrator',1,'HU',NULL,NULL,'','administrator','2025-04-11 15:29:21','administrator','2025-04-11 15:29:21',NULL,NULL);
/*!40000 ALTER TABLE `acs_menu_role_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_node_master`
--

DROP TABLE IF EXISTS `acs_node_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_node_master` (
  `node_id` varchar(20) NOT NULL COMMENT '노드 ID',
  `node_nm` varchar(255) DEFAULT NULL COMMENT '노드 명칭',
  `pos_x_val` varchar(255) DEFAULT NULL COMMENT 'X 좌표',
  `pos_y_val` varchar(255) DEFAULT NULL COMMENT 'Y 좌표',
  `degree_val` varchar(255) DEFAULT NULL COMMENT '정위치 회전 각도',
  `occpyied_robot_id` varchar(255) DEFAULT NULL COMMENT '점유 로봇 ID',
  `area_id` varchar(10) DEFAULT NULL COMMENT '영역 정보',
  `map_uuid` bigint(11) NOT NULL COMMENT '맵 고유 ID',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`node_id`,`map_uuid`,`site_cd`),
  KEY `node_site_cd_fk` (`site_cd`),
  KEY `node_map_uuid_fk` (`map_uuid`),
  KEY `node_area_id_fk` (`area_id`),
  CONSTRAINT `node_area_id_fk` FOREIGN KEY (`area_id`) REFERENCES `acs_area_master` (`area_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `node_map_uuid_fk` FOREIGN KEY (`map_uuid`) REFERENCES `acs_map_master` (`map_uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `node_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='node Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_node_master`
--

LOCK TABLES `acs_node_master` WRITE;
/*!40000 ALTER TABLE `acs_node_master` DISABLE KEYS */;
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_01', 'NODE_01', '1', '2', '0', NULL, NULL, 123, 1, 'HU', NULL, NULL, '', 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_02', 'NODE_02', '1', '2', '0', NULL, NULL, 123, 1, 'HU', NULL, NULL, '', 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_03', 'NODE_03', '3', '4', '90', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_04', 'NODE_04', '5', '6', '-90', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:37:44.000', NULL, '2025-04-17 15:37:44.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_05', 'NODE_05', '1', '2', '0', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_06', 'NODE_06', '1', '2', '0', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_07', 'NODE_07', '3', '4', '-180', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, 'administrator', '2025-01-17 17:44:13.000', 'administrator', '2025-01-17 17:44:13.000', NULL, NULL);
INSERT INTO acs.acs_node_master
(node_id, node_nm, pos_x_val, pos_y_val, degree_val, occpyied_robot_id, area_id, map_uuid, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('NODE_08', 'NODE_08', '5', '6', '180', NULL, NULL, 123, 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:37:44.000', NULL, '2025-04-17 15:37:44.000', NULL, NULL);
/*!40000 ALTER TABLE `acs_node_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_port_hist`
--

DROP TABLE IF EXISTS `acs_port_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_port_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `port_id` varchar(255) DEFAULT NULL COMMENT '포트 명칭',
  `port_tp` varchar(255) DEFAULT NULL COMMENT '포트 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `equipment_id` varchar(255) DEFAULT NULL COMMENT '포트의 설비',
  `node_id` varchar(255) DEFAULT NULL COMMENT '포트의 위치정보',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `port_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `port_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='port 변경 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_port_hist`
--

LOCK TABLES `acs_port_hist` WRITE;
/*!40000 ALTER TABLE `acs_port_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_port_hist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_port_master`
--

DROP TABLE IF EXISTS `acs_port_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_port_master` (
  `port_id` varchar(50) NOT NULL COMMENT '포트 명칭',
  `port_tp` varchar(255) DEFAULT NULL COMMENT '포트 타입',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `equipment_id` varchar(50) NOT NULL COMMENT '포트의 설비',
  `node_id` varchar(20) DEFAULT NULL COMMENT '포트의 위치정보',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`port_id`,`equipment_id`,`site_cd`),
  KEY `port_node_id_fk` (`node_id`),
  KEY `port_equipment_id_fk` (`equipment_id`),
  KEY `port_site_cd_fk` (`site_cd`),
  CONSTRAINT `port_equipment_id_fk` FOREIGN KEY (`equipment_id`) REFERENCES `acs_equipment_master` (`equipment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `port_node_id_fk` FOREIGN KEY (`node_id`) REFERENCES `acs_node_master` (`node_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `port_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='port Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_port_master`
--

LOCK TABLES `acs_port_master` WRITE;
/*!40000 ALTER TABLE `acs_port_master` DISABLE KEYS */;
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-1', 'Muitl', 'RUNNING', 'P1', 'NODE_01', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-2', 'Muitl', 'RUNNING', 'P1', 'NODE_02', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-3', 'Muitl', 'RUNNING', 'P1', 'NODE_03', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-4', 'Muitl', 'RUNNING', 'P1', 'NODE_04', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-5', 'Muitl', 'RUNNING', 'P1', 'NODE_05', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
INSERT INTO acs.acs_port_master
(port_id, port_tp, status_tx, equipment_id, node_id, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('P1-6', 'Muitl', 'RUNNING', 'P1', 'NODE_06', 1, 'HU', NULL, NULL, NULL, NULL, '2025-04-17 15:36:40.000', NULL, '2025-04-17 15:36:40.000', NULL, NULL);
/*!40000 ALTER TABLE `acs_port_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_robot_hist`
--

DROP TABLE IF EXISTS `acs_robot_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_robot_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `robot_id` varchar(255) DEFAULT NULL COMMENT '로봇 ID',
  `robot_tp` varchar(255) DEFAULT NULL COMMENT '로봇 타입',
  `model_nm` varchar(255) DEFAULT NULL COMMENT '모델명',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `battery_no` double DEFAULT 0 COMMENT '로봇의 배터리 정보',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `robot_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `robot_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='robot 변경 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_robot_hist`
--

LOCK TABLES `acs_robot_hist` WRITE;
/*!40000 ALTER TABLE `acs_robot_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_robot_hist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_robot_master`
--

DROP TABLE IF EXISTS `acs_robot_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_robot_master` (
  `robot_id` varchar(255) NOT NULL COMMENT '로봇 ID',
  `robot_tp` varchar(255) DEFAULT NULL COMMENT '로봇 타입',
  `model_nm` varchar(255) DEFAULT NULL COMMENT '모델명',
  `status_tx` varchar(255) DEFAULT NULL COMMENT '상태',
  `location_nm` varchar(50) NOT NULL COMMENT '로봇의 현재 위치 정보',
  `wait_location_nm` varchar(50) DEFAULT NULL COMMENT '로봇의 고정 대기위치 | 빈 경우 동적 대기',
  `battery_no` double NOT NULL DEFAULT 0 COMMENT '로봇의 배터리 정보',
  `map_uuid` bigint(11) NOT NULL COMMENT '맵 고유 ID',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`robot_id`,`site_cd`),
  KEY `robot_site_cd_fk` (`site_cd`),
  KEY `robot_map_uuid_fk` (`map_uuid`),
  CONSTRAINT `robot_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='robot Master 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_robot_master`
--

LOCK TABLES `acs_robot_master` WRITE;
/*!40000 ALTER TABLE `acs_robot_master` DISABLE KEYS */;
INSERT INTO acs.acs_robot_master
(robot_id, robot_tp, model_nm, status_tx, battery_no, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('ROBOT_01', 'LIFT', 'OMRON_LD_90x', 'idle', 0.0, 1, 'HU', NULL, NULL, '', 'administrator', '2025-01-17 17:45:38.000', 'administrator', '2025-01-17 17:45:38.000', NULL, NULL);
INSERT INTO acs.acs_robot_master
(robot_id, robot_tp, model_nm, status_tx, battery_no, usable_fl, site_cd, description_tx, prev_activity_tx, activity_tx, creator_by, create_at, modifier_by, modify_at, trans_tx, last_event_at)
VALUES('ROBOT_02', 'LIFT', 'EPT', 'idle', 0.0, 1, 'HU', NULL, NULL, NULL, 'administrator', '2025-04-10 11:27:50.000', 'administrator', '2025-04-10 11:27:50.000', NULL, NULL);
/*!40000 ALTER TABLE `acs_robot_master` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `acs_role_rule_rel`
--

DROP TABLE IF EXISTS `acs_role_rule_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_role_rule_rel` (
  `role_cd` varchar(50) NOT NULL COMMENT '역할 코드',
  `rule_cd` varchar(50) NOT NULL COMMENT '규칙 코드',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`role_cd`,`rule_cd`,`site_cd`),
  KEY `acs_role_rule_rel_site_cd_fk` (`site_cd`),
  KEY `acs_role_rule_rel_rule_cd_fk` (`rule_cd`),
  CONSTRAINT `acs_role_rule_rel_role_cd_fk` FOREIGN KEY (`role_cd`) REFERENCES `acs_role_master` (`role_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `acs_role_rule_rel_rule_cd_fk` FOREIGN KEY (`rule_cd`) REFERENCES `acs_rule_master` (`rule_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `acs_role_rule_rel_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Role-Rule 관계 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_role_rule_rel`
--

LOCK TABLES `acs_role_rule_rel` WRITE;
/*!40000 ALTER TABLE `acs_role_rule_rel` DISABLE KEYS */;
INSERT INTO `acs_role_rule_rel` VALUES ('Administrator','MENU_001',1,'HU',NULL,NULL,'','administrator','2025-01-17 17:47:55','administrator','2025-01-17 17:47:55',NULL,NULL);
/*!40000 ALTER TABLE `acs_role_rule_rel` ENABLE KEYS */;
UNLOCK TABLES;




--
-- Table structure for table `acs_transfer_control`
--

DROP TABLE IF EXISTS `acs_transfer_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_transfer_control` (
  `transfer_id` varchar(255) NOT NULL COMMENT '작업 ID',
  `transfer_tp` varchar(255) DEFAULT NULL COMMENT '작업 타입',
  `assigned_robot_id` varchar(255) DEFAULT NULL COMMENT '작업 할당 로봇 ID',
  `transfer_st` varchar(255) DEFAULT 'READY' COMMENT '작업 상태',
  `priority_no` int(5) DEFAULT 10 COMMENT '작업 우선 순위',
  `source_port_id` varchar(50) DEFAULT NULL COMMENT '작업 대상 포트 명칭',
  `destination_port_id` varchar(50) DEFAULT NULL COMMENT '최종 목적지 예치 포트 명칭',
  `acquire_start_at` datetime DEFAULT NULL COMMENT '물품 수령 시작 시간',
  `acquire_end_at` datetime DEFAULT NULL COMMENT '물품 수령 완료 시간',
  `deposit_start_at` datetime DEFAULT NULL COMMENT '물품 예치 시작 시간',
  `deposit_end_at` datetime DEFAULT NULL COMMENT '물품 예치 완료 시간',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`transfer_id`,`site_cd`),
  KEY `transfer_site_cd_fk` (`site_cd`),
  KEY `transfer_source_port_id_fk` (`source_port_id`),
  KEY `transfer_destination_port_id_fk` (`destination_port_id`),
  KEY `transfer_st_index` (`transfer_st`,`modify_at`) USING BTREE,
  CONSTRAINT `transfer_destination_port_id_fk` FOREIGN KEY (`destination_port_id`) REFERENCES `acs_port_master` (`port_id`),
  CONSTRAINT `transfer_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transfer_source_port_id_fk` FOREIGN KEY (`source_port_id`) REFERENCES `acs_port_master` (`port_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='transfer runtime 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_transfer_control`
--

LOCK TABLES `acs_transfer_control` WRITE;
/*!40000 ALTER TABLE `acs_transfer_control` DISABLE KEYS */;
INSERT INTO `acs_transfer_control` VALUES ('20250411074447407',NULL,'ROBOT_1',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 16:44:47',NULL,'2025-04-11 16:44:47',NULL,NULL),('20250411164308878',NULL,NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 16:43:08',NULL,'2025-04-11 16:43:08',NULL,NULL),('20250415093728769',NULL,NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-15 09:37:28',NULL,'2025-04-15 09:37:28',NULL,NULL),('20250415132235207',NULL,NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-15 13:22:35',NULL,'2025-04-15 13:22:35',NULL,NULL),('20250415132359426',NULL,NULL,'COMPLETE',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-15 13:23:59',NULL,'2025-04-15 13:23:59',NULL,NULL),('20250415132643210',NULL,NULL,'COMPLETE',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-15 13:26:43',NULL,'2025-04-15 13:26:43',NULL,NULL),('5','LOAD',NULL,'RUNNING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('6','LOAD',NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('7','LOAD',NULL,'UNLOADING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('8','LOAD',NULL,'RUNNING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('9','LOAD',NULL,'COMPLETE',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB1','LOAD',NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB17','LOAD',NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB2','LOAD',NULL,'RUNNING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB3','LOAD',NULL,'READY',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB4','LOAD',NULL,'UNLOADING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB5','LOAD',NULL,'RUNNING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL),('JOB6','LOAD',NULL,'LOADING',10,NULL,NULL,NULL,NULL,NULL,NULL,1,'HU',NULL,NULL,NULL,NULL,'2025-04-11 15:36:41',NULL,'2025-04-11 15:36:41',NULL,NULL);
/*!40000 ALTER TABLE `acs_transfer_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acs_transfer_control_hist`
--

DROP TABLE IF EXISTS `acs_transfer_control_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acs_transfer_control_hist` (
  `hist_id` bigint(20) NOT NULL COMMENT '일련 번호',
  `transfer_id` varchar(255) DEFAULT NULL COMMENT '작업 ID',
  `transfer_tp` varchar(255) DEFAULT NULL COMMENT '작업 타입',
  `assigned_robot_id` varchar(255) DEFAULT NULL COMMENT '작업 할당 로봇 ID',
  `transfer_st` varchar(255) DEFAULT NULL COMMENT '작업 상태',
  `priority_no` int(5) DEFAULT 10 COMMENT '작업 우선 순위',
  `source_port_id` varchar(255) DEFAULT NULL COMMENT '작업 대상 포트 명칭',
  `destination_port_id` varchar(255) DEFAULT NULL COMMENT '최종 목적지 예치 포트 명칭',
  `acquire_start_at` datetime DEFAULT NULL COMMENT '물품 수령 시작 시간',
  `acquire_end_at` datetime DEFAULT NULL COMMENT '물품 수령 완료 시간',
  `deposit_start_at` datetime DEFAULT NULL COMMENT '물품 예치 시작 시간',
  `deposit_end_at` datetime DEFAULT NULL COMMENT '물품 예치 완료 시간',
  `usable_fl` tinyint(1) NOT NULL DEFAULT 1 COMMENT '데이터 사용 가능 여부',
  `site_cd` varchar(50) NOT NULL COMMENT 'SITE 정보',
  `description_tx` varchar(255) DEFAULT NULL COMMENT '데이터에 대한 설명',
  `prev_activity_tx` varchar(50) DEFAULT NULL COMMENT '이전 활동 내용',
  `activity_tx` varchar(50) DEFAULT NULL COMMENT '현재 활동 내용',
  `creator_by` varchar(50) DEFAULT NULL COMMENT '데이터 생성자',
  `create_at` datetime DEFAULT current_timestamp() COMMENT '생성 시간',
  `modifier_by` varchar(50) DEFAULT NULL COMMENT '데이터 수정자',
  `modify_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '수정 시간',
  `trans_tx` varchar(255) DEFAULT NULL COMMENT '관련 트랜잭션 ID',
  `last_event_at` datetime DEFAULT NULL COMMENT '최근 이벤트 발생 시간',
  PRIMARY KEY (`hist_id`),
  KEY `transfer_hist_site_cd_fk` (`site_cd`),
  CONSTRAINT `transfer_hist_site_cd_fk` FOREIGN KEY (`site_cd`) REFERENCES `acs_site_master` (`site_cd`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='transfer runtime 변경 기록 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acs_transfer_control_hist`
--

LOCK TABLES `acs_transfer_control_hist` WRITE;
/*!40000 ALTER TABLE `acs_transfer_control_hist` DISABLE KEYS */;
/*!40000 ALTER TABLE `acs_transfer_control_hist` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping routines for database 'acs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 14:32:50
