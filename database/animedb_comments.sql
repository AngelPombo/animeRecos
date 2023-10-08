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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(5000) NOT NULL,
  `banned` tinyint(1) DEFAULT '0',
  `edited` tinyint(1) DEFAULT '0',
  `user_id` int unsigned NOT NULL,
  `entry_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'2023-10-05 12:23:13','Gran anime pero el doblaje latino es mejor',0,0,4,50),(2,'2023-10-05 12:27:05','TEMBO TEMBO!',0,0,4,48),(3,'2023-10-05 12:27:35','Nunca lo había pensado, me encantó el anime!',0,0,4,24),(4,'2023-10-05 12:27:51','El Knuckles de Uganda soy yo literal',0,0,4,35),(5,'2023-10-05 12:28:01','Plus Ultra!',0,0,4,29),(6,'2023-10-05 12:28:21','Family Goals!',0,0,4,32),(7,'2023-10-05 12:28:51','No estoy muy convencido de que la pajarería de Transilvania sea un anime amigo',0,0,4,40),(8,'2023-10-05 12:29:24','Estás como una cabra, pero gran pérdida la de Asuma, junto con Jiraiya, top3 momentos tristes de Naruto',0,0,4,39),(9,'2023-10-05 12:29:42','Excelente recomendación, tengo que verlo!',0,0,4,23),(10,'2023-10-05 12:29:59','Mi anime favorito, totalmente de acuerdo con la puntuación!',0,0,4,21),(11,'2023-10-05 12:30:13','Una pena que no llegara a terminar :(',0,0,4,20),(12,'2023-10-05 12:30:36','Nunca pensé que me fuera a gustar tanto un anime de deporte, es genial!',0,0,4,17),(13,'2023-10-05 12:30:56','Koro-sensei te queremos! Final super emotivo 100% recomendado!',0,0,4,16),(14,'2023-10-05 12:41:57','Buenísima, pedazo artista!',0,0,4,30),(15,'2023-10-05 12:42:07','Como le gustaba la tarta al jodío!',0,0,4,28),(16,'2023-10-05 12:43:08','No me perdería ni una clase de Filosofía!',0,0,3,56),(17,'2023-10-05 12:43:19','Que cuteee',0,0,3,30),(18,'2023-10-05 12:43:37','Este Todoroki deja mucho que desear! XD',0,0,3,61),(19,'2023-10-05 12:43:52','No eres tu ni de broma!',0,0,3,59),(20,'2023-10-05 12:44:09','Full crowl! Me encanta Boku no Hero',0,0,3,29),(21,'2023-10-05 12:45:31','Pero esta entrada que es?',0,0,3,40),(22,'2023-10-05 12:45:46','Lo mató el tabaco sin duda',0,0,3,39),(23,'2023-10-05 12:50:43','Uno de mis animes favoritos de siempre, que gran canción ♥',0,0,3,52),(24,'2023-10-05 12:51:07','Increíble jajajaja',0,0,3,54),(26,'2023-10-05 13:05:30','Shiniiiiiiiiiiiiiiiiiiiiiiiiichi',0,0,4,69),(27,'2023-10-05 13:05:57','Gran teoría, ¿Quién no disfruta de un poquito de bebercio con los carnales?',0,0,4,74),(28,'2023-10-05 13:06:33','Interesante teoría, aunque me quedo con la del sake!',0,0,4,75),(29,'2023-10-05 13:06:57','Grandes aportes sobre teorías eysharis, me mantengo a la espera de más contenido!',0,0,4,76),(30,'2023-10-05 13:07:11','¿Qué anime es?',0,0,4,67),(31,'2023-10-05 13:07:24','Mitad frío mitad caliente',0,0,4,73),(32,'2023-10-05 13:07:38','Poco duraría tan chiquito en un mundo de titanes XD',0,0,4,72),(33,'2023-10-05 13:08:18','Genial cosplay, yo no juego lol pero si alguien juega street fighter que me agregue!',0,0,4,65),(34,'2023-10-05 13:24:08','Increíble, tenemos más pruebas de esto? :O',0,0,3,77),(35,'2023-10-05 13:26:25','Mi waifu!',0,0,4,71),(36,'2023-10-05 13:28:29','Dios! Sería increíble!',0,0,2,77),(37,'2023-10-05 13:29:01','Genial teoría, lo importante nunca es la meta siempre es el viaje!',0,0,2,74),(38,'2023-10-05 13:31:22','Genial cosplay, PD: Yo llevo un montón sin jugar al lol y menos mal, saca lo peor de cada uno! jajajaja',0,0,2,65),(39,'2023-10-05 13:31:52','Dios mío no reconozco ni a la mitad! jaja',0,0,2,61),(40,'2023-10-05 13:32:07','Muy buena recomendación!',0,0,2,24),(41,'2023-10-05 13:32:18','Un verdadero 10!',0,0,2,21),(42,'2023-10-05 13:32:32','Está en mi lista de pendientes!',0,0,2,23),(43,'2023-10-05 13:32:46','Pinta muy interesante me lo apunto',0,0,2,19),(44,'2023-10-05 13:35:31','Me flipa el anime, un concepto genial',0,0,1,83),(45,'2023-10-05 13:36:30','Vegetta es el mejor!',0,0,1,84),(46,'2023-10-05 13:37:15','Me quedo loco',0,0,1,77),(47,'2023-10-05 13:37:36','A ver quien es el bonito que se salta la clase de religión!',0,0,1,56),(48,'2023-10-05 13:37:56','Me flipa, tengo hasta un tatuaje del número 12!',0,0,1,24),(51,'2023-10-05 13:38:57','Deberías ver la teoría que he publicado sobre Todoroki os va a explotar la cabeza',0,0,1,73),(52,'2023-10-05 13:39:43','No me lo puedo creer',0,0,1,81),(53,'2023-10-05 13:39:57','Si esto es cierto me rapo',0,0,1,85),(54,'2023-10-05 13:40:33','Vaya caboulo parece un llavero jajaja',0,0,1,72),(55,'2023-10-05 13:55:51','Este me lo vi, es increíble 100% recomendado!',0,0,4,89),(56,'2023-10-05 13:56:04','Ya hay otro post recomendándolo!',0,0,4,90),(57,'2023-10-05 13:56:13','Pero genial anime!',0,0,4,90),(58,'2023-10-05 13:56:26','En mi lista de pendientes! increíble pinta',0,0,4,91),(59,'2023-10-05 13:56:38','Me encantó!',0,0,4,94),(60,'2023-10-05 13:56:48','De los mejores actuales en mi opinión!',0,0,4,95),(61,'2023-10-05 13:57:29','Buenísimo',0,0,3,89),(62,'2023-10-05 13:57:40','De mis favs! pero ya hay otro post recomendándolo!',0,0,3,90),(63,'2023-10-05 13:57:49','Genial historia!',0,0,3,91),(64,'2023-10-05 13:58:01','No lo terminé todavía, pero lo que llevo visto es genial',0,0,3,92),(65,'2023-10-05 13:58:10','No lo conozco! apuntado',0,0,3,93),(66,'2023-10-05 13:58:22','Lo tengo pendiente me lo han recomendado mil veces!',0,0,3,95),(67,'2023-10-05 13:58:36','No lo conocía, para la lista de pendientes que va!',0,0,3,96),(68,'2023-10-05 14:00:03','Espectacular',0,0,2,89),(69,'2023-10-05 14:00:16','Me flipa',0,0,2,91),(70,'2023-10-05 14:00:32','A ver si lo terminan de una vez!',0,0,2,92),(71,'2023-10-05 14:00:41','Muy bueno',0,0,2,94),(72,'2023-10-05 14:00:56','100% recomendable',0,0,2,95),(73,'2023-10-05 14:01:24','No me gustan mucho los animes de deportes, pero los hay que sorprenden quizás le de una oportunidad',0,0,2,96),(74,'2023-10-05 14:01:43','Me encantó',0,0,2,97),(75,'2023-10-05 14:04:45','Buenísimo jajaja grande jojos',0,0,1,99),(76,'2023-10-05 14:34:27','Más fuerte que el vinagre o más acabado que el tifus',0,0,1,102),(77,'2023-10-05 14:35:03','Dentro de nada estamos en 2071 y todavía no se puede viajar por el sistema solar jajaja Pero gran anime',0,0,1,98),(78,'2023-10-05 14:35:21','Donde te sentaste Itachi',0,0,4,103),(79,'2023-10-05 14:36:57','Fire in the hole! ',0,0,2,103),(80,'2023-10-05 16:41:20','Me flipó este anime y las películas son geniales!',0,0,4,104),(81,'2023-10-05 16:41:42','¡VAMOS IPPO! ¡DEMPSEY ROOOOOOOOOOOOOOOOOOOOOOOOOOOOLL!',0,0,1,104),(82,'2023-10-05 16:44:24','Como dijo antes de morir \"Lo siento, Sasuke, ésta es la última vez\".',0,0,1,103),(83,'2023-10-06 16:46:42','Orejitas furras',0,0,1,73),(84,'2023-10-08 20:09:26','Es un animazo!!!! no admito discusiones al respecto ¬¬',0,0,2,98);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
