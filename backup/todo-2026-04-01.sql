-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: lawyerai
-- ------------------------------------------------------
-- Server version	8.0.44

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

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3f642818-ce08-4fcb-921a-b939cef92276','4b0568a178bf80af7d5bb79469e8ea3208df413a5f05928d17114d928cc3a3a0','2026-04-01 08:22:50.957','20260401082250_add_blog_post_liked_reason',NULL,NULL,'2026-04-01 08:22:50.870',1),('70b6485b-6a5d-4916-91ff-a8fe53a43d75','4389b2da4436d60ba86b9d02f1eb7f9101197b73b3c76cf421b496d6cec18754','2026-04-01 08:44:34.307','20260401084434_update_verify_table',NULL,NULL,'2026-04-01 08:44:34.193',1),('892707d5-7ee8-4550-9330-e8999e4244d4','9b0f0a9639837cff33280ee7698a9bdd6a56d1ddd5fc6c2ea2800e5d97b254a1','2026-04-01 13:18:12.853','20260401193000_remove_admin_reputation_reasons',NULL,NULL,'2026-04-01 13:18:12.692',1),('8c7742c8-8a7d-4c36-bac6-87b3ab78700f','484c6c376e24ff6d0eb3e43cb6d65976e2e0f352987d2dcb468a805e357583f7','2026-03-28 15:05:32.311','20260328150531_auth_sessions_and_identities',NULL,NULL,'2026-03-28 15:05:31.817',1),('9c7b7a8d-1f3a-4551-a188-7754adfdb756','5d3bca5d4435b671fa5d15b8eb828fa7e877db38f74ce88702e15d61e1fff943','2026-04-01 13:18:29.767','20260401131829_add_queue_table',NULL,NULL,'2026-04-01 13:18:29.734',1),('a250438c-4e02-4e06-ad44-f6364569a636','8442fe910d01e9f1a4f6312f9c7e4d8a6ccbf9ba04cc6eb0338bb2ddfde3cb45','2026-03-28 14:44:21.536','20260328144417_init_database',NULL,NULL,'2026-03-28 14:44:17.937',1),('a2a5f2f3-b41f-4380-b66e-b46a3979c7e7','54c04b8333e6d11c40e0ba983acdff3cdfc9b22cec2f316794d641ca6cbcda30','2026-04-01 11:39:02.601','20260401113902_remove_report_feature',NULL,NULL,'2026-04-01 11:39:02.514',1),('adc7465e-0cb4-4ae9-8b9b-94f1fe8f7fef','3af8bd3fa28ddb23996803072e8a76745684da14b97f4f8d74a9ef5a36b08df2','2026-04-01 13:18:12.980','20260401203000_remove_legal_sources_feature',NULL,NULL,'2026-04-01 13:18:12.857',1),('c72ee6e3-af57-4c19-8c62-452685d7fbf9','00414405a0b9bdb3874d584bab639160fff5885a3543772cb5293526a25ec27e','2026-03-31 10:31:07.159','20260331103106_add_chat_table',NULL,NULL,'2026-03-31 10:31:07.030',1),('db3428e6-46b5-4f06-9231-e056c8b61047','fc08e8764ce787b614965ff905dc97e8dd525b0be55123e7ff2ca5c2dc279a39','2026-03-30 15:12:34.732','20260330151234_add_pipeline_configs_and_crawl_logs',NULL,NULL,'2026-03-30 15:12:34.419',1),('f31d7633-0f74-4ae2-bc3d-779e1865a094','016be662d9f0d055edcf5ec7cad5419bd6af1b244f8b673fd5c6bd579f81716d','2026-03-29 07:50:04.611','20260329120000_blog_thumbnail_comments_engagement',NULL,NULL,'2026-03-29 07:50:04.197',1),('f38c5116-f319-45ed-8264-2b409840de28','2869d87b693db644e22bce5cd975d8ced765f4e3d06bd226669447e1845e5a2c','2026-03-29 08:34:18.233','20260329120001_comment_likes_and_ledger_blog_comment',NULL,NULL,'2026-03-29 08:34:17.792',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistant_conversations`
--

DROP TABLE IF EXISTS `assistant_conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistant_conversations` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assistant_conversations_user_id_created_at_idx` (`user_id`,`created_at`),
  CONSTRAINT `assistant_conversations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistant_conversations`
--

LOCK TABLES `assistant_conversations` WRITE;
/*!40000 ALTER TABLE `assistant_conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistant_conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistant_message_ratings`
--

DROP TABLE IF EXISTS `assistant_message_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistant_message_ratings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` enum('UP','DOWN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `assistant_message_ratings_message_id_user_id_key` (`message_id`,`user_id`),
  KEY `assistant_message_ratings_user_id_idx` (`user_id`),
  CONSTRAINT `assistant_message_ratings_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `assistant_messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assistant_message_ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistant_message_ratings`
--

LOCK TABLES `assistant_message_ratings` WRITE;
/*!40000 ALTER TABLE `assistant_message_ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistant_message_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistant_messages`
--

DROP TABLE IF EXISTS `assistant_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistant_messages` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversation_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ASSISTANT','SYSTEM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `metadata_json` json DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assistant_messages_conversation_id_idx` (`conversation_id`),
  CONSTRAINT `assistant_messages_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `assistant_conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistant_messages`
--

LOCK TABLES `assistant_messages` WRITE;
/*!40000 ALTER TABLE `assistant_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistant_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_comment_likes`
--

DROP TABLE IF EXISTS `blog_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_comment_likes` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_comment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`,`blog_comment_id`),
  KEY `blog_comment_likes_blog_comment_id_idx` (`blog_comment_id`),
  CONSTRAINT `blog_comment_likes_blog_comment_id_fkey` FOREIGN KEY (`blog_comment_id`) REFERENCES `blog_comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_comment_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_comment_likes`
--

LOCK TABLES `blog_comment_likes` WRITE;
/*!40000 ALTER TABLE `blog_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_comments`
--

DROP TABLE IF EXISTS `blog_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_comments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_comments_blog_post_id_parent_id_idx` (`blog_post_id`,`parent_id`),
  KEY `blog_comments_author_id_idx` (`author_id`),
  KEY `blog_comments_parent_id_fkey` (`parent_id`),
  CONSTRAINT `blog_comments_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_comments_blog_post_id_fkey` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_comments_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `blog_comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_comments`
--

LOCK TABLES `blog_comments` WRITE;
/*!40000 ALTER TABLE `blog_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_post_likes`
--

DROP TABLE IF EXISTS `blog_post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_post_likes` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`,`blog_post_id`),
  KEY `blog_post_likes_blog_post_id_idx` (`blog_post_id`),
  CONSTRAINT `blog_post_likes_blog_post_id_fkey` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_post_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post_likes`
--

LOCK TABLES `blog_post_likes` WRITE;
/*!40000 ALTER TABLE `blog_post_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_post_tags`
--

DROP TABLE IF EXISTS `blog_post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_post_tags` (
  `blog_post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`blog_post_id`,`tag_id`),
  KEY `blog_post_tags_tag_id_idx` (`tag_id`),
  CONSTRAINT `blog_post_tags_blog_post_id_fkey` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_post_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post_tags`
--

LOCK TABLES `blog_post_tags` WRITE;
/*!40000 ALTER TABLE `blog_post_tags` DISABLE KEYS */;
INSERT INTO `blog_post_tags` VALUES ('cmng4jm4f0009c0efz0d3weea','cmnfqst9u0000y0ef6pr19goh');
/*!40000 ALTER TABLE `blog_post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('DRAFT','PUBLISHED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `verified_at` datetime(3) DEFAULT NULL,
  `verified_by_user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_notes` text COLLATE utf8mb4_unicode_ci,
  `legal_corpus_version` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `thumbnail_url` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_key` (`slug`),
  KEY `blog_posts_slug_idx` (`slug`),
  KEY `blog_posts_is_verified_status_updated_at_idx` (`is_verified`,`status`,`updated_at`),
  KEY `blog_posts_author_id_idx` (`author_id`),
  KEY `blog_posts_verified_by_user_id_fkey` (`verified_by_user_id`),
  CONSTRAINT `blog_posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `blog_posts_verified_by_user_id_fkey` FOREIGN KEY (`verified_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES ('cmng4jm4f0009c0efz0d3weea','cmng3liu00003c0eftdub3lwv','asd','asd','asdasd','<img src=\"http://localhost:8000/upload/1775052694748-f98de0be9eea0f62.jpg\" alt=\"z7675420201100_586f56601428ee1172c4c211f6d347ce\" title=\"z7675420201100_586f56601428ee1172c4c211f6d347ce\" wrapperstyle=\"display: flex\"><p></p>','PUBLISHED',0,NULL,NULL,NULL,NULL,'2026-04-01 14:11:36.255','2026-04-01 14:11:36.255',NULL,NULL);
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','assistant','system') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `chat_messages_session_id_fkey` (`session_id`),
  CONSTRAINT `chat_messages_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES ('013c0a56-f235-424d-965a-1bb6f8c3d2e9','846a123b-4127-443c-8d4c-96bcce51d4ca','user','bạn là AI gì',NULL,'2026-04-01 13:02:44.017'),('01bb7159-d1f4-4cfe-8320-8bb98b214155','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','điều 1 trong luật hình sự',NULL,'2026-04-01 03:00:51.685'),('041bd725-7544-4098-934c-458430593259','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','xin chào',NULL,'2026-04-01 03:00:33.647'),('066408fd-17e1-46f8-a1e6-5a895b2423e9','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','điều 3',NULL,'2026-04-01 03:13:02.363'),('456ece03-7d01-4b51-9f2c-e03e1b69523b','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Với vai trò luật sư tư vấn, tôi sẵn lòng hỗ trợ giải đáp các thắc mắc pháp luật của bạn một cách rõ ràng và chính xác. Mời bạn đặt câu hỏi.',NULL,'2026-04-01 03:00:39.358'),('59350b41-6a34-4a38-aec4-777926b45a98','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Vui lòng cho biết vấn đề pháp lý bạn cần được tư vấn để tôi có thể hỗ trợ bạn một cách tốt nhất.',NULL,'2026-04-01 13:02:23.054'),('67d479f8-4b75-4d2b-af2c-105663d863f6','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Tôi là một trợ lý trí tuệ nhân tạo (AI), được thiết kế và đào tạo để cung cấp thông tin và tư vấn pháp luật một cách chuyên nghiệp, rõ ràng và chính xác. Vai trò của tôi là giúp bạn hiểu rõ hơn về các quy định pháp luật dựa trên những dữ liệu pháp luật được cung cấp.',NULL,'2026-04-01 13:02:50.132'),('7d43c6c8-01a5-4a12-82d7-dbf8cb4ec4b2','846a123b-4127-443c-8d4c-96bcce51d4ca','user','hello',NULL,'2026-04-01 13:02:17.679'),('7fd96469-9568-4974-9336-a59e2ed7cdd8','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','Điều 2',NULL,'2026-04-01 03:12:48.115'),('95f6cf43-9f44-4ea9-8680-a1204f6a613e','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 3 của Luật Tố tụng hành chính 2015 giải thích các thuật ngữ quan trọng được sử dụng trong Luật, cụ thể như sau:\n\n*   **Quyết định hành chính:** Là văn bản do cơ quan nhà nước hoặc người có thẩm quyền ban hành, quyết định một vấn đề cụ thể trong quản lý nhà nước và chỉ áp dụng một lần cho một hoặc một số đối tượng cụ thể.\n*   **Quyết định hành chính bị kiện:** Là quyết định hành chính nêu trên mà nội dung của nó làm phát sinh, thay đổi, hạn chế, chấm dứt quyền, lợi ích hợp pháp của cơ quan, tổ chức, cá nhân hoặc tạo ra nghĩa vụ, ảnh hưởng đến quyền, lợi ích của họ.\n*   **Hành vi hành chính:** Là hành động hoặc việc không hành động của cơ quan nhà nước, người có thẩm quyền trong cơ quan nhà nước hoặc cơ quan, tổ chức được giao quản lý hành chính, khi thực hiện nhiệm vụ, công vụ theo quy định pháp luật.\n*   **Hành vi hành chính bị kiện:** Là hành vi hành chính nêu trên mà hành vi đó làm ảnh hưởng đến việc thực hiện quyền, lợi ích hợp pháp của cơ quan, tổ chức, cá nhân.\n*   **Quyết định kỷ luật buộc thôi việc:** Là văn bản do người đứng đầu cơ quan, tổ chức ban hành để áp dụng hình thức kỷ luật buộc công chức thuộc quyền quản lý của mình phải nghỉ việc.\n*   **Quyết định hành chính, hành vi hành chính mang tính nội bộ:** Là những quyết định, hành vi chỉ đạo, điều hành công việc nội bộ của cơ quan, tổ chức, ví dụ như triển khai kế hoạch, quản lý cán bộ, tài chính, tài sản, kiểm tra, thanh tra việc thực hiện nhiệm vụ của cán bộ, công chức thuộc quyền.\n*   **Đương sự:** Gồm có người khởi kiện (người nộp đơn kiện), người bị kiện (người bị kiện ra Tòa) và người có quyền lợi, nghĩa vụ liên quan.\n*   **Người khởi kiện:** Là cơ quan, tổ chức, cá nhân nộp đơn khởi kiện vụ án hành chính đối với các đối tượng bị kiện như quyết định hành chính, hành vi hành chính, quyết định kỷ luật buộc thôi việc, quyết định giải quyết khiếu nại về xử lý vụ việc cạnh tranh; hoặc danh sách cử tri.\n*   **Người bị kiện:** Là cơ quan, tổ chức, cá nhân đã ban hành quyết định hành chính, thực hiện hành vi hành chính, ban hành quyết định kỷ luật buộc thôi việc, quyết định giải quyết khiếu nại về xử lý vụ việc cạnh tranh hoặc danh sách cử tri bị khởi kiện.\n*   **Người có quyền lợi, nghĩa vụ liên quan:** Là cơ quan, tổ chức, cá nhân không phải người khởi kiện hay người bị kiện, nhưng vụ án hành chính có liên quan đến quyền lợi, nghĩa vụ của họ. Họ có thể tự đề nghị hoặc được đương sự khác đề nghị và Tòa án chấp nhận, hoặc được Tòa án đưa vào tham gia tố tụng.\n*   **Cơ quan, tổ chức:** Bao gồm nhiều loại hình như cơ quan nhà nước, các tổ chức chính trị, xã hội, kinh tế, đơn vị sự nghiệp, đơn vị lực lượng vũ trang và các tổ chức khác được thành lập, hoạt động theo pháp luật.\n*   **Vụ án phức tạp:** Là vụ án có nhiều người liên quan, có chứng cứ mâu thuẫn cần xác minh kỹ, hoặc có đương sự là người nước ngoài, người Việt Nam ở nước ngoài.\n*   **Trở ngại khách quan:** Là những tình huống khách quan khiến người có quyền, nghĩa vụ không thể biết hoặc không thể thực hiện quyền, nghĩa vụ của mình.\n*   **Sự kiện bất khả kháng:** Là sự kiện xảy ra một cách khách quan, không thể lường trước và không thể khắc phục được dù đã áp dụng mọi biện pháp.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 3, Luật tố tụng hành chính 2015 số 93/2015/QH13 áp dụng 2025',NULL,'2026-04-01 03:13:08.911'),('b0459c86-dbe6-4b12-83d2-2c30692d924f','846a123b-4127-443c-8d4c-96bcce51d4ca','user','Xin chào, bạn là AI gì vậy ?',NULL,'2026-04-01 03:23:15.583'),('d4298a6a-f51b-43f4-a069-17a675fa1a62','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 1 của Bộ luật Hình sự quy định về nhiệm vụ của Bộ luật này. Cụ thể:\n\nNhiệm vụ chính của Bộ luật Hình sự là bảo vệ các lợi ích quan trọng của quốc gia và xã hội, bao gồm:\n*   **Bảo vệ chủ quyền quốc gia, an ninh đất nước và chế độ xã hội chủ nghĩa.**\n*   **Bảo vệ quyền con người, quyền công dân, lợi ích của Nhà nước, các tổ chức.**\n*   **Bảo vệ trật tự pháp luật xã hội chủ nghĩa và đấu tranh chống lại mọi hành vi phạm tội.**\n\nBên cạnh đó, Bộ luật Hình sự còn có nhiệm vụ giáo dục mọi người về ý thức tuân thủ pháp luật, từ đó góp phần phòng ngừa và đấu tranh chống tội phạm. (Theo kiến thức tổng hợp)\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Bộ luật Hình sự 2015 (sửa đổi, bổ sung 2017)',NULL,'2026-04-01 03:00:57.737'),('ecd7399c-c45c-4b5b-9c5e-52649054f9a5','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Tôi là một luật sư tư vấn chuyên nghiệp, được thiết kế để giải thích pháp luật một cách rõ ràng, dễ hiểu và chính xác cho bạn.\n\nHãy cho tôi biết vấn đề pháp lý mà bạn đang quan tâm, tôi sẵn sàng hỗ trợ bạn.',NULL,'2026-04-01 03:23:19.470'),('f5204a48-c47f-4430-a028-0730cdee325c','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 2 của Luật Tố tụng Hành chính 2015 quy định về phạm vi áp dụng và hiệu lực của Luật này như sau:\n\n1.  **Phạm vi trong nước:** Luật được áp dụng cho mọi hoạt động tố tụng hành chính diễn ra trên toàn lãnh thổ Việt Nam, bao gồm đất liền, hải đảo, vùng biển và vùng trời.\n2.  **Phạm vi ngoài nước:** Luật cũng được áp dụng đối với các hoạt động tố tụng hành chính do cơ quan đại diện của Việt Nam thực hiện ở nước ngoài.\n3.  **Vụ án có yếu tố nước ngoài:** Đối với các vụ án hành chính có yếu tố nước ngoài (liên quan đến bên nước ngoài), Luật này sẽ được áp dụng. Tuy nhiên, nếu một điều ước quốc tế mà Việt Nam là thành viên có quy định khác, thì quy định của điều ước quốc tế đó sẽ được ưu tiên áp dụng.\n4.  **Trường hợp ưu đãi, miễn trừ ngoại giao:** Nếu các cơ quan, tổ chức hoặc cá nhân nước ngoài, hay tổ chức quốc tế được hưởng quyền ưu đãi, miễn trừ ngoại giao hoặc lãnh sự theo pháp luật Việt Nam hoặc theo điều ước quốc tế, thì các vụ án hành chính liên quan đến họ sẽ được giải quyết thông qua con đường ngoại giao.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 2, Luật tố tụng hành chính 2015 số 93/2015/QH13',NULL,'2026-04-01 03:12:55.983');
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_sessions`
--

DROP TABLE IF EXISTS `chat_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Cuộc trò chuyện mới',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_sessions`
--

LOCK TABLES `chat_sessions` WRITE;
/*!40000 ALTER TABLE `chat_sessions` DISABLE KEYS */;
INSERT INTO `chat_sessions` VALUES ('846a123b-4127-443c-8d4c-96bcce51d4ca','cmnaka60l000p6wefip807za8','AI là gì?','2026-04-01 02:18:54.585','2026-04-01 03:23:15.569'),('e5a3ed2c-f3b7-49b0-8791-0e84553584e2','cmnaka60l000p6wefip807za8','Chào','2026-04-01 02:19:01.188','2026-04-01 03:00:33.636');
/*!40000 ALTER TABLE `chat_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_verification_tokens`
--

DROP TABLE IF EXISTS `email_verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verification_tokens` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `consumed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `email_verification_tokens_user_id_idx` (`user_id`),
  CONSTRAINT `email_verification_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verification_tokens`
--

LOCK TABLES `email_verification_tokens` WRITE;
/*!40000 ALTER TABLE `email_verification_tokens` DISABLE KEYS */;
INSERT INTO `email_verification_tokens` VALUES ('cmng3hp7x0002c0efzoin3qlu','cmng3hp6h0000c0ef234062ye','113f1e0b4eb08e996c771ccb1cf3feb756d7da6d1ad4a0539f70f319081d1ebe','2026-04-03 13:42:07.338',NULL,'2026-04-01 13:42:07.341'),('cmng3liun0005c0efbyr6we0w','cmng3liu00003c0eftdub3lwv','08f6d7051801b1975d0d4a8dccd99f3472995ab47cd867f4ddee3cb7b8163819','2026-04-03 13:45:05.710','2026-04-01 13:45:21.307','2026-04-01 13:45:05.711');
/*!40000 ALTER TABLE `email_verification_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_categories`
--

DROP TABLE IF EXISTS `hub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_categories` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hub_categories_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_categories`
--

LOCK TABLES `hub_categories` WRITE;
/*!40000 ALTER TABLE `hub_categories` DISABLE KEYS */;
INSERT INTO `hub_categories` VALUES ('cmnfq0z360003egef296kx9ff','hanh-chinh','Hành chính',1,'2026-04-01 07:25:11.970','2026-04-01 07:31:18.788',NULL),('cmnfq15860004egef95ob8yup','dan-su','Dân sự',0,'2026-04-01 07:25:19.926','2026-04-01 07:25:19.926',NULL),('cmnfq18z50005egefmz92vlx1','khac','Khác',2,'2026-04-01 07:25:24.785','2026-04-01 07:31:38.667',NULL);
/*!40000 ALTER TABLE `hub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_comment_likes`
--

DROP TABLE IF EXISTS `hub_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_comment_likes` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hub_comment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`,`hub_comment_id`),
  KEY `hub_comment_likes_hub_comment_id_idx` (`hub_comment_id`),
  CONSTRAINT `hub_comment_likes_hub_comment_id_fkey` FOREIGN KEY (`hub_comment_id`) REFERENCES `hub_comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hub_comment_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_comment_likes`
--

LOCK TABLES `hub_comment_likes` WRITE;
/*!40000 ALTER TABLE `hub_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `hub_comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_comments`
--

DROP TABLE IF EXISTS `hub_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_comments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hub_comments_post_id_parent_id_idx` (`post_id`,`parent_id`),
  KEY `hub_comments_author_id_idx` (`author_id`),
  KEY `hub_comments_parent_id_fkey` (`parent_id`),
  CONSTRAINT `hub_comments_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hub_comments_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `hub_comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `hub_comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `hub_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_comments`
--

LOCK TABLES `hub_comments` WRITE;
/*!40000 ALTER TABLE `hub_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `hub_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_oversight_versions`
--

DROP TABLE IF EXISTS `hub_oversight_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_oversight_versions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` int NOT NULL,
  `summary_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `suggestions_json` json DEFAULT NULL,
  `legal_corpus_version` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_version` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `hub_oversight_versions_post_id_version_key` (`post_id`,`version`),
  KEY `hub_oversight_versions_post_id_is_current_idx` (`post_id`,`is_current`),
  CONSTRAINT `hub_oversight_versions_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `hub_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_oversight_versions`
--

LOCK TABLES `hub_oversight_versions` WRITE;
/*!40000 ALTER TABLE `hub_oversight_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `hub_oversight_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_posts`
--

DROP TABLE IF EXISTS `hub_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_posts` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PUBLISHED','HIDDEN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PUBLISHED',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hub_posts_slug_key` (`slug`),
  KEY `hub_posts_category_id_created_at_idx` (`category_id`,`created_at`),
  KEY `hub_posts_author_id_idx` (`author_id`),
  CONSTRAINT `hub_posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hub_posts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `hub_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_posts`
--

LOCK TABLES `hub_posts` WRITE;
/*!40000 ALTER TABLE `hub_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `hub_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lawyer_verifications`
--

DROP TABLE IF EXISTS `lawyer_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lawyer_verifications` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','REVOKED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `jurisdiction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bar_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firm_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewed_by_user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewed_at` datetime(3) DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lawyer_verifications_user_id_idx` (`user_id`),
  KEY `lawyer_verifications_status_idx` (`status`),
  KEY `lawyer_verifications_reviewed_by_user_id_fkey` (`reviewed_by_user_id`),
  CONSTRAINT `lawyer_verifications_reviewed_by_user_id_fkey` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lawyer_verifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lawyer_verifications`
--

LOCK TABLES `lawyer_verifications` WRITE;
/*!40000 ALTER TABLE `lawyer_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `lawyer_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaderboard_snapshots`
--

DROP TABLE IF EXISTS `leaderboard_snapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard_snapshots` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_start` datetime(3) NOT NULL,
  `period_end` datetime(3) NOT NULL,
  `payload_json` json NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `leaderboard_snapshots_period_start_period_end_idx` (`period_start`,`period_end`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaderboard_snapshots`
--

LOCK TABLES `leaderboard_snapshots` WRITE;
/*!40000 ALTER TABLE `leaderboard_snapshots` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaderboard_snapshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `attempts` int NOT NULL DEFAULT '0',
  `consumed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `password_reset_tokens_user_id_idx` (`user_id`),
  CONSTRAINT `password_reset_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `contributor_opt_out` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profiles_user_id_key` (`user_id`),
  UNIQUE KEY `profiles_username_key` (`username`),
  CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('cmnbiumhl000bp0ef740cqa1g','cmnbiumhc000ap0efeqcd7fgo','n23dvcn009',NULL,NULL,NULL,0,'2026-03-29 08:53:13.689','2026-03-29 08:53:13.689',NULL),('cmng3hp730001c0efhzfpiv8f','cmng3hp6h0000c0ef234062ye','lethanhdat15671',NULL,NULL,NULL,0,'2026-04-01 13:42:07.311','2026-04-01 13:42:07.311',NULL),('cmng3liub0004c0ef1it1u7n1','cmng3liu00003c0eftdub3lwv','lethanhdat156',NULL,'/upload/1775052963948-534cf97501aa1986.jpg',NULL,0,'2026-04-01 13:45:05.699','2026-04-01 14:16:05.211',NULL);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queues`
--

DROP TABLE IF EXISTS `queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `queues` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` json NOT NULL,
  `status` enum('pending','processing','completed','error') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queues`
--

LOCK TABLES `queues` WRITE;
/*!40000 ALTER TABLE `queues` DISABLE KEYS */;
INSERT INTO `queues` VALUES ('d84a824c-96f7-4867-9778-d656a3eea751','verify_email','{\"email\": \"lethanhdat15672@gmail.com\", \"rawToken\": \"Py8O1eDtqKdCpygCP5SLBcU3oMMNL-p3jIwZUnmrs64\"}','completed','2026-04-01 13:42:07.416','2026-04-01 13:44:27.889'),('e8d9889d-cc1d-4714-a9e3-b74ca54efe82','verify_email','{\"email\": \"lethanhdat1567@gmail.com\", \"rawToken\": \"xOaJlHcQngNrtyxrXpKNkPOH454KT7UrJTepxF74cDw\"}','completed','2026-04-01 13:45:05.730','2026-04-01 13:45:12.254');
/*!40000 ALTER TABLE `queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_sessions`
--

DROP TABLE IF EXISTS `refresh_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `revoked_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `refresh_sessions_user_id_idx` (`user_id`),
  CONSTRAINT `refresh_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_sessions`
--

LOCK TABLES `refresh_sessions` WRITE;
/*!40000 ALTER TABLE `refresh_sessions` DISABLE KEYS */;
INSERT INTO `refresh_sessions` VALUES ('cmnbiumid000dp0efe9tjcmu3','cmnbiumhc000ap0efeqcd7fgo','9d868e4d2a20ee2913130f14f6b5ef1ef932a7df1e3dc212e307cc1eb16b9167','2026-04-05 08:53:13.000','2026-03-29 08:54:48.741','2026-03-29 08:53:13.717'),('cmnbiwnu7000gp0efwfzpvcgn','cmnbiumhc000ap0efeqcd7fgo','c1423a36434636caa9a4d465c38e8cfd3613dd8dd5019c6735ac418fbfe0c6ad','2026-04-05 08:54:48.000','2026-03-29 09:05:57.211','2026-03-29 08:54:48.751'),('cmnbjaznu0000p0ef28s51x4v','cmnbiumhc000ap0efeqcd7fgo','354209d62628ff09b4189805dbc7f0efbd4abdced0f1cc114e6f15dd1c9e4518','2026-04-05 09:05:57.000','2026-03-29 09:06:12.539','2026-03-29 09:05:57.258'),('cmnbjbbgq0001p0efbudjyixv','cmnbiumhc000ap0efeqcd7fgo','c8293aff501bd606d1e4c3fcd9ff5f1d0006d12034b2834da0e6611884c148c4','2026-04-05 09:06:12.000','2026-03-29 09:08:02.035','2026-03-29 09:06:12.554'),('cmnbjdnyh0002p0ef35shac3z','cmnbiumhc000ap0efeqcd7fgo','db68b3da5c87c6866c586de2f4ace4be6b7311e04f7a23f7a0d76d317b0a047d','2026-04-05 09:08:02.000','2026-03-29 09:08:11.515','2026-03-29 09:08:02.057'),('cmnbjdv9m0003p0efvfn9ez6n','cmnbiumhc000ap0efeqcd7fgo','002a831a129cd49abe38288494e9bec96b1860b77a1bb5bb8b3471859a148f41','2026-04-05 09:08:11.000',NULL,'2026-03-29 09:08:11.530'),('cmnfop06900025cefoqsj93t1','cmnbiumhc000ap0efeqcd7fgo','e26b01e9eed5f552505ba8007ca16f8d7e9b69514e8bc3cad13d6486930b2788','2026-04-08 06:47:53.000','2026-04-01 06:48:11.430','2026-04-01 06:47:53.890'),('cmnfopdpp00035cefyjvmzydn','cmnbiumhc000ap0efeqcd7fgo','0f5875de10b8eb91ac811f0e728ecd871c6e7279d9ba25359e9316f4cf9702fa','2026-04-08 06:48:11.000','2026-04-01 06:49:13.919','2026-04-01 06:48:11.438'),('cmnfoqpxm00045ceffrv15czq','cmnbiumhc000ap0efeqcd7fgo','a8e29f8ce9d0ea3153599331e3b0c07e3257b7f358b28fbf44e7a9b20d1c10c0','2026-04-08 06:49:13.000','2026-04-01 06:49:54.269','2026-04-01 06:49:13.930'),('cmnforl2t00055cefojz7we5k','cmnbiumhc000ap0efeqcd7fgo','a8df514b2cc9ff0c2fd61ca3953f64948c0e0e9bdf22ca91b6aebb7f86f7bffa','2026-04-08 06:49:54.000','2026-04-01 06:49:59.909','2026-04-01 06:49:54.293'),('cmnforpfb00065cefaodkmcgv','cmnbiumhc000ap0efeqcd7fgo','83bda81dd78d15948a595f023734834c336248cc1f7561c0651d022a3f5ef364','2026-04-08 06:49:59.000','2026-04-01 06:50:08.440','2026-04-01 06:49:59.927'),('cmnfq68mx000cegef4yy5q1hz','cmnbiumhc000ap0efeqcd7fgo','39f7ddb4bb051dfb0b94e723dbb72e2a6fb0f3165421e64d91c7e95a60652680','2026-04-08 07:29:17.000','2026-04-01 07:29:31.162','2026-04-01 07:29:17.625'),('cmnfyneco0000psef8fs30lhp','cmnbiumhc000ap0efeqcd7fgo','e305fcb931c4e336512fb9de321047f52e5aa410dc1f5e26e447b80d1665d283','2026-04-08 11:26:35.000','2026-04-01 11:26:51.987','2026-04-01 11:26:35.112'),('cmng3luwz0006c0efly31r4p9','cmng3liu00003c0eftdub3lwv','dc132c6ab065215ce498f449950c3976f93a1b0160c862bc8ff96d328541efa9','2026-04-08 13:45:21.000','2026-04-01 13:45:51.444','2026-04-01 13:45:21.347'),('cmng3mi600007c0efff5zzymz','cmng3liu00003c0eftdub3lwv','4e9e20edf5ccbfbeeda3721396f0015438a635f443967722a6f84e3a00d12b6f','2026-04-08 13:45:51.000','2026-04-01 13:45:54.587','2026-04-01 13:45:51.480'),('cmng3mkkq0008c0efv9xg2xjk','cmng3liu00003c0eftdub3lwv','a5a95864bc93a6bc0f3ce2d71d82ffebbbfc07b148d13df36acb7ce01a57f17c','2026-04-08 13:45:54.000','2026-04-01 14:16:08.768','2026-04-01 13:45:54.602'),('cmng4pgem000cc0efok78zccz','cmng3liu00003c0eftdub3lwv','8e388e99feb2e4dd00feffe7b9d9fc21ccf99d100442c6e3c4655975327e4bb6','2026-04-08 14:16:08.000',NULL,'2026-04-01 14:16:08.782');
/*!40000 ALTER TABLE `refresh_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reputation_ledger`
--

DROP TABLE IF EXISTS `reputation_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reputation_ledger` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delta` int NOT NULL,
  `reason` enum('HUB_REPLY_HELPFUL','BLOG_QUALITY','BLOG_POST_LIKED','BLOG_COMMENT_HELPFUL','MOD_ADJUSTMENT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ref_hub_comment_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_blog_post_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ref_blog_comment_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reputation_ledger_user_id_created_at_idx` (`user_id`,`created_at`),
  KEY `reputation_ledger_reason_idx` (`reason`),
  KEY `reputation_ledger_ref_hub_comment_id_fkey` (`ref_hub_comment_id`),
  KEY `reputation_ledger_ref_blog_post_id_fkey` (`ref_blog_post_id`),
  KEY `reputation_ledger_ref_blog_comment_id_fkey` (`ref_blog_comment_id`),
  CONSTRAINT `reputation_ledger_ref_blog_comment_id_fkey` FOREIGN KEY (`ref_blog_comment_id`) REFERENCES `blog_comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reputation_ledger_ref_blog_post_id_fkey` FOREIGN KEY (`ref_blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reputation_ledger_ref_hub_comment_id_fkey` FOREIGN KEY (`ref_hub_comment_id`) REFERENCES `hub_comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reputation_ledger_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reputation_ledger`
--

LOCK TABLES `reputation_ledger` WRITE;
/*!40000 ALTER TABLE `reputation_ledger` DISABLE KEYS */;
INSERT INTO `reputation_ledger` VALUES ('cmng4jm69000ac0efoq1mp1yz','cmng3liu00003c0eftdub3lwv',50,'BLOG_QUALITY',NULL,'cmng4jm4f0009c0efz0d3weea','2026-04-01 14:11:36.321',NULL);
/*!40000 ALTER TABLE `reputation_ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_blog_posts`
--

DROP TABLE IF EXISTS `saved_blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_blog_posts` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`,`blog_post_id`),
  KEY `saved_blog_posts_blog_post_id_idx` (`blog_post_id`),
  KEY `saved_blog_posts_user_id_created_at_idx` (`user_id`,`created_at`),
  CONSTRAINT `saved_blog_posts_blog_post_id_fkey` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `saved_blog_posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_blog_posts`
--

LOCK TABLES `saved_blog_posts` WRITE;
/*!40000 ALTER TABLE `saved_blog_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('cmnfqoqql0001xgefszrm48u9','tu-van-dan-su','Tư vấn dân sự','2026-04-01 07:43:40.893','2026-04-01 07:43:40.893',NULL),('cmnfqst9u0000y0ef6pr19goh','khac','Khác','2026-04-01 07:46:50.803','2026-04-01 07:46:50.803',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth_identities`
--

DROP TABLE IF EXISTS `user_auth_identities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth_identities` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` enum('FIREBASE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_at_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_auth_identities_provider_provider_user_id_key` (`provider`,`provider_user_id`),
  KEY `user_auth_identities_user_id_idx` (`user_id`),
  CONSTRAINT `user_auth_identities_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth_identities`
--

LOCK TABLES `user_auth_identities` WRITE;
/*!40000 ALTER TABLE `user_auth_identities` DISABLE KEYS */;
INSERT INTO `user_auth_identities` VALUES ('cmnbiumhx000cp0eff3y5eh14','cmnbiumhc000ap0efeqcd7fgo','FIREBASE','3xl7v3xdSnOuw3avTw411JVK6iG3','n23dvcn009@student.ptithcm.edu.vn','2026-03-29 08:53:13.701');
/*!40000 ALTER TABLE `user_auth_identities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_contribution_scores`
--

DROP TABLE IF EXISTS `user_contribution_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contribution_scores` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_contribution_scores_user_id_key` (`user_id`),
  CONSTRAINT `user_contribution_scores_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contribution_scores`
--

LOCK TABLES `user_contribution_scores` WRITE;
/*!40000 ALTER TABLE `user_contribution_scores` DISABLE KEYS */;
INSERT INTO `user_contribution_scores` VALUES ('cmng4jm6j000bc0ef3j9tique','cmng3liu00003c0eftdub3lwv',50,'2026-04-01 14:11:36.331','2026-04-01 14:11:36.331');
/*!40000 ALTER TABLE `user_contribution_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` datetime(3) DEFAULT NULL,
  `role` enum('USER','VERIFIED_LAWYER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_email_idx` (`email`),
  KEY `users_role_idx` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('cmnbiumhc000ap0efeqcd7fgo','n23dvcn009@student.ptithcm.edu.vn',NULL,'2026-03-29 08:53:13.678','USER','2026-03-29 08:53:13.680','2026-03-29 08:53:13.680',NULL),('cmng3hp6h0000c0ef234062ye','lethanhdat15672@gmail.com','$2b$12$cScuzfcVgCHOOJ0RYCIXCOCO4k2lcBKU1s5PoDTv9FHsd0yv8v/bS',NULL,'USER','2026-04-01 13:42:07.289','2026-04-01 13:42:07.289',NULL),('cmng3liu00003c0eftdub3lwv','lethanhdat1567@gmail.com','$2b$12$55aA.8DyAdADbfmioaa/KOlGjtSvKv1GxuChI84cIN6CnudNjGucm','2026-04-01 13:45:21.269','USER','2026-04-01 13:45:05.688','2026-04-01 13:45:21.290',NULL);
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

-- Dump completed on 2026-04-01 21:41:00
