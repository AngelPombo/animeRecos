-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: animedb
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
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(1000) DEFAULT NULL,
  `photo_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'e95ad5ed-9f06-4ee1-8a7b-9bc62ed37ab7_maxresdefault.jpg','2023-09-07 17:55:51',25),(2,'63cf1493-9e78-41cd-b4bd-9648b632782d_damndaniel1.webp','2023-09-11 09:31:42',26),(3,'8730caf1-25c5-47f1-ab4b-caccc526e9d1_cbe8a0438e87263bdbf6575f098a23f67c4d0193_00.jpg','2023-09-11 09:33:35',27),(4,'5fb76aee-99fd-4941-81a2-e728c5169838_L.jpg','2023-09-11 10:56:07',28),(5,'f4c0f24a-68a0-4b7f-80d6-8d24195c6356_deku.jpg','2023-09-11 10:57:10',29),(6,'208e8f97-7a0b-443c-99db-470df52c8995_zero2chiquita.jpg','2023-09-11 10:58:32',30),(7,'071f67cf-43b9-498f-8c7d-fb7d26f1bcb6_Skei-como-Shoto-Todoroki-por-Mono-Photography-ID.jpg','2023-09-11 11:52:31',31),(8,'af02d8f6-4dcc-4245-87e8-d8e5af2c6ce6_28584269726_e6635dfe70_b.jpg','2023-09-11 11:53:33',32),(9,'bff87030-aa15-4c4c-a14b-29d66f8c0814_Orochimaru-Cosplay-2.webp','2023-09-11 11:54:19',33),(10,'9945eb25-bcef-486d-b2d8-ac5365015c39_inuyasha.webp','2023-09-11 12:03:11',34),(11,'f9b84907-da82-4fcd-9c71-ca35c16ca391_knucklesmeme.jpg','2023-09-12 09:50:48',35),(14,'8ffd3b44-9527-4aff-96ee-4d9f02d3b5f8_ilrdwV0dLM-18HFYuIvwmThDqnHGfvf2xBMXek4mtA8.png','2023-10-05 12:32:26',54),(15,'de1ecc48-5d12-41fe-8e58-b00c1e1d1c2c_calle-para-siempre-v0-1azz823dwwy91.webp','2023-10-05 12:34:33',55),(16,'288f6a64-1453-48d6-b729-d0074e944c42_46d75a257b4780af44b3fb043af9d80d.jpg','2023-10-05 12:35:46',56),(17,'c2642402-e0df-4a48-a546-4e3395f238a1_il_570xN.4768431109_1m7j.avif','2023-10-05 12:36:44',57),(18,'f1ef5d3d-80a8-45c4-94fb-1c4f438ccd12_rBVaV10cPiWAX49pAAYFUnEzDVQ249.jpg','2023-10-05 12:37:38',58),(19,'aeaa61e3-013a-4a7c-a272-d8e2dd7f833a_leonchiro.webp','2023-10-05 12:38:35',59),(20,'2687cf6c-b99b-4fd7-9a61-f587c0a7e771_1540496199108.jpg','2023-10-05 12:39:35',60),(21,'71f5dc1c-92e9-4892-845e-2964405c69f7_2a85e174472cdc145124d3096dddb531.jpg','2023-10-05 12:40:50',61),(22,'e6947729-7018-480b-ac2a-108f3fe85d9f_images.jfif','2023-10-05 12:48:21',65),(23,'640f9be4-050e-4725-992e-853ca8bce5c2_59180609b241ea4f95e62b08acff8219.jpg','2023-10-05 12:50:12',67),(24,'16cda994-85cf-4891-9e2e-97ec4e57b4f9_951387cbb77398a0516647e1db782aa4.jpg','2023-10-05 12:59:25',71),(25,'7f46e626-fa6f-45d6-8b04-38eeaca72cfe_49e067174444945.Y3JvcCw2NjksNTIzLDY0Miw0Njc.png','2023-10-05 13:00:28',72),(26,'7158cf89-71df-4d49-b25f-140e8c13d764_static-assets-upload10817571666599455496.webp','2023-10-05 13:01:38',73),(27,'942aebf0-3c01-4469-927f-8ff85094f14f_75jx81.jpg','2023-10-05 14:03:05',99),(28,'2b112ed9-9a1a-4e3a-b148-292bf97da6a6_32549295._SY540_.jpg','2023-10-05 14:04:20',100),(29,'896fe17a-e988-48c7-acd6-b99e484cbec5_5-best-memes-based-on-anime.jpg','2023-10-05 14:06:36',101),(30,'fb218b1e-985a-49c1-8c2a-5391949b46e1_meme1.webp','2023-10-05 14:08:22',102),(31,'fa255278-99c0-4a13-b93f-b96c9b1b17be_6j6bmvuwkxx41.jpg','2023-10-05 14:33:44',103),(40,'7c1f17b9-c06b-4bc5-a026-bc419a251a27_elfenLied11.jpg','2023-10-08 19:26:16',23),(41,'f2a2d053-cdaf-4e5c-bec3-48af81c5b407_elfenlied22.jpg','2023-10-08 19:26:16',23),(42,'eee5e019-b2ec-4747-b030-087ca8147000_elfenlied33.jpg','2023-10-08 19:26:16',23),(43,'67d640b7-27dc-4162-921a-83f7075697b0_jujutsukaisen1.jpeg','2023-10-08 19:31:05',94),(44,'8858975e-76e5-4335-bbb9-e022495d5a0d_jujutsekaisen2.jpeg','2023-10-08 19:31:05',94),(45,'bfccf9a0-80c1-48e7-94e6-449d9660c7df_jujutsukaisen3.jpeg','2023-10-08 19:31:05',94),(46,'32cf3426-a332-4abb-87c3-a61f91eef143_aoashi1.webp','2023-10-08 19:38:56',96),(47,'fd62d917-c5c5-4dc9-b6fa-f23ce362f036_aoashi2.jpg','2023-10-08 19:38:56',96),(48,'a188d5af-ca37-4e64-8803-b9c17f987519_aoashi3.jpg','2023-10-08 19:38:56',96),(49,'98ff0ce8-aa68-472c-8ac4-217ce60bb672_sailormoon1.jpg','2023-10-08 19:43:19',105),(50,'35c2cd51-8308-43b8-87d3-f41cce8830d1_sailormoon2.jpg','2023-10-08 19:43:19',105),(51,'04a7631f-2549-4943-b341-5d79db1d1ac8_sailormoon3.jpg','2023-10-08 19:43:19',105),(52,'dbf5443a-f689-4e1a-90fe-6b3cfed1d2a6_yumeko2.jpg','2023-10-08 20:06:54',71),(53,'441e6bea-6eaf-4ed6-9b85-cd01074d4fe8_yumeko1.png','2023-10-08 20:06:54',71),(54,'f0159384-bf6e-4422-a2c9-32ee9ae2c66c_cow3.jpg','2023-10-08 20:08:49',98),(55,'befc82ed-3e43-444e-a1b3-e4ba6bfe9f3e_cow2.webp','2023-10-08 20:08:49',98),(56,'b159b213-d756-4813-ae33-087d05ccdc55_cow1.jpg','2023-10-08 20:08:49',98);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-08 20:21:47
