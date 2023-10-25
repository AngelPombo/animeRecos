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
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (33,'ea64c80c-4197-44aa-9c31-a7d82e2c442b_memeallmight.jpg','2023-10-25 12:11:38',102),(35,'f60be62d-b80c-4bc0-b76c-3b57b093cc5c_jinxcosplay.webp','2023-10-25 12:13:15',65),(36,'42a98d6f-1ffe-47e0-9d6b-a4d67ea3977b_59180609b241ea4f95e62b08acff8219.jpg','2023-10-25 12:15:07',67),(37,'fc911fec-13bc-4b3c-b218-865898d58a9d_951387cbb77398a0516647e1db782aa4.jpg','2023-10-25 12:15:26',71),(38,'c4c02929-2c26-45a5-b0ab-3cca2fe1c542_49e067174444945.Y3JvcCw2NjksNTIzLDY0Miw0Njc.png','2023-10-25 12:15:40',72),(42,'82a8b38b-b1b4-416d-847c-e0c6c0045971_75jx81.jpg','2023-10-25 12:20:09',99),(43,'281678ca-6dfc-44bd-9012-ffa407f46741_6di0s32n28x71.jpg','2023-10-25 12:21:20',34),(45,'43ebd801-d721-4cef-990e-a76a807eda90_orochimaru_cosplay__1_by_zuanquan_da9xey9-fullview.jpg','2023-10-25 12:22:28',33),(46,'aec86cfb-45c6-4927-ba41-fd03d7b49870_8c120cd56b10c875511defd11fb88b1a.jpg','2023-10-25 12:23:01',32),(47,'ac881f2e-21d8-4de8-bf16-a9f17e783ddb_El1WUJJXUAAwZ0P.jfif','2023-10-25 12:27:47',30),(48,'0d50cb12-d606-4296-9c80-969a7ba8533f_dcc018fc1a0144ac3a9028c9f504dd97.jpg','2023-10-25 12:31:28',29),(49,'bdfd2954-303f-42bc-a766-a2467c361fe8_4f1a30a6a3a26d8be87d9a724ae572bc.jpg','2023-10-25 12:32:06',28),(50,'384cb3d7-9c71-48d2-a59d-780ffc29c097_d20.png','2023-10-25 12:34:03',26),(51,'018e9b24-9d2e-4d9e-9985-2c3fcb7dcbd0_1656473044.0987_Y3UVY8_n.jpg','2023-10-25 12:35:14',25),(55,'d615b03b-2d31-4781-b104-6a273fe1e72d_fotos_entretenimiento_12092013_memesdragonball_01.jpg','2023-10-25 12:38:33',101),(57,'746e8bfa-60d6-4f80-8894-3159950b208a_cosplay-aizawa-1584358305.jpg','2023-10-25 12:39:45',61),(58,'67b28ce6-d0bf-4daa-8b06-044e916ab7f6_1540496199108.jpg','2023-10-25 12:45:11',60),(59,'28b3f9f2-d7c3-4e54-a857-31dc571cb26e_leonchiro.webp','2023-10-25 12:45:27',59),(60,'8859a1b9-919a-4cc2-a8c2-11ab313bcedc_rBVaV10cPiWAX49pAAYFUnEzDVQ249.jpg','2023-10-25 12:45:42',58),(61,'06862f74-d72d-4d98-9d2f-da15c73562a8_il_fullxfull.4768431109_1m7j.avif','2023-10-25 12:46:51',57),(63,'4ebc28d8-8dda-41fb-ab4c-d13ba5f9ec0d_46d75a257b4780af44b3fb043af9d80d.jpg','2023-10-25 12:47:49',56),(64,'0e18b615-36ba-4bfe-b068-5395a0ffbd30_calle-para-siempre-v0-1azz823dwwy91.webp','2023-10-25 12:48:06',55),(67,'5bb43307-362b-4d4b-bbaf-35ad8cc293e6_ilrdwV0dLM-18HFYuIvwmThDqnHGfvf2xBMXek4mtA8.png','2023-10-25 12:49:52',54),(68,'6a3bca38-3265-4d93-b12c-4663e0707dd0_knucklesmeme.jpg','2023-10-25 12:50:33',35),(70,'fc003a56-564d-48c6-862e-fb1f8e996aa3_32549295._SY540_.jpg','2023-10-25 12:51:23',100),(73,'c5a23fce-937f-432d-bcb2-85e4aac270b6_bfeaed6bff8db6866563feebaa488700.jpg','2023-10-25 12:52:49',103),(74,'696e2730-a7e1-4d76-9fe9-7b8fb7d7d474_sailormoon1.jpg','2023-10-25 12:56:17',105),(75,'507514c5-4f65-4875-a3b4-71063fad4b49_sailormoon2.jpg','2023-10-25 12:56:18',105),(76,'9136739a-6bd2-426f-a09b-bfbdc86e1078_sailormoon3.jpg','2023-10-25 12:56:18',105),(77,'38b3c0e1-f603-44a8-91dd-72f61b100693_jujutsu-kaisen-shibuya-6506064167cfc.jpg','2023-10-25 13:00:35',94),(78,'619b8284-1588-4c3c-8990-3ae85cf5eb55_840_560.jpeg','2023-10-25 13:00:35',94),(79,'cb788679-b0e2-497c-80c2-62f5fea7c1bb_10-cosas-que-debes-saber-sobre-Death-Note-antes-de-que-se-estrene-la-pelicula.jpg','2023-10-25 13:02:03',21),(80,'63e78457-e8db-4dfe-8327-a5faf8204ac8_YKY6OLM6M5HQREHBXTSBLXMDRU.jpg','2023-10-25 13:02:03',21),(81,'fa56e97e-b683-4171-8528-73ca4c3ff841_L.jpg','2023-10-25 13:02:03',21),(82,'5892d576-a2aa-4b0f-b6de-370aec816f33_599723f2a6ff42f5e5ca0986ce66d2d7.jpg','2023-10-25 13:02:46',19),(83,'dbfe1ece-ab1c-4b7f-8318-1274fa26643f_mushishi.jpg','2023-10-25 13:03:25',19),(84,'0b63f7e7-4301-411b-aa1f-242ac32300db_Mushishi_Serie_de_TV-542643428-large.jpg','2023-10-25 13:03:25',19),(85,'73c9f003-aaf4-4862-9ba7-07af3aaa19c6_6e4dd558-5c67-465f-be02-abc5226900bb.jfif','2023-10-25 13:05:14',20),(87,'fea1713c-8d14-44bb-86cb-82fe67f59616_img60646ccef1c246.50941699.jpg','2023-10-25 13:05:33',20),(88,'857928f8-2f16-4f4e-af47-08116ce445b9_HD-wallpaper-mirai-nikki-yuno-mirai-yuno-anime-nikki.jpg','2023-10-25 13:06:43',24),(89,'57b16779-2e7b-4660-b894-845ef38f4c39_Mirai-Nikki-yandere-Yuno-Gasai.jpg','2023-10-25 13:06:43',24),(90,'e69b769b-3686-4c1b-a552-bc70d59aff6e_mirai-nikki-1000x600.jpg','2023-10-25 13:06:43',24),(91,'269a6460-97f5-49e1-a934-af9eff4cacf9_Chainsaw-Man-2-5e29efd-e1678805821841.jpeg','2023-10-25 13:09:00',95),(92,'756b4c57-82fa-4a03-ba3c-270c03179f13_5052cc19bebfdc4ce3c67a45c4140f19.jpg','2023-10-25 13:09:00',95),(93,'70b5c59b-066c-4534-8985-64b2753aae07_YeK1qkA.jpg','2023-10-25 13:09:00',95),(94,'cd20f168-7ec1-43e3-9d80-03c773acdf62_fullmetal-alchemist-theme-5.jpg','2023-10-25 13:10:49',89),(95,'d172a2ee-8de6-4c1b-8cee-613767e86cb7_thumb-1920-19537.jpg','2023-10-25 13:10:49',89),(96,'75929929-7a41-47d3-ad2c-b3301ff09649_4JL4Q4E7BJLM5MGVA4L5AQYEWU.avif','2023-10-25 13:12:13',91),(97,'a9bdbfee-76d3-4cfd-a20d-533ccd197715_artworks-58Y4CBrvLClgBjFn-Z68UrQ-t500x500.jpg','2023-10-25 13:12:13',91),(98,'0734fcb6-d189-4010-a2f0-47fa0a867af2_16668854930436.jpg','2023-10-25 13:12:13',91),(99,'da9d67be-a395-4c99-ba68-9c8253e39c86_00032-hassakuHentaiModel_v13_1522666583.png','2023-10-25 13:13:04',6),(100,'4a8ea592-8654-4dd0-9ea1-98de896eedf0_Manga-Cover-Claire-6-min.png','2023-10-25 13:13:04',6),(101,'738413d3-bfc9-4118-a98c-8e2eda60bc5c_11eyes_sdag_kukuri_cg7.jpg','2023-10-25 13:13:34',4),(102,'0b84c5b0-5609-4d04-99b7-adf5b3df93b4_97c6207482e17847c568c5b70fc049c1.jpg','2023-10-25 13:14:10',1),(103,'99807cc8-64bf-4241-82aa-cfa6d7c59823_MV5BNzViODgxNDEtNDhmNi00YTBmLTk4ZTctMzlhY2U0NTQ0ZDMxXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_.jpg','2023-10-25 13:14:10',1),(104,'156f981d-b84c-42a0-99bc-bd1b3f5a117f_returners-magic-char-pv.jpg','2023-10-25 13:15:06',8),(105,'2d0cb4a2-d789-45f7-9231-9f4b8f8061c2_a-returners-magic-should-be-special-30886.jpg','2023-10-25 13:15:06',8),(107,'5905a357-60cb-4f35-893f-8ce327a399a1_18-facts-about-spike-spiegel-cowboy-bebop-1693698279.jpg','2023-10-25 13:16:33',98),(108,'9a0fff18-9fde-43b6-9aee-9ef080408442_Spike-Spiegel.jpg','2023-10-25 13:16:33',98),(109,'146598cd-317b-4f6e-bf42-da2c50b98233_55306ec6b24b9854a44e695a7f44fda36e8edb238c23318e0e45ea041b60e516.jpg','2023-10-25 13:17:29',93),(110,'c300b97e-5c1e-4607-bafe-fdcfed206089_1366_2000.jpeg','2023-10-25 13:17:29',93),(111,'94fbe70d-ea97-4e5e-87df-e4f4c6702805_xassassination-classroom-blu-ray-edicion-coleccionistas-a4.jpg.pagespeed.ic.dogdITjPtc.jfif','2023-10-25 13:18:23',16),(112,'caf2bf94-2b87-40cd-95da-44e5bdb69f16_77a83265202aa1951343e0015b8ac172471e622dd974d5f2c41763d8f4d45e42.png','2023-10-25 13:18:23',16),(113,'c668ad8b-b821-48a1-a41e-29f305e16dab_unnamed.png','2023-10-25 13:19:14',17),(114,'f6c70c70-56d9-421f-a5e0-93578f4b40fa_840_560 (1).jpeg','2023-10-25 13:19:14',17),(115,'09e0fefb-54fe-4457-98de-6731ce63dbd8_WJMURIY3SZCFJPWQM6JYI7XWEA.jpg','2023-10-25 13:19:14',17),(116,'a1a60029-d7e0-4b9b-9c44-3ae4f47ffb8e_1330846.png','2023-10-25 13:19:57',13),(117,'73d12198-ffa1-4134-a128-bf717738c41c_nezuko-kimetsu-no-yaiba.1687294888.0615.jpg','2023-10-25 13:19:57',13),(118,'7275bd7e-7327-4040-a612-7d270b4f048d_SUO6HJ7M7RG4VPOFJ5WWWNSVVE.jfif','2023-10-25 13:21:22',10),(119,'4403424e-7df0-445a-9586-9c120fe116b7_eren-forma-titan.jpg','2023-10-25 13:21:22',10),(120,'1a00d9af-fb01-4a0b-ae22-3adcb59db02f_thumb-1920-1328670.jpeg','2023-10-25 13:21:22',10);
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

-- Dump completed on 2023-10-25 13:31:31
