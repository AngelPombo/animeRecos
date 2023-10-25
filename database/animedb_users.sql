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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pwd` varchar(512) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `biography` varchar(3000) DEFAULT NULL,
  `link_twitter` varchar(200) DEFAULT NULL,
  `link_youtube` varchar(200) DEFAULT NULL,
  `link_insta` varchar(200) DEFAULT NULL,
  `link_ttv` varchar(200) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active_user` tinyint(1) DEFAULT '0',
  `user_role` enum('admin','user') NOT NULL DEFAULT 'user',
  `user_badge` enum('Genin','Chūnin','Jōnin','ANBU','Sannin','Kage') NOT NULL DEFAULT 'Genin',
  `reg_code` char(36) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `last_auth_update` datetime DEFAULT NULL,
  `recover_code` char(36) DEFAULT NULL,
  `banned` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Grelito','angelpombo.92@gmail.com','5c8f0da6c28368a3eedb9d27b22a26463b0ab2db4471a4ab2b84c77e366fd723ffc208bb775014d882c1f2c51a24066399d50e749bbd5163f7f54376248e6073','eb4a3b09-652e-4ba1-ab17-a4b73d982855_d4uhk72-2e39edd4-8e55-46d9-8616-58a737de5e12.jpg','Forte coma un carballo duro como a pedra tu voluntad mis manos imagina si tuviera un arma de verdad te encantaria saber de donde saco todo este ingenio pues bien te lo voy a comentar es mi intelecto no puede detenerse mucha gente intenta pararlo pero no se puede es como escribir este texto sin poner ninguna coma es la locomotora que funciona sin carbón chucuchu no para no para sigues caminando y no paras de ver vagones pero donde termina este tren? es la pregunta sin responder que existe en el universo planteada desde siempre un debate que existe en tu subconsciente sin que te llegues ni a percatar que locura si quieres saber más acerca de esto no intentes consultarlo porque no encontrarás información vives en la matrix, es como FOK, PUTO MILEURISTA PANZA PANZA deja de leer y ponte a hacer burpees','https://linkdetwitter.es','https://www.youtube.com/watch?v=0hwDNGOReiU&list=RD0hwDNGOReiU&start_radio=1&ab_channel=COLORS','chegouoanxoomellordomundo','www.twitch.tv/grelito','2023-09-06 21:04:02',1,'user','Kage',NULL,0,'2023-09-15 12:57:11','0efa2904-55ed-4d2e-96c9-35b1c35153e8',0),(2,'luis','lacibeira@gmail.com','b541e112b34725049d5ac687a1249205901170be432fde2b8edf5a26ba5df09bfcd0448bd5566fba45b65d25da5060a818c88d1a9355437f57e51551ad83d158','8d8c5fcc-255e-4dcd-b6f3-7e6a681c624e_5a73dd56f3a98a015da640f4cf7e0965aea10a5ar1-500-488v2_00.jpg','Esta es la primera biografía de la animeRecos ',NULL,NULL,NULL,NULL,'2023-09-06 21:05:26',1,'user','Kage',NULL,0,NULL,NULL,0),(3,'eysharis','eyshariscode@outlook.es','1a38bfa8032bdeb66ec63341b17fcf73944a635bf04a902bb49cabca560c9379b2f7953a806f64fc4afd03bc17729fe68b94862336f817ca57ae8826be9d0b59','74008d76-4ec4-4170-b9ab-d18248bac245_avatarantia.jpg','uwu','https://quepesada.es','','','','2023-09-06 21:07:10',1,'user','Sannin',NULL,0,NULL,NULL,0),(4,'Martin','angelpombocode@gmail.com','af17de79203a1d60d561ad0a255b19e09dcfcde8c10c6637b8e112ffaf073e580441293d2a5272dc3ab83f9bfab37b0505226fca19af99258602f2ab77fb4652','5dc85d23-fc16-400c-9637-e1782c7909d8_11033.jpg','ME ENCANTA STREET FIGHTER ALV','','','','','2023-10-05 12:20:55',1,'user','ANBU',NULL,0,NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 13:31:31
