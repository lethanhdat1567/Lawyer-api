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
INSERT INTO `_prisma_migrations` VALUES ('003d1121-1d9b-46fe-822e-d88293fa14f5','4cb64423ea3ec3cbb6e04b7af198879d1fba568ee052a61fe013da001e37be70','2026-04-03 08:18:26.413','20260403081826_update_user_role_table',NULL,NULL,'2026-04-03 08:18:26.277',1),('046bbe7e-f26a-4e08-b9e1-ea5721a2e3f8','fd40187a961bc7e733e389e484025149720066d5ab998af2c941d6d24ccf690d','2026-04-03 03:00:24.726','20260403030024_update_schedule_blog_table',NULL,NULL,'2026-04-03 03:00:24.696',1),('11440b00-013c-4690-a505-6cb53238c711','6561445cb1b14613c6cd707625cf089ab08e4634208988ed4a0824b70cca7115','2026-04-02 03:24:15.876','20260402032415_add_hub_feedback_table',NULL,NULL,'2026-04-02 03:24:15.681',1),('3f642818-ce08-4fcb-921a-b939cef92276','4b0568a178bf80af7d5bb79469e8ea3208df413a5f05928d17114d928cc3a3a0','2026-04-01 08:22:50.957','20260401082250_add_blog_post_liked_reason',NULL,NULL,'2026-04-01 08:22:50.870',1),('4ac510ae-c141-4081-bd80-77e726c212eb','ef3eb33f4d27fe8e6a4f73517f72f4078d8d6dc83be0fe1cce2227258d502078','2026-04-02 01:45:27.613','20260402110000_remove_hub_oversight_versions',NULL,NULL,'2026-04-02 01:45:27.455',1),('6a1dd64f-184f-419e-8f85-0c72a1a73870','800197e24bfbe1c960963004b94aa096a7c295b33fc43f511b85975faa7e140d','2026-04-05 02:21:54.013','20260405022153_add_ai_config_tabke',NULL,NULL,'2026-04-05 02:21:53.992',1),('70b6485b-6a5d-4916-91ff-a8fe53a43d75','4389b2da4436d60ba86b9d02f1eb7f9101197b73b3c76cf421b496d6cec18754','2026-04-01 08:44:34.307','20260401084434_update_verify_table',NULL,NULL,'2026-04-01 08:44:34.193',1),('892707d5-7ee8-4550-9330-e8999e4244d4','9b0f0a9639837cff33280ee7698a9bdd6a56d1ddd5fc6c2ea2800e5d97b254a1','2026-04-01 13:18:12.853','20260401193000_remove_admin_reputation_reasons',NULL,NULL,'2026-04-01 13:18:12.692',1),('8c7742c8-8a7d-4c36-bac6-87b3ab78700f','484c6c376e24ff6d0eb3e43cb6d65976e2e0f352987d2dcb468a805e357583f7','2026-03-28 15:05:32.311','20260328150531_auth_sessions_and_identities',NULL,NULL,'2026-03-28 15:05:31.817',1),('9c7b7a8d-1f3a-4551-a188-7754adfdb756','5d3bca5d4435b671fa5d15b8eb828fa7e877db38f74ce88702e15d61e1fff943','2026-04-01 13:18:29.767','20260401131829_add_queue_table',NULL,NULL,'2026-04-01 13:18:29.734',1),('a250438c-4e02-4e06-ad44-f6364569a636','8442fe910d01e9f1a4f6312f9c7e4d8a6ccbf9ba04cc6eb0338bb2ddfde3cb45','2026-03-28 14:44:21.536','20260328144417_init_database',NULL,NULL,'2026-03-28 14:44:17.937',1),('a2a5f2f3-b41f-4380-b66e-b46a3979c7e7','54c04b8333e6d11c40e0ba983acdff3cdfc9b22cec2f316794d641ca6cbcda30','2026-04-01 11:39:02.601','20260401113902_remove_report_feature',NULL,NULL,'2026-04-01 11:39:02.514',1),('adc7465e-0cb4-4ae9-8b9b-94f1fe8f7fef','3af8bd3fa28ddb23996803072e8a76745684da14b97f4f8d74a9ef5a36b08df2','2026-04-01 13:18:12.980','20260401203000_remove_legal_sources_feature',NULL,NULL,'2026-04-01 13:18:12.857',1),('bae7f5df-9e9e-4e43-a124-42e80ac78cb6','2b767e3aebcbbad406ca62eeabb7f73854ae4ef1836d73af98673304c824771d','2026-04-03 06:32:43.123','20260403063242_update_status_automatic',NULL,NULL,'2026-04-03 06:32:42.942',1),('c72ee6e3-af57-4c19-8c62-452685d7fbf9','00414405a0b9bdb3874d584bab639160fff5885a3543772cb5293526a25ec27e','2026-03-31 10:31:07.159','20260331103106_add_chat_table',NULL,NULL,'2026-03-31 10:31:07.030',1),('d44cb9c7-5b5c-46e9-b92f-5e0a533e48dd','64531518909683b3d9b8f5bc56e874078e04b6441a488323dfb9d7cf4a8b002a','2026-04-02 07:17:59.582','20260402071759_add_automatic_blog_table',NULL,NULL,'2026-04-02 07:17:59.477',1),('db3428e6-46b5-4f06-9231-e056c8b61047','fc08e8764ce787b614965ff905dc97e8dd525b0be55123e7ff2ca5c2dc279a39','2026-03-30 15:12:34.732','20260330151234_add_pipeline_configs_and_crawl_logs',NULL,NULL,'2026-03-30 15:12:34.419',1),('f31d7633-0f74-4ae2-bc3d-779e1865a094','016be662d9f0d055edcf5ec7cad5419bd6af1b244f8b673fd5c6bd579f81716d','2026-03-29 07:50:04.611','20260329120000_blog_thumbnail_comments_engagement',NULL,NULL,'2026-03-29 07:50:04.197',1),('f38c5116-f319-45ed-8264-2b409840de28','2869d87b693db644e22bce5cd975d8ced765f4e3d06bd226669447e1845e5a2c','2026-03-29 08:34:18.233','20260329120001_comment_likes_and_ledger_blog_comment',NULL,NULL,'2026-03-29 08:34:17.792',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_configs`
--

DROP TABLE IF EXISTS `ai_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_configs` (
  `id` int NOT NULL DEFAULT '1',
  `advisor_prompt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `community_prompt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_prompt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_configs`
--

LOCK TABLES `ai_configs` WRITE;
/*!40000 ALTER TABLE `ai_configs` DISABLE KEYS */;
INSERT INTO `ai_configs` VALUES (1,'Vai trò: Bạn là Chuyên gia Tư vấn Pháp luật thuộc hệ thống LawyerAI. Nhiệm vụ của bạn là giải đáp thắc mắc dựa trên dữ liệu pháp lý được cung cấp kết hợp với kiến thức chuyên môn hệ thống.\n\n1. Nguyên tắc Ưu tiên Dữ liệu (RAG):\n\nDữ liệu từ Database là Tối thượng: Nếu nội dung trong [NGUỒN DỮ LIỆU] có con số, mốc thời gian hoặc quy định cụ thể, bạn BẮT BUỘC sử dụng nó.\n\nKhi dữ liệu DB không khớp hoặc thiếu: Nếu không tìm thấy trong nguồn cung cấp, hãy thông báo: \"Hiện tại kho dữ liệu chuyên sâu của tôi chưa cập nhật chi tiết về [Tên Luật/Điều], tuy nhiên dựa trên kiến thức pháp luật tổng hợp, tôi xin tư vấn như sau:\"\n\n2. Cấu trúc câu trả lời (Bắt buộc):\n\nDòng đầu tiên (Kết luận): Trả lời trực diện. Ví dụ: \"Hành vi này là Vi phạm\", \"Bạn Được phép...\".\n\nPhần giải thích (Bình dân hóa): Diễn giải dễ hiểu, dùng gạch đầu dòng để phân tách ý chính.\n\nPhần Trích dẫn (Cập nhật): Sau phần giải thích, bạn phải kẻ một đường gạch ngang dài để tách biệt, sau đó liệt kê các điều luật bằng icon ghim.\n\n3. Quy định về hiển thị Trích dẫn:\n\nSử dụng đường kẻ ngang --- để ngăn cách phần tư vấn và phần căn cứ.\n\nMỗi điều luật phải bắt đầu bằng icon 📌.\n\nĐịnh dạng: 📌 [Tên Điều/Khoản] - [Tên Luật]\n\n4. Thái độ & Kết thúc:\n\nMực thước & Không phán xét: Điều chỉnh tông giọng phù hợp, không bác bỏ người dùng trực tiếp.\n\nCâu kết bắt buộc: \"Thông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.\"','VAI TRÒ: Bạn là Chuyên gia Pháp lý cấp cao tại LawyerAI. Nhiệm vụ của bạn là đưa ra chỉ dẫn thực thi tức thời cho các vướng mắc của người dùng trên Hub.\n\nNGUYÊN TẮC CỐT LÕI:\n\nTrực diện: Không chào hỏi, không dẫn nhập rườm rà.\n\nNgôn ngữ thực tế: Thay vì dùng \"Căn cứ pháp lý\", hãy dùng \"Điểm tựa pháp luật\". Thay vì \"Giải pháp thực thi\", hãy dùng \"Lộ trình xử lý\".\n\nĐịnh dạng: Sử dụng Markdown, Bold (**) để nhấn mạnh từ khóa.\n\nCẤU TRÚC PHẢN HỒI (BẮT BUỘC):\n\n⚖️ Điểm tựa pháp luật\nLĩnh vực: [Loại hình luật]\n\nĐiều khoản: [Liệt kê chính xác Điều, Khoản, Tên Luật/Nghị định]\n\n🔍 Nhận định tình huống\n[Hợp pháp / Vi phạm / Rủi ro pháp lý]. [Giải thích ngắn gọn lý do trong tối đa 20 từ].\n\n🛠️ Lộ trình xử lý\nBước 1: [Hành động thực tế nhất để giải quyết ngay lập tức]\n\nBước 2: [Thủ tục giấy tờ hoặc cơ quan cần liên hệ tiếp theo]\n\nBước 3: [Cách thức bảo vệ quyền lợi nếu phát sinh khiếu nại]\n\n⚠️ Cảnh báo đỏ\nRủi ro: [Hậu quả nặng nhất nếu không xử lý đúng]\n\nLưu ý: [01 mẹo hoặc cảnh báo then chốt để không bị làm khó dễ','YÊU CẦU NỘI DUNG:\n        1. Ngôn ngữ: Tiếng Việt, phong cách luật sư chuyên nghiệp.\n        2. Định dạng Body: Sử dụng thẻ HTML sạch (h2, p, ul, li, strong) cho Tiptap. KHÔNG dùng Markdown.\n        3. Slug: Phải là duy nhất, không trùng với danh sách trên. Nếu tiêu đề tương tự, hãy thêm hậu tố đặc biệt hoặc diễn đạt khác đi.\n      4. LOGIC ƯU TIÊN: \n   - Nếu tìm thấy thẻ phù hợp trong danh sách hệ thống -> BẮT BUỘC SỬ DỤNG.\n   - Nếu KHÔNG có thẻ nào phù hợp -> Sử dụng thẻ mang tên \"Khác\" (đã có sẵn trong hệ thống). \n   - Hạn chế tối đa việc tạo thẻ mới trong mảng \"tags\". Chỉ tạo nếu nội dung cực kỳ đặc thù và không thể xếp vào bất kỳ thẻ nào hiện có (kể cả thẻ \"Khác\").\n\nTẤT CẢ TAGS DÙ LÀ MỚI HAY CŨ ĐỀU PHẢI BỎ VÀO MẢNG TAGS\n\n        YÊU CẦU ĐỊNH DẠNG ĐẦU RA:\n        - Trả về DUY NHẤT một JSON object. KHÔNG bọc trong \\`\\`\\`json.\n        {\n            \"blog\": { \"title\": \"...\", \"slug\": \"...\", \"excerpt\": \"...\", \"body\": \"...\" },\n            \"tags\": [{ \"name\": \"...\", \"slug\": \"...\" }]\n        }','2026-04-05 08:29:17.280');
/*!40000 ALTER TABLE `ai_configs` ENABLE KEYS */;
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
-- Table structure for table `blog_ideas`
--

DROP TABLE IF EXISTS `blog_ideas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_ideas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','PROCESSING','COMPLETED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_ideas`
--

LOCK TABLES `blog_ideas` WRITE;
/*!40000 ALTER TABLE `blog_ideas` DISABLE KEYS */;
INSERT INTO `blog_ideas` VALUES (14,'Chết rồi, ai thừa kế Netflix của bạn?','Phân tích 5 sai lầm pháp lý phổ biến trong việc quản lý và thừa kế di sản số (tài khoản mạng xã hội, dữ liệu đám mây, tài sản crypto...) mà nhiều người Việt Nam vô tình bỏ qua, dẫn đến tranh chấp và rủi ro không đáng có cho người thân. Tầm quan trọng của di chúc số và kế hoạch pháp lý di sản số.','COMPLETED','2026-04-05 07:48:59.123','2026-04-05 07:51:14.405'),(15,'Startup Việt: Tiền tỷ ra đi vì bản hợp đồng \'miệng\'','Phân tích 3 sai lầm pháp lý chí tử mà các startup Việt thường mắc phải trong giai đoạn gọi vốn và phát triển ban đầu, từ việc bỏ qua hợp đồng rõ ràng, không bảo vệ sở hữu trí tuệ đến việc không hiểu rõ quyền lợi cổ đông, gây ra tranh chấp, mất mát tài sản và phá sản sớm.','COMPLETED','2026-04-05 07:48:59.123','2026-04-05 07:55:18.930'),(16,'AI cho lời khuyên luật, bạn có đang \'rước họa vào thân\'?','Phân tích những sai lầm chết người khi tin tưởng mù quáng vào AI để giải quyết các vấn đề pháp lý cá nhân hoặc doanh nghiệp, và cách bảo vệ mình khỏi những rủi ro số không ngờ tới. (Dựa trên tag: Phân tích Án lệ AI, Cảnh báo Rủi ro số, Xu hướng Legal-Tech)','COMPLETED','2026-04-05 07:58:36.646','2026-04-05 08:03:08.985'),(17,'Chữ ký số \'chết người\': Vì sao bạn có thể mất nhà vì một cú click chuột?','Mổ xẻ những lỗ hổng pháp lý và sai lầm phổ biến khi sử dụng chữ ký số, giao dịch điện tử trong các thủ tục hành chính, mua bán nhà đất, và cảnh báo về rủi ro mất tài sản vì sự thiếu hiểu biết. (Dựa trên tag: Thủ tục Hành chính 4.0, Cảnh báo Rủi ro số, Giải mã Điều luật)','PENDING','2026-04-05 07:58:36.646','2026-04-05 07:59:00.029');
/*!40000 ALTER TABLE `blog_ideas` ENABLE KEYS */;
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
INSERT INTO `blog_post_tags` VALUES ('cmnlh56oy0000ewefvwkednlf','cmnlfwosg0007u0efmw788ht2'),('cmnlh56oy0000ewefvwkednlf','cmnlfxklj000bu0efwrtqihuw'),('cmnlh56oy0000ewefvwkednlf','cmnlfxutc000cu0ef6d04t89x');
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
INSERT INTO `blog_posts` VALUES ('cmnlgv40e0000u8efj24mjpcw','cmng3liu00003c0eftdub3lwv','startup-viet-tien-ty-boc-hoi-vi-3-sai-lam-phap-ly-khi-goi-von','Startup Việt: Tiền Tỷ Bốc Hơi Vì 3 Sai Lầm Pháp Lý Chí Tử Khi Gọi Vốn Và Phát Triển','Nhiều startup Việt Nam đang đối mặt với rủi ro phá sản và mất mát tài sản vì những thiếu sót pháp lý nghiêm trọng trong giai đoạn gọi vốn và phát triển ban đầu. Bài viết này sẽ phân tích ba sai lầm chí tử mà các nhà khởi nghiệp thường mắc phải, từ việc bỏ qua hợp đồng rõ ràng, không bảo vệ sở hữu trí tuệ đến việc không hiểu rõ quyền lợi cổ đông, nhằm cung cấp kiến thức thiết yếu để phòng tránh những hệ lụy pháp lý đáng tiếc.','<h2>Lời Mở Đầu: Tiền Tỷ Ra Đi Vì Thiếu Vắng Nền Tảng Pháp Lý Vững Chắc</h2><p>Thị trường startup Việt Nam đang chứng kiến sự bùng nổ mạnh mẽ, thu hút nguồn vốn đầu tư khổng lồ. Tuy nhiên, đằng sau những câu chuyện thành công, không ít dự án tiềm năng đã phải dừng bước hoặc đối mặt với các tranh chấp pháp lý gay gắt, thậm chí mất trắng tài sản chỉ vì những sai lầm cơ bản nhưng chí tử trong giai đoạn đầu. Việc coi nhẹ các quy định pháp luật hoặc thiếu hiểu biết về quyền và nghĩa vụ của mình có thể biến một ý tưởng triệu đô thành một gánh nặng pháp lý.</p><p>Bài viết này sẽ đi sâu phân tích ba sai lầm pháp lý phổ biến nhất mà các startup Việt thường mắc phải, gây ra những hệ quả nghiêm trọng, từ mất mát tài chính đến tan vỡ hợp tác.</p><h2>1. Sai Lầm 1: Coi Thường Hợp Đồng Rõ Ràng – Cạm Bẫy Từ Giao Kèo \'Miệng\'</h2><p>Trong môi trường khởi nghiệp, tốc độ và sự linh hoạt thường được ưu tiên. Nhiều nhà sáng lập tin rằng các thỏa thuận \'miệng\' hoặc những bản ghi nhớ sơ sài là đủ để bắt đầu hợp tác hoặc nhận đầu tư. Tuy nhiên, đây chính là một trong những sai lầm nguy hiểm nhất.</p><ul><li><strong>Thiếu Cơ Sở Pháp Lý Vững Chắc:</strong> Hợp đồng \'miệng\', dù được công nhận trong một số trường hợp, lại cực kỳ khó chứng minh khi có tranh chấp. Thiếu các điều khoản rõ ràng về quyền, nghĩa vụ, lợi ích, cơ chế giải quyết tranh chấp... khiến mọi thứ trở nên mập mờ.</li><li><strong>Rủi Ro Mất Quyền Kiểm Soát:</strong> Khi không có hợp đồng đầu tư, hợp đồng sáng lập (Founder Agreement) hay hợp đồng lao động minh bạch, startup có thể mất quyền kiểm soát đối với ý tưởng, công nghệ hoặc thậm chí bị tước bỏ lợi ích khi dự án phát triển.</li><li><strong>Hậu Quả Khó Lường:</strong> Từ việc không thể thu hồi vốn, bị đối tác chiếm đoạt tài sản, đến việc phải đối mặt với các vụ kiện kéo dài, tốn kém tài chính và thời gian, gây kiệt quệ nguồn lực vốn đã hạn chế của startup.</li></ul><p><strong>Giải pháp:</strong> Luôn ưu tiên lập văn bản và ký kết các hợp đồng pháp lý chặt chẽ cho mọi giao dịch quan trọng, bao gồm Hợp đồng Đầu tư, Hợp đồng Sáng lập, Hợp đồng Lao động, Hợp đồng Cung cấp Dịch vụ, v.v. Các điều khoản phải được soạn thảo rõ ràng, cụ thể và có sự tư vấn của chuyên gia pháp lý.</p><h2>2. Sai Lầm 2: Lơ Là Bảo Vệ Tài Sản Trí Tuệ – Mỏ Vàng Bị Đánh Cắp</h2><p>Đối với một startup, ý tưởng, công nghệ, thương hiệu, mã nguồn, thuật toán hay quy trình độc quyền chính là tài sản quý giá nhất, tạo nên lợi thế cạnh tranh. Tuy nhiên, không ít nhà khởi nghiệp lại bỏ qua việc bảo vệ tài sản trí tuệ (IP) của mình.</p><ul><li><strong>Đánh Mất Lợi Thế Cạnh Tranh:</strong> Khi không đăng ký bảo hộ thương hiệu, bản quyền, hoặc sáng chế, các đối thủ cạnh tranh có thể dễ dàng sao chép, sử dụng ý tưởng hoặc sản phẩm của startup mà không vấp phải rào cản pháp lý.</li><li><strong>Khó Khăn Trong Gọi Vốn Và Hợp Tác:</strong> Nhà đầu tư và đối tác thường rất quan tâm đến việc startup có khả năng bảo vệ IP hay không. Việc thiếu các biện pháp bảo hộ IP sẽ làm giảm giá trị của startup, khiến việc gọi vốn hoặc ký kết hợp tác trở nên khó khăn hơn.</li><li><strong>Nguy Cơ Tranh Chấp Và Thua Kiện:</strong> Thậm chí, startup có thể bị kiện ngược nếu vô tình xâm phạm IP của bên khác do không nắm rõ quy định, hoặc không thể bảo vệ mình khi IP bị xâm phạm.</li></ul><p><strong>Giải pháp:</strong> Chủ động đăng ký bảo hộ quyền sở hữu trí tuệ (đăng ký nhãn hiệu, bản quyền, sáng chế...) ngay từ giai đoạn đầu. Sử dụng các Thỏa thuận Bảo mật (NDA) và các điều khoản bảo mật trong hợp đồng với nhân viên, đối tác để bảo vệ thông tin mật và bí mật kinh doanh.</p><h2>3. Sai Lầm 3: Mập Mờ Quyền Lợi Cổ Đông – Nguy Cơ Tranh Chấp Nội Bộ</h2><p>Trong quá trình phát triển, startup thường có nhiều nhà sáng lập, nhà đầu tư cùng tham gia góp vốn. Việc không xác định rõ ràng quyền lợi, trách nhiệm và cơ chế quản trị giữa các cổ đông là mầm mống của mọi tranh chấp nội bộ.</p><ul><li><strong>Tranh Chấp Về Quyền Lợi Và Kiểm Soát:</strong> Khi không có Thỏa thuận Cổ đông (Shareholders\' Agreement) hoặc Điều lệ công ty minh bạch, các vấn đề như quyền phủ quyết, quyền biểu quyết, quyền thoái vốn, cơ chế giải quyết bất đồng ý kiến, hoặc tỷ lệ chia lợi nhuận/lỗ có thể dẫn đến mâu thuẫn gay gắt.</li><li><strong>Cản Trở Quyết Định Quan Trọng:</strong> Khi các cổ đông không đạt được sự đồng thuận, các quyết định quan trọng liên quan đến chiến lược, gọi vốn, tuyển dụng, hoặc bán công ty có thể bị trì hoãn hoặc đổ vỡ, ảnh hưởng trực tiếp đến sự phát triển của startup.</li><li><strong>Tan Rã Quan Hệ Hợp Tác:</strong> Tranh chấp nội bộ thường gây ra sự chia rẽ, làm suy yếu tinh thần đội ngũ, và thậm chí dẫn đến việc các nhà sáng lập phải rời đi, mang theo những tài sản trí tuệ hoặc khách hàng quan trọng, gây thiệt hại nghiêm trọng cho startup.</li></ul><p><strong>Giải pháp:</strong> Xây dựng một Điều lệ công ty chi tiết và một Thỏa thuận Cổ đông toàn diện, xác định rõ ràng quyền và nghĩa vụ của từng cổ đông, cơ chế quản trị, quyền phủ quyết, quy trình giải quyết tranh chấp, và các điều khoản liên quan đến thoái vốn (exit strategy).</p><h2>Kết Luận: Chuyên Nghiệp Hóa Pháp Lý Để Vươn Tầm</h2><p>Những câu chuyện “tiền tỷ ra đi” vì bản hợp đồng ‘miệng’ hay những sai lầm pháp lý tương tự không phải là hiếm. Để startup Việt có thể phát triển bền vững và vươn ra thị trường quốc tế, việc trang bị kiến thức pháp lý và tuân thủ các quy định là điều kiện tiên quyết. Các nhà khởi nghiệp cần chủ động tìm kiếm sự tư vấn chuyên nghiệp từ luật sư ngay từ giai đoạn ý tưởng, để xây dựng một nền tảng pháp lý vững chắc, bảo vệ tài sản, quyền lợi của mình và tránh xa những cạm bẫy không đáng có.</p>','PUBLISHED',1,'2026-04-05 07:55:18.916',NULL,'Verified by AI','1.0.0','2026-04-05 07:55:18.926','2026-04-05 07:55:18.926',NULL,NULL),('cmnlh56oy0000ewefvwkednlf','cmng3liu00003c0eftdub3lwv','ai-tu-van-phap-ly-loi-bat-cap-hai-hay-ruoc-hoa-vao-than','AI Tư Vấn Pháp Lý: Lợi Bất Cập Hại Hay \'Rước Họa Vào Thân\'?','Bài viết phân tích những rủi ro pháp lý tiềm ẩn khi phụ thuộc mù quáng vào trí tuệ nhân tạo (AI) để giải quyết các vấn đề pháp lý cá nhân hoặc doanh nghiệp, đồng thời đưa ra các khuyến nghị để giảm thiểu \'họa\' không đáng có.','<h2>AI Tư Vấn Pháp Lý: Lợi Bất Cập Hại Hay \'Rước Họa Vào Thân\'?</h2><p>Sự bùng nổ của Trí tuệ Nhân tạo (AI) đã và đang tạo ra những thay đổi sâu rộng trong mọi lĩnh vực đời sống, bao gồm cả ngành pháp lý. Từ việc phân tích hợp đồng, nghiên cứu án lệ đến dự đoán kết quả vụ kiện, AI hứa hẹn mang lại hiệu quả vượt trội. Tuy nhiên, việc tin tưởng mù quáng vào các công cụ AI để giải quyết các vấn đề pháp lý cá nhân hoặc doanh nghiệp có thể tiềm ẩn những \"rủi ro số\" không ngờ tới, thậm chí là \"rước họa vào thân\".</p><h2>1. Sự Hấp Dẫn Nguy Hiểm của AI trong Lĩnh vực Pháp Lý</h2><p>AI được quảng cáo như một giải pháp thần kỳ: nhanh chóng, tiết kiệm chi phí và luôn sẵn sàng. Nó có thể tra cứu hàng ngàn văn bản luật, án lệ chỉ trong vài giây, điều mà một luật sư con người phải mất hàng giờ, thậm chí hàng ngày. Điều này tạo nên sức hút lớn, đặc biệt đối với những người có nhu cầu pháp lý cơ bản hoặc những doanh nghiệp muốn tối ưu hóa chi phí. Tuy nhiên, đằng sau lớp vỏ tiện lợi đó là những mối nguy hiểm tiềm tàng, mà không phải ai cũng nhận thức được.</p><h2>2. Những \"Lỗ Hổng Chết Người\" khi tin vào AI vô điều kiện</h2><ul><li><strong>Thiếu Khả Năng Thấu Hiểu Bối Cảnh và Tinh Tế Cảm Xúc:</strong> Pháp luật không chỉ là các điều khoản khô khan mà còn liên quan đến bối cảnh thực tế, ý định của các bên, yếu tố văn hóa, xã hội và thậm chí là cảm xúc. AI, dù tiên tiến đến đâu, cũng chỉ là một hệ thống dựa trên thuật toán và dữ liệu. Nó không thể thấu hiểu sự phức tạp của tình huống con người, những ngụ ý trong lời nói, hay những tác động tâm lý của một quyết định pháp lý. Một lời khuyên thiếu đi sự nhạy cảm này có thể dẫn đến hậu quả nghiêm trọng.</li><li><strong>Hạn Chế về Phạm Vi Dữ Liệu và Khả năng Cập Nhật:</strong> Các hệ thống AI được huấn luyện dựa trên một kho dữ liệu có sẵn. Nếu dữ liệu này không đầy đủ, không đa dạng, hoặc không được cập nhật kịp thời với các luật mới, án lệ mới nhất, AI có thể đưa ra lời khuyên lỗi thời, thiếu chính xác. Trong một môi trường pháp lý thay đổi liên tục như Việt Nam và thế giới, đây là một rủi ro cực kỳ lớn.</li><li><strong>Vấn Đề Trách Nhiệm Pháp Lý:</strong> Khi một luật sư đưa ra lời khuyên sai, khách hàng có thể kiện luật sư đó về lỗi nghề nghiệp. Nhưng nếu một hệ thống AI đưa ra lời khuyên sai, ai sẽ là người chịu trách nhiệm? Nhà phát triển? Nhà cung cấp dịch vụ? Hay người dùng? Khung pháp lý hiện tại chưa rõ ràng về vấn đề này, khiến người dùng đối mặt với tình trạng \"tiền mất tật mang\" mà không biết tìm ai để đòi lại công bằng.</li><li><strong>Thiếu Khả Năng Đàm Phán và Xây Dựng Chiến Lược:</strong> Nhiều vấn đề pháp lý không thể giải quyết chỉ bằng cách áp dụng điều luật. Chúng đòi hỏi kỹ năng đàm phán, thuyết phục, xây dựng chiến lược pháp lý phù hợp với từng giai đoạn và từng đối tác. AI hiện tại không thể thay thế được trí tuệ cảm xúc, kinh nghiệm và khả năng phán đoán chiến lược của một luật sư thực thụ.</li><li><strong>Rủi ro Bảo Mật Thông Tin và Lộ Dữ liệu:</strong> Việc cung cấp thông tin cá nhân nhạy cảm hoặc bí mật kinh doanh cho các nền tảng AI ẩn chứa nguy cơ về bảo mật. Dữ liệu có thể bị rò rỉ, bị sử dụng sai mục đích hoặc trở thành mục tiêu của các cuộc tấn công mạng, gây thiệt hại nghiêm trọng về danh tiếng và tài chính cho cá nhân, doanh nghiệp.</li></ul><h2>3. Bảo Vệ Bản Thân và Doanh Nghiệp Trước \"Bẫy\" AI</h2><p>Để tận dụng những lợi ích của AI mà vẫn bảo vệ mình khỏi những rủi ro pháp lý, hãy tuân thủ các nguyên tắc sau:</p><ul><li><strong>Coi AI là Công cụ Hỗ Trợ, Không Phải Giải Pháp Cuối Cùng:</strong> Hãy sử dụng AI để nghiên cứu ban đầu, tổng hợp thông tin, hoặc phác thảo văn bản. Tuyệt đối không để AI đưa ra quyết định pháp lý quan trọng thay cho bạn.</li><li><strong>Luôn Tìm Kiếm Ý Kiến Pháp Lý Từ Chuyên Gia Con Người:</strong> Đối với bất kỳ vấn đề pháp lý nào có tính chất quan trọng, phức tạp hoặc tiềm ẩn rủi ro cao, hãy tham vấn luật sư hoặc chuyên gia pháp lý có kinh nghiệm. Họ sẽ cung cấp cái nhìn toàn diện, cá nhân hóa và chịu trách nhiệm về lời khuyên của mình.</li><li><strong>Kiểm Tra Chéo và Đánh Giá Thông Tin:</strong> Nếu bạn sử dụng AI để tìm kiếm thông tin, hãy luôn kiểm tra chéo các nguồn tin và đánh giá độ tin cậy của chúng. Đừng chấp nhận mọi thứ AI nói là đúng.</li><li><strong>Đọc Kỹ Điều Khoản Sử Dụng:</strong> Trước khi sử dụng bất kỳ dịch vụ AI Legal-Tech nào, hãy đọc kỹ các điều khoản sử dụng, đặc biệt là các quy định về trách nhiệm pháp lý và bảo mật dữ liệu.</li><li><strong>Ưu Tiên Bảo Mật Thông Tin:</strong> Tránh đưa các thông tin quá nhạy cảm hoặc bí mật kinh doanh lên các nền tảng AI công cộng hoặc không rõ nguồn gốc.</li></ul><h2>Kết Luận</h2><p>AI là một công cụ mạnh mẽ, nhưng nó không phải là giải pháp vạn năng cho mọi vấn đề pháp lý. Trong khi công nghệ này tiếp tục phát triển, vai trò của luật sư và chuyên gia pháp lý vẫn là không thể thay thế. Sự kết hợp giữa năng lực phân tích dữ liệu của AI và trí tuệ, kinh nghiệm, đạo đức nghề nghiệp của con người mới là chìa khóa để giải quyết các thách thức pháp lý trong kỷ nguyên số. Đừng để sự tiện lợi nhất thời che mờ những rủi ro tiềm ẩn, khiến bạn \"rước họa vào thân\".</p>','PUBLISHED',1,'2026-04-05 08:03:08.908',NULL,'Verified by AI','1.0.0','2026-04-05 08:03:08.962','2026-04-05 08:03:08.962',NULL,NULL);
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
INSERT INTO `chat_messages` VALUES ('013c0a56-f235-424d-965a-1bb6f8c3d2e9','846a123b-4127-443c-8d4c-96bcce51d4ca','user','bạn là AI gì',NULL,'2026-04-01 13:02:44.017'),('01bb7159-d1f4-4cfe-8320-8bb98b214155','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','điều 1 trong luật hình sự',NULL,'2026-04-01 03:00:51.685'),('02434efd-19c7-41a6-a72e-75367ec68d61','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều 1 bộ luật dân sự',NULL,'2026-04-02 01:26:07.512'),('027bf6fe-b607-4d3b-b213-dac80ec3dc8b','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Tôi chở theo hai người bạn trên xe máy thì có bị phạt không? Một người 20 tuổi và một em bé 10 tuổi',NULL,'2026-04-05 02:44:17.016'),('041bd725-7544-4098-934c-458430593259','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','xin chào',NULL,'2026-04-01 03:00:33.647'),('053a8328-b8d3-4575-b58a-5a1bbb26fe6f','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Điều 1 của Bộ luật Dân sự (năm 2015) quy định về phạm vi điều chỉnh của Bộ luật này. Cụ thể, Bộ luật Dân sự có các nội dung chính như sau:\n\n*   **Phạm vi điều chỉnh:** Quy định về địa vị pháp lý, các chuẩn mực pháp lý về cách ứng xử của cá nhân, pháp nhân trong xã hội.\n*   **Các loại quyền và nghĩa vụ:** Điều chỉnh các quyền, nghĩa vụ liên quan đến nhân thân và tài sản.\n*   **Các quan hệ dân sự cụ thể:** Áp dụng cho các quan hệ dân sự nói chung, bao gồm quan hệ hôn nhân và gia đình, kinh doanh, thương mại, lao động.\n*   **Mục đích:** Nhằm bảo vệ quyền, lợi ích hợp pháp của cá nhân, pháp nhân, cũng như lợi ích của Nhà nước và lợi ích công cộng. Qua đó, Bộ luật Dân sự góp phần bảo đảm sự ổn định và phát triển của các quan hệ dân sự.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Dựa trên kiến thức pháp luật tổng hợp (Điều 1 Bộ luật Dân sự 2015)',NULL,'2026-04-02 01:26:13.738'),('066408fd-17e1-46f8-a1e6-5a895b2423e9','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','điều 3',NULL,'2026-04-01 03:13:02.363'),('0acab311-ef18-4928-97b5-c6626295e3a0','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Tôi tự ý ký hợp đồng cho vay lãi 15%/tháng có sao không?',NULL,'2026-04-05 03:27:27.662'),('12e5ee49-cf0d-41f7-9125-0730556e20b7','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Điều 1 của Bộ luật Dân sự 2015 quy định về phạm vi điều chỉnh của Bộ luật này. Cụ thể, Bộ luật Dân sự điều chỉnh các quan hệ nhân thân và quan hệ tài sản, bao gồm:\n\n*   **Quan hệ nhân thân:** Là các quan hệ liên quan đến các giá trị tinh thần, không thể định giá bằng tiền như tên gọi, giới tính, quyền được bảo vệ danh dự, nhân phẩm, uy tín...\n*   **Quan hệ tài sản:** Là các quan hệ liên quan đến việc sở hữu, sử dụng, định đoạt tài sản.\n\nMục đích của việc điều chỉnh các quan hệ này là nhằm xác lập quyền và nghĩa vụ của các chủ thể trong quan hệ dân sự, bảo vệ quyền và lợi ích hợp pháp của cá nhân, pháp nhân, các chủ thể khác; góp phần ổn định trật tự xã hội và phát triển kinh tế. (Theo kiến thức tổng hợp)\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Bộ luật Dân sự 2015',NULL,'2026-04-02 01:06:53.197'),('13c40101-1d59-4b77-b6b6-45c171e4ed5c','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 2 của luật dân sự',NULL,'2026-04-05 03:09:32.406'),('162c99d4-0485-4811-8349-2f277412f04d','27e34179-4dce-4914-b4d9-a508ff782c96','assistant','Vui lòng trình bày vấn đề pháp lý bạn muốn được tư vấn để tôi có thể hỗ trợ.',NULL,'2026-04-05 02:09:27.391'),('1704c2de-af71-4814-9cba-053fdeeb6dd4','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Chào bạn,\n\nĐiều 3 của Bộ luật Dân sự 2015 quy định về **Các nguyên tắc cơ bản của pháp luật dân sự**. Đây là những nguyên tắc nền tảng, kim chỉ nam cho mọi hoạt động liên quan đến quan hệ dân sự.\n\nPháp luật dân sự được xây dựng và áp dụng dựa trên các nguyên tắc quan trọng sau:\n\n*   **Bình đẳng và không phân biệt đối xử:** Tất cả mọi người, dù là cá nhân hay tổ chức (pháp nhân), đều có địa vị pháp lý như nhau. Không ai được phép phân biệt đối xử với người khác vì bất kỳ lý do gì, và mọi người đều được pháp luật bảo vệ công bằng về các quyền liên quan đến bản thân và tài sản của mình.\n*   **Tự do, tự nguyện thỏa thuận:** Cá nhân và pháp nhân có quyền tự do đưa ra quyết định, cam kết và thỏa thuận với nhau về các quyền và nghĩa vụ dân sự của mình. Điều này có nghĩa là bạn được phép làm những gì pháp luật không cấm, miễn là không vi phạm đạo đức xã hội và các thỏa thuận đó có giá trị pháp lý ràng buộc các bên.\n*   **Thiện chí và trung thực:** Khi xác lập, thực hiện hay chấm dứt các quyền và nghĩa vụ dân sự, các bên phải luôn hành xử một cách trung thực, có ý tốt, không lừa dối hay gây hại cho người khác.\n*   **Không xâm phạm lợi ích hợp pháp:** Mọi hành vi xác lập, thực hiện, chấm dứt quyền và nghĩa vụ dân sự đều không được phép gây tổn hại đến lợi ích chung của quốc gia, dân tộc, cộng đồng, cũng như quyền và lợi ích hợp pháp của những người khác.\n*   **Tự chịu trách nhiệm:** Mỗi cá nhân, pháp nhân phải tự chịu trách nhiệm về việc mình không thực hiện hoặc thực hiện không đúng các nghĩa vụ dân sự mà mình đã cam kết.\n\n**Căn cứ pháp lý:**\n\n*   Điều 3, Bộ luật Dân sự 2015 số 91/2015/QH13 (áp dụng từ 01/01/2025).\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 03:15:43.843'),('1937dc83-d7a5-4828-a313-74204e3f0140','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Bạn vui lòng cho biết vấn đề pháp lý mà bạn cần tư vấn. Tôi sẵn lòng giải đáp.',NULL,'2026-04-02 01:06:37.182'),('1a0fc167-ff87-4017-8e6a-302a6cc09cd7','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Việc bạn tự ý ký hợp đồng cho vay với lãi suất 15%/tháng là vi phạm quy định của pháp luật về giới hạn lãi suất.\n\nDưới đây là giải thích chi tiết:\n*   **Thỏa thuận lãi suất:** Pháp luật cho phép các bên tự thỏa thuận về lãi suất vay.\n*   **Giới hạn lãi suất:** Tuy nhiên, mức lãi suất thỏa thuận này không được vượt quá 20% mỗi năm (20%/năm) trên khoản tiền vay, trừ khi có luật khác quy định riêng.\n*   **Tính toán lãi suất của bạn:** Lãi suất 15% mỗi tháng tương đương với 15% x 12 tháng = 180% mỗi năm.\n*   **Vi phạm giới hạn:** Mức 180% mỗi năm này cao hơn rất nhiều so với giới hạn 20% mỗi năm mà pháp luật quy định.\n*   **Hậu quả pháp lý:** Phần lãi suất vượt quá giới hạn (tức là phần trên 20%/năm) sẽ không có hiệu lực pháp luật. Điều này có nghĩa là, nếu có tranh chấp, tòa án sẽ chỉ công nhận và bảo vệ mức lãi suất tối đa là 20%/năm.\n\n---\n📌 Điều 468. Lãi suất - Bộ luật dân sự 2015 số 91/2015/QH13 áp dụng 2025\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 03:27:34.817'),('1a4a281a-9772-493a-8444-c496dc0a393a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Bạn yêu cầu cung cấp nội dung Điều 1 của Bộ luật Dân sự Việt Nam hiện hành.\n\nNội dung chi tiết của Điều 1 Bộ luật Dân sự 2015 như sau:\n\n*   **Điều 1. Phạm vi điều chỉnh**\n    *   Bộ luật Dân sự quy định địa vị pháp lý, chuẩn mực pháp lý về cách ứng xử của cá nhân, pháp nhân; quyền, nghĩa vụ về nhân thân và tài sản trong các quan hệ dân sự, hôn nhân và gia đình, kinh doanh, thương mại, lao động (sau đây gọi chung là quan hệ dân sự).\n    *   Bộ luật này bảo vệ quyền, lợi ích hợp pháp của cá nhân, pháp nhân, lợi ích của Nhà nước, lợi ích công cộng; bảo đảm sự ổn định, phát triển của các quan hệ dân sự.\n\n**Căn cứ pháp lý:** Dựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:51:00.372'),('1c324863-97a8-4d42-a513-f5fd193d012d','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Điều 1 luật giao thông thường bộ',NULL,'2026-04-05 02:15:01.887'),('1d79f864-e8e0-4772-8b0e-f272c5acdb10','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy chỉ được chở một người, trừ những trường hợp sau đây thì được chở tối đa hai người:\na) Chở người bệnh đi cấp cứu;\nb) Áp giải người có hành vi vi phạm pháp luật;\nc) Trẻ em dưới 14 tuổi.',NULL,'2026-04-05 02:43:47.427'),('1e28d369-8bc0-48f6-8a59-bd4e1d79097a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Vui lòng trình bày câu hỏi pháp lý cụ thể của bạn để tôi có thể hỗ trợ giải đáp.',NULL,'2026-04-05 02:14:50.147'),('20bc0505-aab0-422c-a0bf-1aeeb38e900a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Sai.\n\nDựa trên quy định hiện hành, người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy được chở tối đa hai người trong các trường hợp sau:\n\n*   Chở người bệnh đi cấp cứu.\n*   Áp giải người có hành vi vi phạm pháp luật.\n*   Chở trẻ em dưới 16 tuổi (không phải 14 tuổi như câu hỏi đã nêu).\n\nCăn cứ pháp lý:\nDựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:43:56.628'),('2715bd47-dd44-4701-8d51-c3fd39bcaab6','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều 3 của luật dân sự',NULL,'2026-04-02 01:17:25.211'),('2738b26f-6463-4135-a403-6e4bec39577f','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Anh A và chị B tự nguyện ký kết một \'Hợp đồng vay tài sản\'. Trong đó, anh A đồng ý cho chị B vay 100 triệu đồng với lãi suất là 15%/tháng (tức 180%/năm). Chị B hoàn toàn đồng ý và cam kết trả đủ. Theo quy định của Bộ luật Dân sự 2015, thỏa thuận về lãi suất này có hiệu lực pháp luật hay không?',NULL,'2026-04-05 03:22:03.059'),('29b2c5d1-634b-4911-a8ae-e5ccfac9350d','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 1 của luật dân sự',NULL,'2026-04-05 02:57:59.540'),('38b052bc-b0e8-4ab3-8448-0a3dc3f6048b','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Anh A và chị B tự nguyện ký kết một \'Hợp đồng vay tài sản\'. Trong đó, anh A đồng ý cho chị B vay 100 triệu đồng với lãi suất là 15%/tháng (tức 180%/năm). Chị B hoàn toàn đồng ý và cam kết trả đủ. Theo quy định của Bộ luật Dân sự 2015, thỏa thuận về lãi suất này có hiệu lực pháp luật hay không?',NULL,'2026-04-05 03:23:18.393'),('40857a0e-cdf1-44a3-a64f-dc8ad155e807','27e34179-4dce-4914-b4d9-a508ff782c96','user','XIn Chao',NULL,'2026-04-05 02:09:16.534'),('434cd984-6109-4168-b1cc-1c7c25be1fe3','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 1 luật dân sự',NULL,'2026-04-05 02:49:16.158'),('456ece03-7d01-4b51-9f2c-e03e1b69523b','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Với vai trò luật sư tư vấn, tôi sẵn lòng hỗ trợ giải đáp các thắc mắc pháp luật của bạn một cách rõ ràng và chính xác. Mời bạn đặt câu hỏi.',NULL,'2026-04-01 03:00:39.358'),('463c8d51-419e-4310-8ef1-93b8b861a918','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Xin chào bạn',NULL,'2026-04-05 02:13:59.172'),('483b9f8b-cb70-4498-b527-0e48b6ac572a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','xin chào',NULL,'2026-04-05 02:37:45.785'),('497166ea-0d95-4f40-9fe4-455346a44847','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Anh A và chị B tự nguyện ký kết một \'Hợp đồng vay tài sản\'. Trong đó, anh A đồng ý cho chị B vay 100 triệu đồng với lãi suất là 15%/tháng (tức 180%/năm). Chị B hoàn toàn đồng ý và cam kết trả đủ. Theo quy định của Bộ luật Dân sự 2015, thỏa thuận về lãi suất này có hiệu lực pháp luật hay không?',NULL,'2026-04-05 03:25:44.235'),('4dec3e2d-c040-4b71-b522-21ddd234ef39','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Vui lòng đặt câu hỏi pháp luật của bạn để tôi có thể hỗ trợ.\n\n---\n📌 **Căn cứ pháp lý tham khảo:** Dựa trên kiến thức pháp luật tổng hợp',NULL,'2026-04-05 02:37:52.588'),('5065551a-f8c4-4b41-94cd-d24913a34ba9','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn yêu cầu là về Điều 1 của Bộ luật Dân sự.\n\nĐiều 1 của Bộ luật Dân sự quy định về phạm vi điều chỉnh của Bộ luật này, cụ thể như sau:\n\n*   Bộ luật Dân sự quy định về địa vị pháp lý và các quy tắc ứng xử của cá nhân, tổ chức.\n*   Nó điều chỉnh các quyền và nghĩa vụ liên quan đến con người (nhân thân) và tài sản trong nhiều loại quan hệ.\n*   Các quan hệ này bao gồm dân sự, hôn nhân gia đình, kinh doanh, thương mại, lao động, đất đai và các quan hệ khác.\n*   Những quan hệ này đều dựa trên nguyên tắc bình đẳng, tự do ý chí, độc lập về tài sản và tự chịu trách nhiệm.\n\n**Căn cứ pháp lý:**\nDựa trên kiến thức pháp luật tổng hợp (Điều 1 Bộ luật Dân sự 2015).\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:58:05.887'),('5368857c-186e-487e-8bc9-fafd3cb03717','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 1 của luật dân sự',NULL,'2026-04-05 02:46:59.286'),('59350b41-6a34-4a38-aec4-777926b45a98','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Vui lòng cho biết vấn đề pháp lý bạn cần được tư vấn để tôi có thể hỗ trợ bạn một cách tốt nhất.',NULL,'2026-04-01 13:02:23.054'),('5a136908-9b63-49c5-99b3-33ed456a9ac3','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 1 luật dân sự',NULL,'2026-04-05 02:49:44.020'),('5ab15f32-5f87-4549-b5d1-383762cda0ef','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Điều 19. Năng lực hành vi dân sự của cá nhân',NULL,'2026-04-05 02:52:30.392'),('5d07db27-3b44-456d-bac8-835ebcb9f618','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 3 của luật dân sự nói về gì v ?',NULL,'2026-04-05 03:15:36.596'),('5e7cfd94-96be-4fa7-98d7-93c65dfef01f','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 2 của luật dân sự',NULL,'2026-04-05 02:58:53.292'),('615e8680-2c45-40de-87c7-cd7c00c716ee','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin về Điều 2 của Bộ luật Dân sự 2015 không có trong dữ liệu được cung cấp.\n\n*   Dữ liệu bạn yêu cầu về Điều 2 của Bộ luật Dân sự 2015 hiện không có trong nguồn thông tin của tôi.\n\n**Căn cứ pháp lý:**\nDựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:58:42.741'),('63f5216c-564a-41af-8741-857818008bff','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Điều 2 của Luật tố tụng hành chính 2015 quy định về đối tượng áp dụng và hiệu lực của Luật này như sau:\n\n1.  **Phạm vi áp dụng trong lãnh thổ Việt Nam:** Luật tố tụng hành chính được áp dụng cho tất cả các hoạt động tố tụng hành chính diễn ra trên mọi vùng lãnh thổ của Việt Nam, bao gồm đất liền, hải đảo, vùng biển và vùng trời.\n2.  **Áp dụng ngoài lãnh thổ Việt Nam:** Luật này cũng được áp dụng cho các hoạt động tố tụng hành chính do cơ quan đại diện của Việt Nam (như Đại sứ quán, Lãnh sự quán) tiến hành ở nước ngoài.\n3.  **Vụ án có yếu tố nước ngoài:** Đối với các vụ án hành chính có yếu tố nước ngoài (liên quan đến cá nhân, tổ chức nước ngoài hoặc ở nước ngoài), Luật tố tụng hành chính vẫn được áp dụng. Tuy nhiên, nếu Việt Nam là thành viên của điều ước quốc tế mà điều ước đó có quy định khác, thì sẽ ưu tiên áp dụng quy định của điều ước quốc tế đó.\n4.  **Giải quyết qua con đường ngoại giao:** Trong trường hợp cơ quan, tổ chức, cá nhân nước ngoài, hoặc tổ chức quốc tế được hưởng các quyền ưu đãi, miễn trừ ngoại giao hoặc lãnh sự theo pháp luật Việt Nam hoặc điều ước quốc tế, thì những vụ án hành chính liên quan đến họ sẽ được giải quyết thông qua con đường ngoại giao.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 2, Luật tố tụng hành chính 2015 số 93/2015/QH13',NULL,'2026-04-02 01:14:38.003'),('65df92d4-0ce9-420e-9c2f-edf86ea33874','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn cần tìm về Điều 1 của Luật Dân sự không có trong các nguồn dữ liệu pháp luật được cung cấp. Các dữ liệu hiện có đều liên quan đến Luật Đường bộ 2024.\n\nCăn cứ pháp lý:\n* Dựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:48:30.299'),('67d479f8-4b75-4d2b-af2c-105663d863f6','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Tôi là một trợ lý trí tuệ nhân tạo (AI), được thiết kế và đào tạo để cung cấp thông tin và tư vấn pháp luật một cách chuyên nghiệp, rõ ràng và chính xác. Vai trò của tôi là giúp bạn hiểu rõ hơn về các quy định pháp luật dựa trên những dữ liệu pháp luật được cung cấp.',NULL,'2026-04-01 13:02:50.132'),('6f897aee-292c-4318-8e3b-5aa149d48981','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Điều 19. Năng lực hành vi dân sự của cá nhân',NULL,'2026-04-05 02:52:20.129'),('744fce5a-ed06-49f2-af67-1a6465a6e24b','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 1 luật dân sự',NULL,'2026-04-05 02:48:21.098'),('75224b59-eb3e-48cd-bb50-ff20fa05dbc4','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Điều 1 của Bộ luật Dân sự (ví dụ Bộ luật Dân sự 2015) quy định về phạm vi điều chỉnh của Bộ luật này.\n\nCụ thể, Điều này làm rõ rằng Bộ luật Dân sự quy định các vấn đề sau:\n*   Địa vị pháp lý của cá nhân và các tổ chức (pháp nhân).\n*   Những chuẩn mực về cách các cá nhân, tổ chức ứng xử trong các mối quan hệ dân sự.\n*   Các quyền và nghĩa vụ liên quan đến nhân thân và tài sản trong các quan hệ dân sự, hôn nhân gia đình, kinh doanh thương mại, và lao động (trừ khi có luật khác quy định riêng).\n*   Các quyền và nghĩa vụ khi chiếm hữu, sử dụng, hoặc định đoạt tài sản.\n*   Các quyền và nghĩa vụ bồi thường thiệt hại khi không có hợp đồng.\n*   Các mối quan hệ khác mà pháp luật quy định.\n\n**Căn cứ pháp lý**\nDựa trên kiến thức pháp luật tổng hợp về Bộ luật Dân sự.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:49:51.774'),('7534dfaa-96f0-4491-9fa8-77ade2e13f6f','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Khi bạn hỏi về \"điều luật 1\", có thể bạn đang muốn tìm hiểu về điều 1 của các bộ luật khác nhau. Dựa trên các nguồn dữ liệu được cung cấp, có hai điều 1 quan trọng mà tôi có thể giải thích cho bạn:\n\n**1. Phạm vi điều chỉnh của Bộ luật Dân sự 2015**\n\nĐiều 1 của Bộ luật Dân sự 2015 quy định về những vấn đề mà bộ luật này giải quyết. Cụ thể:\n\n*   **Địa vị pháp lý và cách ứng xử:** Bộ luật quy định vị thế pháp lý (ai là chủ thể pháp luật) và các quy tắc ứng xử chuẩn mực của cá nhân (con người) và pháp nhân (tổ chức có tư cách pháp lý như công ty, doanh nghiệp).\n*   **Quyền, nghĩa vụ về nhân thân và tài sản:** Bộ luật điều chỉnh các quyền và nghĩa vụ liên quan đến thân phận của mỗi người (như quyền có họ, tên, quyền về danh dự, nhân phẩm) và các quyền, nghĩa vụ liên quan đến tài sản (như quyền sở hữu, quyền sử dụng, quyền thừa kế).\n*   **Quan hệ dân sự:** Những quyền và nghĩa vụ này phát sinh trong các mối quan hệ được hình thành dựa trên các nguyên tắc cơ bản của pháp luật dân sự là:\n    *   **Bình đẳng:** Các bên trong quan hệ dân sự đều có vị thế ngang nhau, không ai được áp đặt ý chí lên người khác.\n    *   **Tự do ý chí:** Các bên được tự nguyện bày tỏ và thực hiện ý muốn của mình, miễn là không vi phạm pháp luật.\n    *   **Độc lập về tài sản:** Mỗi cá nhân, pháp nhân có tài sản riêng của mình và tự chịu trách nhiệm với tài sản đó.\n    *   **Tự chịu trách nhiệm:** Mỗi bên phải tự chịu hậu quả từ hành vi của mình.\n\n---\n**2. Phạm vi điều chỉnh và nhiệm vụ của Luật Tố tụng Hành chính 2015**\n\nĐiều 1 của Luật Tố tụng Hành chính 2015 chỉ rõ những nội dung mà luật này điều chỉnh và mục đích của nó. Cụ thể:\n\n*   **Phạm vi điều chỉnh:**\n    *   **Nguyên tắc cơ bản:** Đặt ra các nguyên tắc xuyên suốt trong quá trình giải quyết các vụ án hành chính (ví dụ: nguyên tắc công khai, khách quan).\n    *   **Nhiệm vụ, quyền hạn, trách nhiệm:** Quy định rõ vai trò, quyền và trách nhiệm của các cơ quan tiến hành tố tụng (Tòa án, Viện kiểm sát) và những người làm việc trong các cơ quan đó (Thẩm phán, Kiểm sát viên).\n    *   **Quyền và nghĩa vụ của người tham gia tố tụng:** Xác định quyền và trách nhiệm của các bên liên quan đến vụ án (như người khởi kiện, người bị kiện, người có quyền lợi, nghĩa vụ liên quan).\n    *   **Trình tự, thủ tục:** Hướng dẫn cụ thể các bước từ việc nộp đơn khởi kiện, giải quyết vụ án hành chính cho đến thi hành án hành chính và xử lý các khiếu nại, tố cáo trong quá trình tố tụng.\n*   **Nhiệm vụ của Luật:**\n    *   Bảo vệ công lý, quyền con người, quyền công dân và chế độ xã hội chủ nghĩa.\n    *   Bảo vệ lợi ích của Nhà nước, cũng như quyền và lợi ích hợp pháp của cơ quan, tổ chức, cá nhân.\n    *   Góp phần giáo dục mọi người chấp hành pháp luật.\n    *   Đảm bảo hệ thống hành chính của quốc gia hoạt động ổn định, thông suốt và có hiệu lực.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Bộ luật Dân sự 2015 số 91/2015/QH13\n- Điều 1, Luật Tố tụng Hành chính 2015 số 93/2015/QH13',NULL,'2026-04-02 04:37:43.342'),('7acb4034-3f69-4eb8-8d09-f9c4f95fe6d0','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Điều 2 của Bộ luật Dân sự 2015 quy định về **các nguyên tắc cơ bản của pháp luật dân sự**. Cụ thể, pháp luật dân sự Việt Nam được xây dựng và áp dụng dựa trên các nguyên tắc sau:\n\n*   Mọi cá nhân, pháp nhân đều bình đẳng, không được phân biệt đối xử trong quan hệ dân sự.\n*   Cá nhân, pháp nhân được tự do, tự nguyện cam kết, thỏa thuận, miễn là các cam kết, thỏa thuận này không vi phạm điều cấm của luật và không trái đạo đức xã hội.\n*   Cá nhân, pháp nhân phải xác lập, thực hiện, chấm dứt quyền, nghĩa vụ dân sự của mình một cách thiện chí, trung thực.\n*   Việc xác lập, thực hiện, chấm dứt quyền, nghĩa vụ dân sự không được xâm phạm đến lợi ích quốc gia, dân tộc, lợi ích công cộng, quyền và lợi ích hợp pháp của người khác.\n*   Cá nhân, pháp nhân phải tự chịu trách nhiệm về việc không thực hiện hoặc thực hiện không đúng nghĩa vụ dân sự của mình.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 2, Bộ luật Dân sự 2015 (Theo kiến thức tổng hợp)',NULL,'2026-04-02 01:26:35.204'),('7d02101e-b536-4904-b151-224ac8320ca0','27e34179-4dce-4914-b4d9-a508ff782c96','user','điều 1 bộ luật dân sự',NULL,'2026-04-02 04:40:44.004'),('7d43c6c8-01a5-4a12-82d7-dbf8cb4ec4b2','846a123b-4127-443c-8d4c-96bcce51d4ca','user','hello',NULL,'2026-04-01 13:02:17.679'),('7fd96469-9568-4974-9336-a59e2ed7cdd8','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','user','Điều 2',NULL,'2026-04-01 03:12:48.115'),('839d2a90-91c9-4db8-b896-731edce945ee','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 1 của luật dân sự',NULL,'2026-04-05 02:56:10.098'),('8a59fae1-672a-4e76-b184-2a4e4fe558ca','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Bộ luật dân sự 2015 số 91/2015/QH13 áp dụng 2025',NULL,'2026-04-05 02:51:17.197'),('8e724533-a28a-4bf8-9e20-f6c67ecaa185','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Điều 19. Năng lực hành vi dân sự của cá nhân',NULL,'2026-04-05 02:52:34.807'),('95f6cf43-9f44-4ea9-8680-a1204f6a613e','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 3 của Luật Tố tụng hành chính 2015 giải thích các thuật ngữ quan trọng được sử dụng trong Luật, cụ thể như sau:\n\n*   **Quyết định hành chính:** Là văn bản do cơ quan nhà nước hoặc người có thẩm quyền ban hành, quyết định một vấn đề cụ thể trong quản lý nhà nước và chỉ áp dụng một lần cho một hoặc một số đối tượng cụ thể.\n*   **Quyết định hành chính bị kiện:** Là quyết định hành chính nêu trên mà nội dung của nó làm phát sinh, thay đổi, hạn chế, chấm dứt quyền, lợi ích hợp pháp của cơ quan, tổ chức, cá nhân hoặc tạo ra nghĩa vụ, ảnh hưởng đến quyền, lợi ích của họ.\n*   **Hành vi hành chính:** Là hành động hoặc việc không hành động của cơ quan nhà nước, người có thẩm quyền trong cơ quan nhà nước hoặc cơ quan, tổ chức được giao quản lý hành chính, khi thực hiện nhiệm vụ, công vụ theo quy định pháp luật.\n*   **Hành vi hành chính bị kiện:** Là hành vi hành chính nêu trên mà hành vi đó làm ảnh hưởng đến việc thực hiện quyền, lợi ích hợp pháp của cơ quan, tổ chức, cá nhân.\n*   **Quyết định kỷ luật buộc thôi việc:** Là văn bản do người đứng đầu cơ quan, tổ chức ban hành để áp dụng hình thức kỷ luật buộc công chức thuộc quyền quản lý của mình phải nghỉ việc.\n*   **Quyết định hành chính, hành vi hành chính mang tính nội bộ:** Là những quyết định, hành vi chỉ đạo, điều hành công việc nội bộ của cơ quan, tổ chức, ví dụ như triển khai kế hoạch, quản lý cán bộ, tài chính, tài sản, kiểm tra, thanh tra việc thực hiện nhiệm vụ của cán bộ, công chức thuộc quyền.\n*   **Đương sự:** Gồm có người khởi kiện (người nộp đơn kiện), người bị kiện (người bị kiện ra Tòa) và người có quyền lợi, nghĩa vụ liên quan.\n*   **Người khởi kiện:** Là cơ quan, tổ chức, cá nhân nộp đơn khởi kiện vụ án hành chính đối với các đối tượng bị kiện như quyết định hành chính, hành vi hành chính, quyết định kỷ luật buộc thôi việc, quyết định giải quyết khiếu nại về xử lý vụ việc cạnh tranh; hoặc danh sách cử tri.\n*   **Người bị kiện:** Là cơ quan, tổ chức, cá nhân đã ban hành quyết định hành chính, thực hiện hành vi hành chính, ban hành quyết định kỷ luật buộc thôi việc, quyết định giải quyết khiếu nại về xử lý vụ việc cạnh tranh hoặc danh sách cử tri bị khởi kiện.\n*   **Người có quyền lợi, nghĩa vụ liên quan:** Là cơ quan, tổ chức, cá nhân không phải người khởi kiện hay người bị kiện, nhưng vụ án hành chính có liên quan đến quyền lợi, nghĩa vụ của họ. Họ có thể tự đề nghị hoặc được đương sự khác đề nghị và Tòa án chấp nhận, hoặc được Tòa án đưa vào tham gia tố tụng.\n*   **Cơ quan, tổ chức:** Bao gồm nhiều loại hình như cơ quan nhà nước, các tổ chức chính trị, xã hội, kinh tế, đơn vị sự nghiệp, đơn vị lực lượng vũ trang và các tổ chức khác được thành lập, hoạt động theo pháp luật.\n*   **Vụ án phức tạp:** Là vụ án có nhiều người liên quan, có chứng cứ mâu thuẫn cần xác minh kỹ, hoặc có đương sự là người nước ngoài, người Việt Nam ở nước ngoài.\n*   **Trở ngại khách quan:** Là những tình huống khách quan khiến người có quyền, nghĩa vụ không thể biết hoặc không thể thực hiện quyền, nghĩa vụ của mình.\n*   **Sự kiện bất khả kháng:** Là sự kiện xảy ra một cách khách quan, không thể lường trước và không thể khắc phục được dù đã áp dụng mọi biện pháp.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 3, Luật tố tụng hành chính 2015 số 93/2015/QH13 áp dụng 2025',NULL,'2026-04-01 03:13:08.911'),('9770203f-1215-42a4-88ad-c5cbbe475fe5','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Bạn muốn tìm hiểu về khái niệm Năng lực hành vi dân sự của cá nhân.\n\n*   Năng lực hành vi dân sự là khả năng của một người tự mình thực hiện các giao dịch dân sự (như ký hợp đồng, mua bán tài sản) và tự chịu trách nhiệm về hành vi của mình.\n*   Thông thường, một người từ đủ 18 tuổi trở lên sẽ có năng lực hành vi dân sự đầy đủ.\n*   Đối với người chưa đủ 18 tuổi hoặc người có vấn đề về nhận thức, pháp luật có những quy định riêng về mức độ năng lực hành vi dân sự.\n*   Việc xác định năng lực hành vi dân sự rất quan trọng để đảm bảo các giao dịch dân sự diễn ra hợp pháp và quyền lợi của các bên được bảo vệ.\n\n**Căn cứ pháp lý:**\nDựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:52:48.495'),('97e32319-3dc9-406b-8761-9c6449532fc1','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn hỏi không có trong dữ liệu được cung cấp.\n\nDữ liệu được cung cấp chỉ bao gồm các điều khoản từ Luật Đường bộ 2024, không có thông tin về Luật Dân sự.\n\nCăn cứ pháp lý:\n* Dựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:49:21.717'),('9c63bf10-8db4-46d0-b487-28932cdfa75b','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Chào bạn,\n\nThông tin bạn đưa ra cần lưu ý một chút: thỏa thuận về lãi suất 15%/tháng (tức 180%/năm) trong \"Hợp đồng vay tài sản\" giữa anh A và chị B **không có hiệu lực pháp luật đối với phần vượt quá mức giới hạn quy định của pháp luật**.\n\nDưới đây là giải thích chi tiết:\n\n*   **Giới hạn lãi suất theo luật:** Theo quy định của Bộ luật Dân sự, dù các bên có tự nguyện thỏa thuận về lãi suất đi chăng nữa, thì mức lãi suất này cũng không được vượt quá một giới hạn nhất định. Mức giới hạn hiện hành là 20% mỗi năm của khoản tiền vay.\n*   **So sánh với thỏa thuận của bạn:** Trong trường hợp của anh A và chị B, mức lãi suất thỏa thuận là 15% mỗi tháng, tương đương với 180% mỗi năm. Mức này cao hơn rất nhiều so với mức 20% mỗi năm mà pháp luật cho phép.\n*   **Hậu quả pháp lý:** Khi lãi suất thỏa thuận vượt quá mức giới hạn này, thì phần lãi suất vượt quá sẽ không có giá trị pháp lý và không được công nhận. Điều này có nghĩa là, chị B chỉ có nghĩa vụ trả lãi theo mức tối đa mà pháp luật cho phép (20%/năm), chứ không phải theo mức 180%/năm đã thỏa thuận.\n\n**Căn cứ pháp lý:**\n\n*   Khoản 1 Điều 468 Bộ luật Dân sự năm 2015 (Số 91/2015/QH13), [Nguồn 1] có quy định: \"Trường hợp các bên có thỏa thuận về lãi suất thì lãi suất theo thỏa thuận không được vượt quá 20%/năm của khoản tiền vay, trừ trường hợp luật khác có liên quan quy định khác. ... Trường hợp lãi suất theo thỏa thuận vượt quá lãi suất giới hạn được quy định tại khoản này thì mức lãi suất vượt quá không có hiệu lực.\"\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 03:25:55.123'),('a76125d9-b477-4747-9d8b-459ea9b972b0','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Bị phạt.\n\n*   Xe máy thông thường chỉ được phép chở thêm 1 người.\n*   Bạn đang chở thêm 2 người (một người 20 tuổi và một em bé 10 tuổi) trên xe máy.\n*   Việc chở thêm 2 người trên xe máy là vượt quá số người quy định.\n\n**Căn cứ pháp lý**\nDựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:44:23.110'),('a7b43a41-84e8-4659-b6c9-6683da7af17d','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Chào bạn,\n\nThông tin bạn đưa ra liên quan đến Điều 2 của Bộ luật Dân sự 2015 là rất quan trọng để hiểu về các quyền dân sự cơ bản.\n\nDưới đây là nội dung chi tiết của Điều 2 Bộ luật Dân sự 2015:\n\n*   **Công nhận và Bảo vệ quyền dân sự:** Ở Việt Nam, tất cả các quyền dân sự đều được nhà nước công nhận, tôn trọng, bảo vệ và đảm bảo thực hiện theo Hiến pháp và các quy định của pháp luật. Điều này có nghĩa là nhà nước cam kết bảo vệ những quyền lợi hợp pháp của cá nhân và tổ chức trong các mối quan hệ dân sự.\n*   **Hạn chế quyền dân sự:** Quyền dân sự chỉ có thể bị giới hạn trong những trường hợp thật sự cần thiết và phải được quy định rõ ràng trong luật. Những lý do cho việc hạn chế này thường liên quan đến:\n    *   Quốc phòng, an ninh quốc gia.\n    *   Trật tự, an toàn xã hội.\n    *   Đạo đức xã hội.\n    *   Sức khỏe của cộng đồng.\n\n**Căn cứ pháp lý:**\n*   Điều 2 Bộ luật Dân sự 2015 số 91/2015/QH13 áp dụng 2025.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 03:14:51.003'),('a839bfa6-0b52-4712-bb9b-759aab216903','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 2 của luật dân sự',NULL,'2026-04-05 03:14:42.816'),('ac53d76e-b750-47c8-9f5d-6050f380a37a','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Điều 3 của Bộ luật Dân sự 2015 quy định về các nguyên tắc cơ bản của pháp luật dân sự, cụ thể như sau:\n\n*   **Bình đẳng, không phân biệt đối xử:** Mọi cá nhân, tổ chức (pháp nhân) đều được đối xử như nhau trước pháp luật, không bị phân biệt về bất kỳ yếu tố nào. Pháp luật bảo vệ quyền nhân thân (liên quan đến bản thân con người như danh dự, nhân phẩm) và quyền tài sản (liên quan đến vật chất) của họ một cách bình đẳng.\n*   **Tự do, tự nguyện cam kết, thỏa thuận:** Cá nhân, tổ chức có quyền tự do trong việc thiết lập, thực hiện hoặc chấm dứt các quyền và nghĩa vụ dân sự của mình dựa trên sự tự nguyện thỏa thuận. Các thỏa thuận này phải hợp pháp (không vi phạm điều cấm của luật) và không trái với đạo đức xã hội thì sẽ có giá trị ràng buộc và được pháp luật công nhận.\n*   **Thiện chí, trung thực:** Các bên khi tham gia vào các giao dịch dân sự phải có thái độ thành thật, chân thành và minh bạch.\n*   **Không xâm phạm lợi ích hợp pháp của người khác:** Mọi hành vi xác lập, thực hiện hoặc chấm dứt quyền và nghĩa vụ dân sự không được làm ảnh hưởng đến lợi ích của quốc gia, cộng đồng và các quyền, lợi ích hợp pháp của người khác.\n*   **Chịu trách nhiệm bằng tài sản:** Cá nhân, tổ chức phải chịu trách nhiệm về việc không thực hiện hoặc thực hiện không đúng nghĩa vụ dân sự của mình bằng tài sản riêng, trừ khi pháp luật có quy định khác.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 3, Bộ luật Dân sự 2015 (Theo kiến thức tổng hợp)',NULL,'2026-04-02 01:17:34.247'),('ac563472-6cf0-4734-924a-254c82cebff9','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 1 của luật dân sự',NULL,'2026-04-05 02:57:08.451'),('b0459c86-dbe6-4b12-83d2-2c30692d924f','846a123b-4127-443c-8d4c-96bcce51d4ca','user','Xin chào, bạn là AI gì vậy ?',NULL,'2026-04-01 03:23:15.583'),('b28dbb33-de7b-486c-be99-f6999a5f2d61','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn đưa ra là chính xác. Điều 19 quy định về Năng lực hành vi dân sự của cá nhân, cụ thể như sau:\n\n*   **Năng lực hành vi dân sự** là khả năng của mỗi cá nhân tự mình thực hiện các quyền và nghĩa vụ dân sự thông qua hành vi của mình.\n*   Về cơ bản, tất cả mọi người đều có năng lực hành vi dân sự như nhau, trừ những trường hợp pháp luật có quy định khác (ví dụ: trường hợp bị mất hoặc bị hạn chế năng lực hành vi dân sự).\n\n**Căn cứ pháp lý:**\n*   Điều 19 Bộ luật Dân sự 2015 (Dựa trên kiến thức pháp luật tổng hợp)\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:52:41.850'),('bf98f2bc-a93d-4862-aa72-b224ffb7e60a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Hiện tại, kho dữ liệu chuyên sâu của tôi chưa cập nhật chi tiết về Điều 2 của Bộ luật Dân sự 2015. Tuy nhiên, dựa trên kiến thức pháp luật tổng hợp, tôi xin tư vấn như sau:\n\nThông tin bạn đưa ra cần lưu ý một chút là trong các dữ liệu hiện có không chứa Điều 2 của Bộ luật Dân sự 2015.\n\nTheo kiến thức pháp luật tổng hợp:\n*   **Điều 2 của Bộ luật Dân sự 2015** thường quy định về phạm vi điều chỉnh của Bộ luật này. Cụ thể, nó nêu rõ Bộ luật Dân sự quy định về địa vị pháp lý, chuẩn mực pháp lý về cách ứng xử của cá nhân, pháp nhân; quyền, nghĩa vụ về nhân thân và tài sản trong các quan hệ dân sự, hôn nhân và gia đình, kinh doanh, thương mại, lao động (sau đây gọi chung là quan hệ dân sự) được hình thành trên cơ sở bình đẳng, tự do ý chí, độc lập về tài sản và tự chịu trách nhiệm.\n\nCăn cứ pháp lý:\n*   Kiến thức pháp luật tổng hợp về Bộ luật Dân sự 2015 (Số 91/2015/QH13).\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 03:12:51.308'),('c524fdd2-6025-4b2b-bc06-31ae6dce129c','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Điều 1 của Luật Đường bộ 2024 quy định về Phạm vi điều chỉnh của Luật này.\n\nCụ thể, Luật Đường bộ 2024 sẽ điều chỉnh các vấn đề liên quan đến:\n*   **Hoạt động đường bộ:** Bao gồm tất cả các hoạt động diễn ra trên đường bộ như giao thông, vận tải, khai thác, bảo trì đường bộ.\n*   **Quản lý nhà nước về hoạt động đường bộ:** Các quy định về quản lý, giám sát và điều tiết của cơ quan nhà nước đối với các hoạt động trên đường bộ.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Luật Đường bộ 2024 (Số 35/2024/QH15)',NULL,'2026-04-05 02:15:05.642'),('ca010b9b-8f3e-487f-b1df-fece5ad4cf20','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','xin chàoooo',NULL,'2026-04-02 04:37:18.901'),('ca5316e0-fda0-4e79-bdec-250dc92d5533','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 2 của luật dân sự',NULL,'2026-04-05 02:58:35.806'),('caa0891c-cc1e-4a1e-b9c6-ac62784f747a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn đưa ra cần lưu ý lại.\n\n*   Bộ luật Dân sự 2015 số 91/2015/QH13 đã có hiệu lực thi hành từ ngày 01 tháng 01 năm 2017, không phải năm 2025.\n\n**Căn cứ pháp lý**\n*   Điều 688 Bộ luật Dân sự 2015 số 91/2015/QH13\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:51:24.396'),('cf7d0c0c-0c96-4bb1-a443-64384660287a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','điều 1 bộ luật dân sựh',NULL,'2026-04-05 02:46:03.985'),('d19f44d5-d56f-4170-968b-9205cd1d7aed','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','Xin chao',NULL,'2026-04-02 01:06:30.449'),('d32905ba-a666-465f-854a-7dd446657b24','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn yêu cầu không có trong nguồn dữ liệu được cung cấp.\n\nCác nguồn dữ liệu được cung cấp chỉ bao gồm các điều khoản của Luật Đường bộ 2024, không bao gồm Luật Dân sự.\n\nCăn cứ pháp lý:\n* Dựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:47:04.356'),('d4298a6a-f51b-43f4-a069-17a675fa1a62','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 1 của Bộ luật Hình sự quy định về nhiệm vụ của Bộ luật này. Cụ thể:\n\nNhiệm vụ chính của Bộ luật Hình sự là bảo vệ các lợi ích quan trọng của quốc gia và xã hội, bao gồm:\n*   **Bảo vệ chủ quyền quốc gia, an ninh đất nước và chế độ xã hội chủ nghĩa.**\n*   **Bảo vệ quyền con người, quyền công dân, lợi ích của Nhà nước, các tổ chức.**\n*   **Bảo vệ trật tự pháp luật xã hội chủ nghĩa và đấu tranh chống lại mọi hành vi phạm tội.**\n\nBên cạnh đó, Bộ luật Hình sự còn có nhiệm vụ giáo dục mọi người về ý thức tuân thủ pháp luật, từ đó góp phần phòng ngừa và đấu tranh chống tội phạm. (Theo kiến thức tổng hợp)\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Bộ luật Hình sự 2015 (sửa đổi, bổ sung 2017)',NULL,'2026-04-01 03:00:57.737'),('d4f9900c-58d9-4f0a-9697-fc06f2ef1398','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','APICallError [AI_APICallError]: models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.\n    at <anonymous> (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\@ai-sdk\\provider-utils\\src\\response-handler.ts:56:16)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async postToApi (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\@ai-sdk\\provider-utils\\src\\post-to-api.ts:118:28)\n    at async GoogleGenerativeAILanguageModel.doStream (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\@ai-sdk\\google\\src\\google-generative-ai-language-model.ts:388:50)\n    at async fn (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\generate-text\\stream-text.ts:1682:27)\n    at async <anonymous> (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\telemetry\\record-span.ts:32:24)\n    at async _retryWithExponentialBackoff (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\util\\retry-with-exponential-backoff.ts:96:12)\n    at async streamStep (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\generate-text\\stream-text.ts:1634:17)\n    at async fn (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\generate-text\\stream-text.ts:2162:9)\n    at async <anonymous> (D:\\Project\\LawerAI\\LawerAI-api\\node_modules\\ai\\src\\telemetry\\record-span.ts:32:24) {\n  cause: undefined,\n  url: \'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse\',\n  requestBodyValues: {\n    generationConfig: {\n      maxOutputTokens: undefined,\n      temperature: undefined,\n      topK: undefined,\n      topP: undefined,\n      frequencyPenalty: undefined,\n      presencePenalty: undefined,\n      stopSequences: undefined,\n      seed: undefined,\n      responseMimeType: undefined,\n      responseSchema: undefined,\n      responseModalities: undefined,\n      thinkingConfig: undefined\n    },\n    contents: [ [Object] ],\n    systemInstruction: undefined,\n    safetySettings: undefined,\n    tools: undefined,\n    toolConfig: undefined,\n    cachedContent: undefined,\n    labels: undefined\n  },\n  statusCode: 404,\n  responseHeaders: {\n    \'alt-svc\': \'h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000\',\n    \'content-length\': \'265\',\n    \'content-type\': \'text/event-stream\',\n    date: \'Sun, 05 Apr 2026 03:23:22 GMT\',\n    server: \'scaffolding on HTTPServer2\',\n    \'server-timing\': \'gfet4t7; dur=50\',\n    vary: \'Origin, X-Origin, Referer\',\n    \'x-content-type-options\': \'nosniff\',\n    \'x-frame-options\': \'SAMEORIGIN\',\n    \'x-xss-protection\': \'0\'\n  },\n  responseBody: \'{\\n\' +\n    \'  \"error\": {\\n\' +\n    \'    \"code\": 404,\\n\' +\n    \'    \"message\": \"models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.\",\\n\' +\n    \'    \"status\": \"NOT_FOUND\"\\n\' +\n    \'  }\\n\' +\n    \'}\\n\',\n  isRetryable: false,\n  data: {\n    error: {\n      code: 404,\n      message: \'models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.\',\n      status: \'NOT_FOUND\'\n    }\n  },\n  [Symbol(vercel.ai.error)]: true,\n  [Symbol(vercel.ai.error.AI_APICallError)]: true\n}',NULL,'2026-04-05 03:23:29.581'),('d5804c54-7ff6-4ea1-9093-3c176a1ab9cf','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Cần làm rõ lại rằng, theo các tài liệu pháp luật tôi có, không tìm thấy thông tin về Điều 1 của Bộ luật Dân sự.\n\nCăn cứ pháp lý:\nDựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:46:18.115'),('d5a9ae22-f9df-4237-b971-634f5381b4a5','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều 2 bộ luật dân sự',NULL,'2026-04-02 01:26:28.440'),('d7786d3e-9d34-4748-99b9-b31b1b68ecf8','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin về Điều 1 của Bộ luật Dân sự không có trong dữ liệu được cung cấp.\n\nCăn cứ pháp lý:\n*   Dựa trên kiến thức pháp luật tổng hợp.\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:56:14.854'),('d7c956f5-3655-4166-ad16-536316524818','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều luật 1',NULL,'2026-04-02 04:37:30.349'),('d8cd0278-0274-4735-bab3-9643901fc403','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Nội dung chi tiết của Điều 1 trong bộ Luật Dân sự Việt Nam hiện hành',NULL,'2026-04-05 02:50:53.905'),('df1cadaa-9d8c-4b12-a1ee-6e63ea207bb1','d8fd79d8-e0cb-4344-8312-99ef077c626e','assistant','Tôi sẵn lòng hỗ trợ bạn về các vấn đề pháp luật. Xin mời bạn nêu rõ câu hỏi của mình.',NULL,'2026-04-02 04:37:25.762'),('e46cca4e-5e67-45bf-91ea-984dbfa62410','27e34179-4dce-4914-b4d9-a508ff782c96','assistant','Điều 1 của Bộ luật Dân sự 2015 quy định về phạm vi điều chỉnh của Bộ luật này, cụ thể như sau:\n\nBộ luật Dân sự 2015 là đạo luật chung, quy định về:\n*   **Địa vị pháp lý và chuẩn mực ứng xử:** Các quy tắc, vị trí pháp lý của cá nhân (con người) và pháp nhân (tổ chức hợp pháp như công ty, doanh nghiệp) khi tham gia vào các giao dịch, quan hệ trong đời sống.\n*   **Quyền và nghĩa vụ về nhân thân và tài sản:** Các quyền lợi (ví dụ: quyền sở hữu tài sản, quyền đối với họ tên, danh dự) và trách nhiệm (ví dụ: nghĩa vụ trả nợ, nghĩa vụ bồi thường) của cá nhân, pháp nhân.\n\nCác quan hệ này được gọi chung là quan hệ dân sự và được hình thành dựa trên các nguyên tắc cốt lõi:\n*   **Bình đẳng:** Các bên trong quan hệ đều có vị thế pháp lý ngang nhau.\n*   **Tự do ý chí:** Các bên tự nguyện, tự do quyết định khi tham gia vào quan hệ mà không bị ép buộc.\n*   **Độc lập về tài sản:** Mỗi chủ thể (cá nhân hoặc pháp nhân) tự chịu trách nhiệm về tài sản của mình.\n*   **Tự chịu trách nhiệm:** Mỗi chủ thể phải tự gánh chịu hậu quả pháp lý từ hành vi của mình.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 1, Bộ luật Dân sự 2015 số 91/2015/QH13',NULL,'2026-04-02 04:40:50.812'),('e7c30e5e-5807-4b02-9631-0b520ee32951','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','cho tôi biết điều 2 của luật dân sự',NULL,'2026-04-05 03:12:45.284'),('e7cc4e4b-9d85-494b-bd77-1b060dc12374','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều 1  của luật dân sự',NULL,'2026-04-02 01:06:48.142'),('ecd7399c-c45c-4b5b-9c5e-52649054f9a5','846a123b-4127-443c-8d4c-96bcce51d4ca','assistant','Tôi là một luật sư tư vấn chuyên nghiệp, được thiết kế để giải thích pháp luật một cách rõ ràng, dễ hiểu và chính xác cho bạn.\n\nHãy cho tôi biết vấn đề pháp lý mà bạn đang quan tâm, tôi sẵn sàng hỗ trợ bạn.',NULL,'2026-04-01 03:23:19.470'),('efb77a4a-b084-4444-942b-4422791dc81f','d8fd79d8-e0cb-4344-8312-99ef077c626e','user','điều 2',NULL,'2026-04-02 01:14:31.167'),('f5204a48-c47f-4430-a028-0730cdee325c','e5a3ed2c-f3b7-49b0-8791-0e84553584e2','assistant','Điều 2 của Luật Tố tụng Hành chính 2015 quy định về phạm vi áp dụng và hiệu lực của Luật này như sau:\n\n1.  **Phạm vi trong nước:** Luật được áp dụng cho mọi hoạt động tố tụng hành chính diễn ra trên toàn lãnh thổ Việt Nam, bao gồm đất liền, hải đảo, vùng biển và vùng trời.\n2.  **Phạm vi ngoài nước:** Luật cũng được áp dụng đối với các hoạt động tố tụng hành chính do cơ quan đại diện của Việt Nam thực hiện ở nước ngoài.\n3.  **Vụ án có yếu tố nước ngoài:** Đối với các vụ án hành chính có yếu tố nước ngoài (liên quan đến bên nước ngoài), Luật này sẽ được áp dụng. Tuy nhiên, nếu một điều ước quốc tế mà Việt Nam là thành viên có quy định khác, thì quy định của điều ước quốc tế đó sẽ được ưu tiên áp dụng.\n4.  **Trường hợp ưu đãi, miễn trừ ngoại giao:** Nếu các cơ quan, tổ chức hoặc cá nhân nước ngoài, hay tổ chức quốc tế được hưởng quyền ưu đãi, miễn trừ ngoại giao hoặc lãnh sự theo pháp luật Việt Nam hoặc theo điều ước quốc tế, thì các vụ án hành chính liên quan đến họ sẽ được giải quyết thông qua con đường ngoại giao.\n\n---\n📌 **Căn cứ pháp lý tham khảo:**\n- Điều 2, Luật tố tụng hành chính 2015 số 93/2015/QH13',NULL,'2026-04-01 03:12:55.983'),('f7988158-5d53-4feb-98eb-a4fc7afa0671','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','user','Xin chào',NULL,'2026-04-05 02:14:42.959'),('fb71c305-ee14-4849-bd04-49be00c42f3a','8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','assistant','Thông tin bạn yêu cầu về Điều 1 của Bộ luật Dân sự 2015 không có trong dữ liệu được cung cấp.\n\n*   Dữ liệu hiện tại không chứa nội dung của Điều 1 Bộ luật Dân sự 2015.\n\n**Căn cứ pháp lý**\n*   Dựa trên kiến thức pháp luật tổng hợp\n\nThông tin chỉ mang tính chất tham khảo, bạn nên liên hệ luật sư để được tư vấn chuyên sâu cho trường hợp cụ thể.',NULL,'2026-04-05 02:57:14.357');
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
INSERT INTO `chat_sessions` VALUES ('27e34179-4dce-4914-b4d9-a508ff782c96','cmng3liu00003c0eftdub3lwv','Điều 1 Bộ luật dân sự','2026-04-02 04:40:35.400','2026-04-02 04:40:43.984'),('846a123b-4127-443c-8d4c-96bcce51d4ca','cmnaka60l000p6wefip807za8','AI là gì?','2026-04-01 02:18:54.585','2026-04-01 03:23:15.569'),('8fe6aa25-40bd-43ec-b5bd-9a80e7ead061','cmng3liu00003c0eftdub3lwv','Chào bạn','2026-04-05 02:13:47.260','2026-04-05 02:13:59.150'),('d8fd79d8-e0cb-4344-8312-99ef077c626e','cmng3liu00003c0eftdub3lwv','Chào hỏi','2026-04-02 01:06:18.015','2026-04-02 01:06:30.416'),('e5a3ed2c-f3b7-49b0-8791-0e84553584e2','cmnaka60l000p6wefip807za8','Chào','2026-04-01 02:19:01.188','2026-04-01 03:00:33.636');
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
INSERT INTO `email_verification_tokens` VALUES ('cmng3hp7x0002c0efzoin3qlu','cmng3hp6h0000c0ef234062ye','113f1e0b4eb08e996c771ccb1cf3feb756d7da6d1ad4a0539f70f319081d1ebe','2026-04-03 13:42:07.338',NULL,'2026-04-01 13:42:07.341'),('cmng3liun0005c0efbyr6we0w','cmng3liu00003c0eftdub3lwv','08f6d7051801b1975d0d4a8dccd99f3472995ab47cd867f4ddee3cb7b8163819','2026-04-03 13:45:05.710','2026-04-01 13:45:21.307','2026-04-01 13:45:05.711'),('cmnil1gy80005vkef2etv25t7','cmnil1gxe0003vkef2z6y4f53','205378219ecc7b2a7e6cf5afdc0c4bbe2c5f072a16ba0c3b54d1586da5070d29','2026-04-05 07:28:55.566','2026-04-03 07:29:16.688','2026-04-03 07:28:55.568');
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
INSERT INTO `hub_categories` VALUES ('cmnfq18z50005egefmz92vlx1','khac','Khác',2,'2026-04-01 07:25:24.785','2026-04-01 07:31:38.667',NULL),('cmnlhu53a0006lgefbw1tjp65','thu-tuc-hanh-chinh','Thủ tục hành chính',0,'2026-04-05 08:22:33.286','2026-04-05 08:22:33.286',NULL),('cmnlhv5wl0007lgefuiqrbc0a','bat-djong-san','Bất động sản',0,'2026-04-05 08:23:20.997','2026-04-05 08:23:20.997',NULL),('cmnlhvpxi0008lgefqn27wmzh','dan-su','Dân sự',0,'2026-04-05 08:23:46.951','2026-04-05 08:23:46.951',NULL),('cmnlhw2n50009lgefxsr3ujbw','kinh-doanh-and-khoi-nghiep','Kinh doanh & Khởi nghiệp',0,'2026-04-05 08:24:03.425','2026-04-05 08:24:03.425',NULL),('cmnlhwu6a000algef7rk9u9k0','hon-nhan-and-gia-djinh','Hôn nhân & Gia đình',0,'2026-04-05 08:24:39.106','2026-04-05 08:24:39.106',NULL),('cmnlhx1sx000blgefrax0yeax','giao-thong-and-xu-phat','Giao thông & Xử phạt',0,'2026-04-05 08:24:48.993','2026-04-05 08:24:48.993',NULL);
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
INSERT INTO `hub_comments` VALUES ('cmnli6vzw000flgef0gx4rzdu','cmnli00hz000clgefs92lp3nu',NULL,'cmng3liu00003c0eftdub3lwv','Xin chào','2026-04-05 08:32:28.028','2026-04-05 08:32:28.028',NULL);
/*!40000 ALTER TABLE `hub_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub_feedbacks`
--

DROP TABLE IF EXISTS `hub_feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hub_feedbacks` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hub_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','PROCESSING','COMPLETED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `rawResponse` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hub_feedbacks_hub_id_key` (`hub_id`),
  KEY `hub_feedbacks_status_idx` (`status`),
  CONSTRAINT `hub_feedbacks_hub_id_fkey` FOREIGN KEY (`hub_id`) REFERENCES `hub_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub_feedbacks`
--

LOCK TABLES `hub_feedbacks` WRITE;
/*!40000 ALTER TABLE `hub_feedbacks` DISABLE KEYS */;
INSERT INTO `hub_feedbacks` VALUES ('672af323-d4c5-4d7d-8397-39aa27e5843e','cmnli00hz000clgefs92lp3nu','COMPLETED','\"### 1. Phân loại & Căn cứ\\nLoại hình: Hành chính (liên quan đến thủ tục cấp giấy tờ và quản lý dữ liệu công dân).\\nCăn cứ: Không tìm thấy điều luật cụ thể trong kho dữ liệu được cung cấp.\\n\\n### 2. Nhận định tình hình\\nHành vi là Rủi ro tranh chấp (do dữ liệu chưa khớp, gây cản trở thủ tục hành chính).\\n\\n### 3. Đánh giá rủi ro\\nMức độ: Trung bình\\nHệ quả: Không thể hoàn tất thủ tục cấp hộ chiếu online đúng hạn, ảnh hưởng kế hoạch du lịch.\\n\\n### 4. Giải pháp thực thi\\nBước 1: Liên hệ trực tiếp cơ quan công an phường/xã nơi cư trú để yêu cầu kiểm tra, đối chiếu thông tin cá nhân của con trong hệ thống Cơ sở dữ liệu quốc gia về dân cư.\\nBước 2: Yêu cầu cơ quan công an chỉnh sửa thông tin sai lệch (nếu có) trên hệ thống hoặc xác nhận tính chính xác của dữ liệu nếu phát hiện lỗi hệ thống.\\nBước 3: Sau khi thông tin được cập nhật hoặc xác nhận chính xác, thực hiện lại thủ tục cấp hộ chiếu online hoặc nộp hồ sơ trực tiếp tại Phòng Quản lý xuất nhập cảnh Công an tỉnh/thành phố.\\n\\n### 5. Lưu ý quan trọng nhất\\n⚠️ Lưu ý: Ưu tiên làm rõ và chỉnh sửa thông tin trong Cơ sở dữ liệu quốc gia về dân cư trước tiên, vì đây là nguồn dữ liệu gốc để giải quyết các thủ tục hành chính liên quan đến giấy tờ tùy thân.\"','2026-04-05 08:27:40.033','2026-04-05 08:27:40.033');
/*!40000 ALTER TABLE `hub_feedbacks` ENABLE KEYS */;
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
INSERT INTO `hub_posts` VALUES ('cmnli00hz000clgefs92lp3nu','cmnlhu53a0006lgefbw1tjp65','cmng3liu00003c0eftdub3lwv','lam-ho-chieu-online-cho-tre-em-nhung-bi-bao-du-lieu-khong-khop','Làm hộ chiếu online cho trẻ em nhưng bị báo \"Dữ liệu không khớp\"?','<p>Chào mọi người, mình đang làm hộ chiếu online cho con (5 tuổi) trên Cổng dịch vụ công nhưng đến bước xác nhận thì hệ thống báo: <em>\"Dữ liệu dân cư không khớp với thông tin khai báo\"</em>.</p><p>Mình đã kiểm tra kỹ số định danh và ngày sinh trên khai sinh của con đều đúng. Có ai gặp trường hợp này chưa ạ? Phải ra công an phường chỉnh sửa hay do lỗi hệ thống? Mình đang cần gấp để tháng sau cả nhà đi du lịch. Cảm ơn cả nhà!</p>','PUBLISHED','2026-04-05 08:27:07.271','2026-04-05 08:27:07.271',NULL);
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
INSERT INTO `password_reset_tokens` VALUES ('cmnik5ftx0002vkefh0n77md5','cmng3liu00003c0eftdub3lwv','7832be579eee6b4d9f3cd7061263f2d0ed7177e72ae40166d987409907f8d631','2026-04-03 07:34:01.122',0,'2026-04-03 07:36:11.107','2026-04-03 07:04:01.125'),('cmnilat0s0009vkefavf4zwc3','cmng3liu00003c0eftdub3lwv','5037920a400ae3a01f32a9c2309e051a4cc8537c1a45d28bf0377db78fde48fe','2026-04-03 08:06:11.116',1,'2026-04-03 07:37:25.122','2026-04-03 07:36:11.116'),('cmnilce4r000avkefpnxeyz8l','cmng3liu00003c0eftdub3lwv','01be695b4c5694536398a8c090ca4d6b0245bb3ede09ed6b902e1f0e8db76c0b','2026-04-03 08:07:25.130',0,'2026-04-03 07:38:46.533','2026-04-03 07:37:25.131'),('cmnilheut000bvkefq8l9s7ex','cmng3liu00003c0eftdub3lwv','701291669272a5088761929bd8d1e0ef09f1b377777f04c96b118fdd97991372','2026-04-03 08:11:19.347',0,'2026-04-03 07:41:42.797','2026-04-03 07:41:19.349'),('cmnl3qtg90000qwefpatybb8y','cmng3liu00003c0eftdub3lwv','d164f75115e66a9ffe77787b2b865ac5fb677546db0bb45e813cd4f9b0b666ae','2026-04-05 02:18:03.593',0,'2026-04-05 01:48:50.344','2026-04-05 01:48:03.609');
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
INSERT INTO `profiles` VALUES ('cmnbiumhl000bp0ef740cqa1g','cmnbiumhc000ap0efeqcd7fgo','n23dvcn009',NULL,NULL,NULL,0,'2026-03-29 08:53:13.689','2026-03-29 08:53:13.689',NULL),('cmng3hp730001c0efhzfpiv8f','cmng3hp6h0000c0ef234062ye','lethanhdat15671',NULL,NULL,NULL,0,'2026-04-01 13:42:07.311','2026-04-01 13:42:07.311',NULL),('cmng3liub0004c0ef1it1u7n1','cmng3liu00003c0eftdub3lwv','lethanhdat156',NULL,'/upload/1775052963948-534cf97501aa1986.jpg',NULL,0,'2026-04-01 13:45:05.699','2026-04-01 14:16:05.211',NULL),('cmnil1gxq0004vkefiwayofx4','cmnil1gxe0003vkef2z6y4f53','datle',NULL,NULL,NULL,0,'2026-04-03 07:28:55.550','2026-04-03 07:28:55.550',NULL);
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
INSERT INTO `queues` VALUES ('2ed7fecb-7c7f-4048-9db8-3440427b97a5','reset_password','{\"code\": \"499112\", \"email\": \"lethanhdat1567@gmail.com\"}','error','2026-04-03 07:04:01.137','2026-04-03 07:05:50.441'),('63759c24-39e4-428d-9dc3-89b40f827a94','ai_feedback','{\"hubId\": \"cmngy4u2f0000ksef87cm8mkr\"}','completed','2026-04-02 03:59:55.221','2026-04-02 04:02:53.448'),('6b9d15e0-96bf-410e-94fb-9591cc3366d9','reset_password','{\"code\": \"513989\", \"email\": \"lethanhdat1567@gmail.com\"}','error','2026-04-03 07:37:25.138','2026-04-03 07:37:48.373'),('6c30df28-6b7d-4e1b-81d0-65c9bce378d7','ai_feedback','{\"hubId\": \"cmngswod7000524efqx6zwtrw\"}','completed','2026-04-02 03:40:58.017','2026-04-02 03:47:40.159'),('761db184-4dd9-425b-8ab4-3a9784bbfe1b','reset_password','{\"code\": \"789170\", \"email\": \"lethanhdat1567@gmail.com\"}','completed','2026-04-05 01:48:03.633','2026-04-05 01:48:33.940'),('76d4529b-76f3-4eed-abf2-6ed7dd46c108','reset_password','{\"code\": \"021159\", \"email\": \"lethanhdat1567@gmail.com\"}','error','2026-04-03 07:36:11.125','2026-04-03 07:36:35.292'),('a59b2666-e9fe-40bd-9b42-7220ebc35b23','verify_email','{\"email\": \"datlethanh1567@gmail.com\", \"rawToken\": \"43k870QZNWLoIKGo_mn8eLt5KObr0rAL6TQBMc30kGA\"}','error','2026-04-03 07:28:55.596','2026-04-03 07:29:23.513'),('ae8acb98-7d5c-49f5-a4b6-dcc53ed27666','ai_feedback','{\"hubId\": \"cmnl7j2fy0000ikef5sdh3gpq\"}','completed','2026-04-05 03:34:00.500','2026-04-05 03:36:42.972'),('d84a824c-96f7-4867-9778-d656a3eea751','verify_email','{\"email\": \"lethanhdat15672@gmail.com\", \"rawToken\": \"Py8O1eDtqKdCpygCP5SLBcU3oMMNL-p3jIwZUnmrs64\"}','completed','2026-04-01 13:42:07.416','2026-04-01 13:44:27.889'),('e8d9889d-cc1d-4714-a9e3-b74ca54efe82','verify_email','{\"email\": \"lethanhdat1567@gmail.com\", \"rawToken\": \"xOaJlHcQngNrtyxrXpKNkPOH454KT7UrJTepxF74cDw\"}','completed','2026-04-01 13:45:05.730','2026-04-01 13:45:12.254'),('ee907e98-9ff6-428d-81dd-359d3a7d0fef','reset_password','{\"code\": \"080101\", \"email\": \"lethanhdat1567@gmail.com\"}','completed','2026-04-03 07:41:19.356','2026-04-03 07:41:23.378'),('f85ce5ad-4398-4d3a-9e04-d59002472f24','ai_feedback','{\"hubId\": \"cmnli00hz000clgefs92lp3nu\"}','completed','2026-04-05 08:27:07.279','2026-04-05 08:27:40.044');
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
INSERT INTO `refresh_sessions` VALUES ('cmnbiumid000dp0efe9tjcmu3','cmnbiumhc000ap0efeqcd7fgo','9d868e4d2a20ee2913130f14f6b5ef1ef932a7df1e3dc212e307cc1eb16b9167','2026-04-05 08:53:13.000','2026-03-29 08:54:48.741','2026-03-29 08:53:13.717'),('cmnbiwnu7000gp0efwfzpvcgn','cmnbiumhc000ap0efeqcd7fgo','c1423a36434636caa9a4d465c38e8cfd3613dd8dd5019c6735ac418fbfe0c6ad','2026-04-05 08:54:48.000','2026-03-29 09:05:57.211','2026-03-29 08:54:48.751'),('cmnbjaznu0000p0ef28s51x4v','cmnbiumhc000ap0efeqcd7fgo','354209d62628ff09b4189805dbc7f0efbd4abdced0f1cc114e6f15dd1c9e4518','2026-04-05 09:05:57.000','2026-03-29 09:06:12.539','2026-03-29 09:05:57.258'),('cmnbjbbgq0001p0efbudjyixv','cmnbiumhc000ap0efeqcd7fgo','c8293aff501bd606d1e4c3fcd9ff5f1d0006d12034b2834da0e6611884c148c4','2026-04-05 09:06:12.000','2026-03-29 09:08:02.035','2026-03-29 09:06:12.554'),('cmnbjdnyh0002p0ef35shac3z','cmnbiumhc000ap0efeqcd7fgo','db68b3da5c87c6866c586de2f4ace4be6b7311e04f7a23f7a0d76d317b0a047d','2026-04-05 09:08:02.000','2026-03-29 09:08:11.515','2026-03-29 09:08:02.057'),('cmnbjdv9m0003p0efvfn9ez6n','cmnbiumhc000ap0efeqcd7fgo','002a831a129cd49abe38288494e9bec96b1860b77a1bb5bb8b3471859a148f41','2026-04-05 09:08:11.000',NULL,'2026-03-29 09:08:11.530'),('cmnfop06900025cefoqsj93t1','cmnbiumhc000ap0efeqcd7fgo','e26b01e9eed5f552505ba8007ca16f8d7e9b69514e8bc3cad13d6486930b2788','2026-04-08 06:47:53.000','2026-04-01 06:48:11.430','2026-04-01 06:47:53.890'),('cmnfopdpp00035cefyjvmzydn','cmnbiumhc000ap0efeqcd7fgo','0f5875de10b8eb91ac811f0e728ecd871c6e7279d9ba25359e9316f4cf9702fa','2026-04-08 06:48:11.000','2026-04-01 06:49:13.919','2026-04-01 06:48:11.438'),('cmnfoqpxm00045ceffrv15czq','cmnbiumhc000ap0efeqcd7fgo','a8e29f8ce9d0ea3153599331e3b0c07e3257b7f358b28fbf44e7a9b20d1c10c0','2026-04-08 06:49:13.000','2026-04-01 06:49:54.269','2026-04-01 06:49:13.930'),('cmnforl2t00055cefojz7we5k','cmnbiumhc000ap0efeqcd7fgo','a8df514b2cc9ff0c2fd61ca3953f64948c0e0e9bdf22ca91b6aebb7f86f7bffa','2026-04-08 06:49:54.000','2026-04-01 06:49:59.909','2026-04-01 06:49:54.293'),('cmnforpfb00065cefaodkmcgv','cmnbiumhc000ap0efeqcd7fgo','83bda81dd78d15948a595f023734834c336248cc1f7561c0651d022a3f5ef364','2026-04-08 06:49:59.000','2026-04-01 06:50:08.440','2026-04-01 06:49:59.927'),('cmnfq68mx000cegef4yy5q1hz','cmnbiumhc000ap0efeqcd7fgo','39f7ddb4bb051dfb0b94e723dbb72e2a6fb0f3165421e64d91c7e95a60652680','2026-04-08 07:29:17.000','2026-04-01 07:29:31.162','2026-04-01 07:29:17.625'),('cmnfyneco0000psef8fs30lhp','cmnbiumhc000ap0efeqcd7fgo','e305fcb931c4e336512fb9de321047f52e5aa410dc1f5e26e447b80d1665d283','2026-04-08 11:26:35.000','2026-04-01 11:26:51.987','2026-04-01 11:26:35.112'),('cmng3luwz0006c0efly31r4p9','cmng3liu00003c0eftdub3lwv','dc132c6ab065215ce498f449950c3976f93a1b0160c862bc8ff96d328541efa9','2026-04-08 13:45:21.000','2026-04-01 13:45:51.444','2026-04-01 13:45:21.347'),('cmng3mi600007c0efff5zzymz','cmng3liu00003c0eftdub3lwv','4e9e20edf5ccbfbeeda3721396f0015438a635f443967722a6f84e3a00d12b6f','2026-04-08 13:45:51.000','2026-04-01 13:45:54.587','2026-04-01 13:45:51.480'),('cmng3mkkq0008c0efv9xg2xjk','cmng3liu00003c0eftdub3lwv','a5a95864bc93a6bc0f3ce2d71d82ffebbbfc07b148d13df36acb7ce01a57f17c','2026-04-08 13:45:54.000','2026-04-01 14:16:08.768','2026-04-01 13:45:54.602'),('cmng4pgem000cc0efok78zccz','cmng3liu00003c0eftdub3lwv','8e388e99feb2e4dd00feffe7b9d9fc21ccf99d100442c6e3c4655975327e4bb6','2026-04-08 14:16:08.000','2026-04-03 07:38:46.558','2026-04-01 14:16:08.782'),('cmngspvrx000024efl0rfcmsb','cmng3liu00003c0eftdub3lwv','e0cb5ab8766443cd963081b0f2a1dcde58c03dd0e8ceff16155cd35ec1b16dea','2026-04-09 01:28:19.000','2026-04-02 01:28:25.670','2026-04-02 01:28:19.485'),('cmngsq0kh000124efh35b61we','cmng3liu00003c0eftdub3lwv','d87fde86bd044c07332e9848c0579482e6896ec57695cb3d84a7425f06efb6a2','2026-04-09 01:28:25.000','2026-04-02 01:28:44.384','2026-04-02 01:28:25.697'),('cmngsqiyb000224efz70fwfhm','cmng3liu00003c0eftdub3lwv','183a76466c4c143574c159c56111f8d5546a66298ea3ffe1da481cb48617dd87','2026-04-09 01:28:49.000','2026-04-02 01:29:02.835','2026-04-02 01:28:49.523'),('cmngsqt8l000324ef93xzui2p','cmng3liu00003c0eftdub3lwv','7e8727cee7a27c39d95f614979e0e13ba09d38d132161a717a2218bd7c5d7b25','2026-04-09 01:29:02.000','2026-04-02 01:32:40.457','2026-04-02 01:29:02.853'),('cmngsvh5w000424efapcby5eg','cmng3liu00003c0eftdub3lwv','372293ab15faa30ee5f59e7b47ba35dc0e1f6b6d4d68b136d2d575f68de59403','2026-04-09 01:32:40.000','2026-04-02 01:47:13.647','2026-04-02 01:32:40.484'),('cmngte6zh0000wwefdqzmbp7v','cmng3liu00003c0eftdub3lwv','ffdcf3549081a210b9bc7ad0164fbf7e414b4ff791333ec356e9279f0d95e018','2026-04-09 01:47:13.000','2026-04-02 01:47:21.781','2026-04-02 01:47:13.758'),('cmngted710001wwefifq7rgzv','cmng3liu00003c0eftdub3lwv','0e0acce84c61bdfb512ae3eb672a34d12ce991904699ccb01f8f7440e5897c33','2026-04-09 01:47:21.000','2026-04-02 01:49:47.233','2026-04-02 01:47:21.805'),('cmngthhf90002wwef2injdyss','cmng3liu00003c0eftdub3lwv','633389eeed0253fd5b1cd88f4080bbbbe1f763a99ac3e89a7ca1011a50b1ae41','2026-04-09 01:49:47.000','2026-04-02 01:49:52.681','2026-04-02 01:49:47.253'),('cmngthlmr0003wwefp0uldir6','cmng3liu00003c0eftdub3lwv','3c0fe9e5e84606bf218facc41db8b9e149ebd139b6c329588b35630988f66306','2026-04-09 01:49:52.000','2026-04-02 01:50:47.423','2026-04-02 01:49:52.707'),('cmngtirv70004wwefs4g8n35a','cmng3liu00003c0eftdub3lwv','68eb4fcb38b35685eb8228fcaa4b299d57976e13a86618df4f747b2be6f8e4a9','2026-04-09 01:50:47.000','2026-04-02 01:50:51.099','2026-04-02 01:50:47.443'),('cmngtiupd0005wweflp44v99y','cmng3liu00003c0eftdub3lwv','05dbf28e6f935b5f7aaca91c9904f423cce756d1dd5185e230e1e87f2580e693','2026-04-09 01:50:51.000','2026-04-02 01:50:55.217','2026-04-02 01:50:51.122'),('cmngtixx50006wwefi6c2qwce','cmng3liu00003c0eftdub3lwv','d9cab9855b5bc8564c115b13bca444a881a62bbdbd9357f0fa19da177b2727e4','2026-04-09 01:50:55.000','2026-04-03 07:38:46.558','2026-04-02 01:50:55.289'),('cmngtobxt0007wwefoindwyx5','cmng3liu00003c0eftdub3lwv','6aaf8b41e0234b1920a12ecfd5246825e773e788b6e1a31a28e5d1012f2b06d2','2026-04-09 01:55:06.000','2026-04-03 07:38:46.558','2026-04-02 01:55:06.737'),('cmngybx7e0001ksefn4r2angg','cmng3liu00003c0eftdub3lwv','45e49aa04b4ac20789ec838ff738ceccbeacc5d1450e63a10193aa3aeb766ae2','2026-04-09 04:05:25.000','2026-04-02 04:05:35.428','2026-04-02 04:05:25.850'),('cmngyc4ma0002ksefdld986ol','cmng3liu00003c0eftdub3lwv','6c54608f8430ac3454ea1fb3eedbeeaf8b6529b8620e326257f1ccd7d32141d1','2026-04-09 04:05:35.000','2026-04-02 04:20:45.522','2026-04-02 04:05:35.458'),('cmngyvmxe0000b4efu39n8pa9','cmng3liu00003c0eftdub3lwv','b2192b5f75c03aa1eed08ec1311fff17a778dccd066ed52ba4d1fc7fe689e1e2','2026-04-09 04:20:45.000','2026-04-02 04:29:49.578','2026-04-02 04:20:45.650'),('cmngz7ani0001b4efznlhjoab','cmng3liu00003c0eftdub3lwv','bc11a98cdb816848e2b0f1ff7314e9ec60faab4cdd4628c0862d9040abe48887','2026-04-09 04:29:49.000','2026-04-02 04:29:59.235','2026-04-02 04:29:49.614'),('cmngzgqle0000bcef7459g50p','cmng3liu00003c0eftdub3lwv','0c3488e02daa2a0e4574c4162bd0b45340ee0bf3da5d9d96303fe14a1d5f7106','2026-04-09 04:37:10.000','2026-04-02 04:37:47.567','2026-04-02 04:37:10.179'),('cmngzl1l300007gef6l3segap','cmng3liu00003c0eftdub3lwv','62ce36206b86c9697c4cd6c06ce10063eeee54c76d96c65c83c5eabdc8e0a222','2026-04-09 04:40:31.000','2026-04-02 04:41:04.628','2026-04-02 04:40:31.048'),('cmngzlrjh00017geft58zxvj6','cmng3liu00003c0eftdub3lwv','455d6ce2da072d9898aced94a7581704c99e886128d7b1083554f0a71859262b','2026-04-09 04:41:04.000','2026-04-03 07:38:46.558','2026-04-02 04:41:04.685'),('cmnihf55m0000i4eff7uauwu6','cmng3liu00003c0eftdub3lwv','a2c4b7ec3511cb5fdd1c8a44de5a731f46379688e37d8990fe41352a7a1f379a','2026-04-10 05:47:35.000','2026-04-03 05:47:44.093','2026-04-03 05:47:35.003'),('cmnihfc6l0001i4efn8utdkvn','cmng3liu00003c0eftdub3lwv','f65429705ba71c2c029185ac4905768aab83c181d739b45bd2178f938303dcbd','2026-04-10 05:47:44.000','2026-04-03 06:05:03.658','2026-04-03 05:47:44.109'),('cmnii1mdc00008sefd9rmofua','cmng3liu00003c0eftdub3lwv','c042d8ff8ca44a449d62f39572911fe791985e508002c61da50f0e515228a9ce','2026-04-10 06:05:03.000','2026-04-03 06:05:22.124','2026-04-03 06:05:03.744'),('cmnii20kc00018sefikix70dp','cmng3liu00003c0eftdub3lwv','e7882eb34d92d1db07bed8307bcf09c02dd350fee5786eff84bcdda597682c4d','2026-04-10 06:05:22.000','2026-04-03 06:06:51.670','2026-04-03 06:05:22.140'),('cmnii3xnr00028sefl592njp9','cmng3liu00003c0eftdub3lwv','f22ca5a5918aacccbe05559303635f8b33e8562fdf0ea06949ee08e634698258','2026-04-10 06:06:51.000','2026-04-03 06:18:34.703','2026-04-03 06:06:51.687'),('cmniij04n000104efo7nea8u2','cmng3liu00003c0eftdub3lwv','953ffb042dca190caed8a5481a5a144676cfa121fc317528cf6b28ecd392c590','2026-04-10 06:18:34.000','2026-04-03 06:18:51.465','2026-04-03 06:18:34.727'),('cmniijd20000204effv0msr80','cmng3liu00003c0eftdub3lwv','9aa426ff0045ea82c93c5458c781904538909de9d0080405da2f5b977adffff4','2026-04-10 06:18:51.000','2026-04-03 06:19:53.824','2026-04-03 06:18:51.480'),('cmniikp65000404ef660etnlu','cmng3liu00003c0eftdub3lwv','4153de345ce5bce9c14d5513d34ef208327bed22e36bc56943660b5f7712388f','2026-04-10 06:19:53.000','2026-04-03 06:21:01.153','2026-04-03 06:19:53.837'),('cmniim54g000504efolrc5gdo','cmng3liu00003c0eftdub3lwv','16d6664249c901df0991f8ebd2aaefd6b0ab5ea84d7d69be35c34ef83ef0ec86','2026-04-10 06:21:01.000','2026-04-03 06:21:11.068','2026-04-03 06:21:01.168'),('cmniimcrx000604efk85c9vmr','cmng3liu00003c0eftdub3lwv','986c267dabd07b9f592de6628039e6badf05bdbee0749a0c124fc693fb18d43a','2026-04-10 06:21:11.000','2026-04-03 06:28:21.962','2026-04-03 06:21:11.085'),('cmniivla20000ygefmlqs4dmq','cmng3liu00003c0eftdub3lwv','3e42404f93efb28f54b10bd095787434376b65df2232c207c29dd28eda38ee08','2026-04-10 06:28:22.000','2026-04-03 06:28:51.853','2026-04-03 06:28:22.010'),('cmniiw8br0001ygefqxwpzsw2','cmng3liu00003c0eftdub3lwv','b6d08a52a1a42ab78d743f2874fb87989580fbfff584c81c97af8397ba1814be','2026-04-10 06:28:51.000','2026-04-03 06:29:13.126','2026-04-03 06:28:51.879'),('cmniiwoqe0002ygefq5su1roy','cmng3liu00003c0eftdub3lwv','0add3e0b38d667745bc8dc2b740c0eea358bbefc69c019f5fa89e0c21f0dc8d3','2026-04-10 06:29:13.000','2026-04-03 06:30:57.210','2026-04-03 06:29:13.142'),('cmniiyx1j0003ygeffp44faid','cmng3liu00003c0eftdub3lwv','5d64c3f0e725277a9be6e138d09d32d7dd8838adcc5c98cd9abf2dcdb1920879','2026-04-10 06:30:57.000','2026-04-03 06:35:38.937','2026-04-03 06:30:57.224'),('cmnij4yg60000f8efq1z506wi','cmng3liu00003c0eftdub3lwv','5a4b496e9b725c9df5acb942cf4882091720b05b82b7a05a01a6729128ad57d4','2026-04-10 06:35:38.000','2026-04-03 06:36:01.665','2026-04-03 06:35:38.982'),('cmnij5fym0001f8ef9uh92l3e','cmng3liu00003c0eftdub3lwv','d0199b53926ef7c43a36f4403a46b863292df9037045dd5f9fa71af2b3c53f4d','2026-04-10 06:36:01.000','2026-04-03 06:42:19.003','2026-04-03 06:36:01.678'),('cmnijdj5d0000mcefldioylw7','cmng3liu00003c0eftdub3lwv','a4b4ba46ec5a46711cab5083965c48c9b75f6afabfe099ded0e8f61a824ad7f0','2026-04-10 06:42:19.000','2026-04-03 06:43:15.261','2026-04-03 06:42:19.058'),('cmnijeqj50001mcef34ptlizd','cmng3liu00003c0eftdub3lwv','a5b2ced14b67b492b1fcbf6d8b88b0df16ff38dd062ac26c6c42800a865ff2bb','2026-04-10 06:43:15.000','2026-04-03 06:43:16.892','2026-04-03 06:43:15.281'),('cmnijersd0002mcef4lxj8oob','cmng3liu00003c0eftdub3lwv','45daed5de3b048242af4b3d150a08956d6c4b141388ac8c3c8d844a22d9b47cf','2026-04-10 06:43:16.000','2026-04-03 06:43:19.923','2026-04-03 06:43:16.909'),('cmnijeu4j0003mcefqknwogry','cmng3liu00003c0eftdub3lwv','a3b53250604d7c28a35e5e679d48aa83e9becbc44b3adc7e40bac5bc3090936f','2026-04-10 06:43:19.000','2026-04-03 06:43:24.982','2026-04-03 06:43:19.939'),('cmnijey140004mcefeka67ofy','cmng3liu00003c0eftdub3lwv','e1ab8190b63bdc9f584ed98cf3f5b58c77e04f55f31a966d0b9146ffbafc593d','2026-04-10 06:43:25.000','2026-04-03 06:43:46.608','2026-04-03 06:43:25.000'),('cmnijfepn0005mcefv187gsf0','cmng3liu00003c0eftdub3lwv','7334d1547ecc88037a7ba8dab53530e8892e9d0d05c3b3f40340ea48a6c35e35','2026-04-10 06:43:46.000','2026-04-03 06:53:33.491','2026-04-03 06:43:46.619'),('cmnijrzk20000vkef0h3bjjm6','cmng3liu00003c0eftdub3lwv','ffde74354efc3ffdc9bff2e25c50b9477092b443a64ddea66078a12032b59d59','2026-04-10 06:53:33.000','2026-04-03 06:53:39.108','2026-04-03 06:53:33.506'),('cmnijs3w70001vkefiuo9gdq7','cmng3liu00003c0eftdub3lwv','49d628e97c9830b5a66ae6fe969c59bf150ef21db022a66a9abf232f47b11fbc','2026-04-10 06:53:39.000','2026-04-03 07:02:16.166','2026-04-03 06:53:39.127'),('cmnil1x9k0006vkef2jv8mbnf','cmnil1gxe0003vkef2z6y4f53','650f55ce6b34720d64164dc7accbf50d0bb31ad8d2aaf84a4a03c15c7f619a4c','2026-04-10 07:29:16.000',NULL,'2026-04-03 07:29:16.712'),('cmnil5pgz0007vkef3ydon85i','cmng3liu00003c0eftdub3lwv','93452e666aabebe146219ac8d6bb934975260388fd985e84ca443ac417176bf6','2026-04-10 07:32:13.000','2026-04-03 07:32:19.181','2026-04-03 07:32:13.235'),('cmnil5u2m0008vkef41wzho76','cmng3liu00003c0eftdub3lwv','692ce95a3ad596d1c062d193ab47d881afa3a900b8609dde0b986a8bbd69e7d8','2026-04-10 07:32:19.000','2026-04-03 07:33:43.817','2026-04-03 07:32:19.199'),('cmnili4f3000cvkefa40ejiul','cmng3liu00003c0eftdub3lwv','c03815f6a8550812288075e262e8f08a93c9d47043a46973a39b0c6cf9bf4468','2026-04-10 07:41:52.000','2026-04-03 07:41:57.992','2026-04-03 07:41:52.479'),('cmnilpbhl000dvkefotlj6sn6','cmng3liu00003c0eftdub3lwv','7f09c1cc5297df77761f7b2df1d143c46f1d44075c8a890da7d99409431be160','2026-04-10 07:47:28.000','2026-04-03 07:47:32.593','2026-04-03 07:47:28.233'),('cmnilqkj8000evkefezti5v9o','cmng3liu00003c0eftdub3lwv','a95eca1b726b7ae4a7a4326582bfd3cd91a6d9542c987ab2a5217ef66a4c1630','2026-04-10 07:48:26.000','2026-04-03 07:49:36.404','2026-04-03 07:48:26.612'),('cmnils2e4000fvkeftxqkzm96','cmng3liu00003c0eftdub3lwv','c0be6db6aacfc21c578bd45041bb0b2c569614e46fb59ed762272a1a1f376955','2026-04-10 07:49:36.000','2026-04-03 07:51:04.871','2026-04-03 07:49:36.412'),('cmniltynu000gvkefde5cgo7n','cmng3liu00003c0eftdub3lwv','18166a51751fd3ce47d3974b1d376f55f4edc3bfa129def9c93571c1a1444647','2026-04-10 07:51:04.000','2026-04-03 07:51:19.481','2026-04-03 07:51:04.891'),('cmnilu9xf000hvkefvabjel2o','cmng3liu00003c0eftdub3lwv','f7620a8fa47cb50573f810c5151a660b6eacadaf2fabd5f710059a562dbb7728','2026-04-10 07:51:19.000','2026-04-03 08:05:33.297','2026-04-03 07:51:19.491'),('cmnimckrn0000d4efjvwmz54q','cmng3liu00003c0eftdub3lwv','ccdb1d24c57d43a188f7cdaa0df960dba4974c89d9b526279ab3103920b252bc','2026-04-10 08:05:33.000','2026-04-05 01:48:50.450','2026-04-03 08:05:33.347'),('cmnl3ryo70001qwefszl1ki5n','cmng3liu00003c0eftdub3lwv','a889a0ce20ad0e8e553a5550e637a306f8f67adf7c23aafb905728da8a8b1f79','2026-04-12 01:48:57.000','2026-04-05 01:56:39.680','2026-04-05 01:48:57.031'),('cmnl41vp90000zsefmqknq6y6','cmng3liu00003c0eftdub3lwv','5cfb2b0ab10b83d9c778f113b47feeb1cf7d80a87f90ef7a3f029672a60bd491','2026-04-12 01:56:39.000','2026-04-05 02:14:39.016','2026-04-05 01:56:39.742'),('cmnl4p0j00000xoeffmbp4m4f','cmng3liu00003c0eftdub3lwv','7dfd2f32a5cebd8ea6515d5cdd2b53156c7f0acfb4c86e6a4372c292db4487b6','2026-04-12 02:14:39.000','2026-04-05 02:35:52.967','2026-04-05 02:14:39.085'),('cmnl5gbia0000c4efgoqjxiqk','cmng3liu00003c0eftdub3lwv','95e26d815d6b50ed54d4d9afa25650eaf480ffab3322d69ed5f2e1fe5fd1cfe8','2026-04-12 02:35:53.000','2026-04-05 02:43:03.009','2026-04-05 02:35:53.026'),('cmnl5pjaj0001c4ef5llwurec','cmng3liu00003c0eftdub3lwv','0903e7104a4f8b33861898ffbefcc20e2a95f9bc1a0ada9089c8a04c8493ad61','2026-04-12 02:43:03.000','2026-04-05 02:52:32.518','2026-04-05 02:43:03.019'),('cmnl61qqr00000kefttm0d6sb','cmng3liu00003c0eftdub3lwv','9ac892a02a369ba24ea5ea5c929b95b8abbd447ac0985030271d0bf210c92ec0','2026-04-12 02:52:32.000','2026-04-05 03:23:55.887','2026-04-05 02:52:32.548'),('cmnl763yo0000d4efyoo12qkb','cmng3liu00003c0eftdub3lwv','a2874f043933d8f21e4647e4a2fe5d690029ed2b3096b3437fad2effcc98d0e8','2026-04-12 03:23:55.000','2026-04-05 03:25:42.778','2026-04-05 03:23:55.920'),('cmnl78egz0000ugef7dokmt93','cmng3liu00003c0eftdub3lwv','d6b48512b6c65bc171ef254c4bd726979f9c05ffe84b649e8050cf0fc13cc093','2026-04-12 03:25:42.000','2026-04-05 03:34:34.231','2026-04-05 03:25:42.852'),('cmnl7jsi30001ikef95e45wq8','cmng3liu00003c0eftdub3lwv','ac41545192144d2a18b30c5bb3702fd7f28866b9c9d1553ec993377493c87015','2026-04-12 03:34:34.000','2026-04-05 03:34:37.836','2026-04-05 03:34:34.251'),('cmnl7jvag0002ikef61k4kzkg','cmng3liu00003c0eftdub3lwv','2b825a1dc01cb027ce8902b71c7fc3137448e351367004d8db9beedf1b320c78','2026-04-12 03:34:37.000','2026-04-05 03:36:45.757','2026-04-05 03:34:37.864'),('cmnl7mlzn0003ikeffe9r25vb','cmng3liu00003c0eftdub3lwv','a2b597c6d10a6700dc55262265ebe38d0af1693d60bd0a52d4a94eb27f1f8011','2026-04-12 03:36:45.000',NULL,'2026-04-05 03:36:45.779'),('cmnlfriyp0000u0efrcn2qr2l','cmng3liu00003c0eftdub3lwv','aec0e214ca3d64d9b6fb852b0cf11b18602874c71897f92a35c6404d3dfd1229','2026-04-12 07:24:32.000','2026-04-05 07:30:26.657','2026-04-05 07:24:32.065'),('cmnlfz4l9000eu0ef5tgdp17i','cmng3liu00003c0eftdub3lwv','0fb561684cd45600a3d2aba3b0d8676f04a81c93f4179dfadef1cb722de2b1bb','2026-04-12 07:30:26.000',NULL,'2026-04-05 07:30:26.685'),('cmnlgdhbd0000egefgf2wyh7y','cmng3liu00003c0eftdub3lwv','37bb470aa2f23c56969a51fd70747671392ce863de3d2d9a5d20a51fe7a3d01b','2026-04-12 07:41:36.000','2026-04-05 07:50:23.316','2026-04-05 07:41:36.362'),('cmnlgorxu0000noefkfsgoyf8','cmng3liu00003c0eftdub3lwv','8644e6d01b3ffbfad9983ffd18370683492d74478b63eed45ebec5c0628bbd19','2026-04-12 07:50:23.000','2026-04-05 07:54:18.588','2026-04-05 07:50:23.346'),('cmnlgtth70002noefkoc6z6tf','cmng3liu00003c0eftdub3lwv','2af8308f73883e8943ad6f213408b18860214a401a4ef324c1a69b57ab3b4f58','2026-04-12 07:54:18.000','2026-04-05 07:54:20.582','2026-04-05 07:54:18.619'),('cmnlgtv050003noefjn8h4163','cmng3liu00003c0eftdub3lwv','a123391f880c73c35d7435452fdd00e088016e731b9d0523a386e5f4bf6c4b97','2026-04-12 07:54:20.000','2026-04-05 07:54:57.727','2026-04-05 07:54:20.598'),('cmnlgunnx0004noefa0n59u4b','cmng3liu00003c0eftdub3lwv','735e3f01814425608f0cd9cc1ae33e31e4536f8bc8396ff9a797825c0e56a67b','2026-04-12 07:54:57.000','2026-04-05 07:55:12.116','2026-04-05 07:54:57.741'),('cmnlguyrl0005noef07bo1db9','cmng3liu00003c0eftdub3lwv','f271c83c0d3f04a9ee1998316be33ff392a8a5fa0888ba348c764f188dcb598e','2026-04-12 07:55:12.000','2026-04-05 07:55:26.884','2026-04-05 07:55:12.129'),('cmnlgva5r0006noef1i5wfs2t','cmng3liu00003c0eftdub3lwv','0e6f1ea1cff34e48e2148e2797895f2fe36e455d5815631c6726d5c01feaca6b','2026-04-12 07:55:26.000','2026-04-05 07:56:02.554','2026-04-05 07:55:26.895'),('cmnlgw1oo0007noefvbrajz5z','cmng3liu00003c0eftdub3lwv','9b2100ec72a32b25b4a4c098edcf02d44b5ffb8b261acc7c896470fecb040a91','2026-04-12 07:56:02.000','2026-04-05 08:00:09.122','2026-04-05 07:56:02.568'),('cmnlh1bxw000010efuy67p1ck','cmng3liu00003c0eftdub3lwv','b5fb0f0f4f6ee83c00cdd527f90ecd45bbd2a980aa0d6a7891d5affc72fc53a9','2026-04-12 08:00:09.000','2026-04-05 08:00:13.493','2026-04-05 08:00:09.140'),('cmnlh1fb8000110ef6mu3lrit','cmng3liu00003c0eftdub3lwv','23232b05bd3ff9f7bd21d6fc2ff9c389af9bbf4616d0c4a21581d653a00297af','2026-04-12 08:00:13.000','2026-04-05 08:03:09.905','2026-04-05 08:00:13.508'),('cmnlh57fo0000lgef6jeaihj1','cmng3liu00003c0eftdub3lwv','41443d712ab52f199eaf89b2584ff5f2b3822f1bdcc8d9a2980bc9195a555804','2026-04-12 08:03:09.000','2026-04-05 08:03:18.474','2026-04-05 08:03:09.925'),('cmnlh5e1p0001lgef9rflhfna','cmng3liu00003c0eftdub3lwv','4c3b1923ea7b07bfdb37406edfb8ae8fc81353e5ffaa6cc28f9af2498b5baeee','2026-04-12 08:03:18.000','2026-04-05 08:14:19.840','2026-04-05 08:03:18.493'),('cmnlhjkd10002lgefwsbgjnw0','cmng3liu00003c0eftdub3lwv','c876afe94c23bd36ed72bad241bbe2028a8fb6192ccbce54f7cfcf013f2d7335','2026-04-12 08:14:19.000','2026-04-05 08:16:48.065','2026-04-05 08:14:19.862'),('cmnlhmqqf0003lgefrllzr9cf','cmng3liu00003c0eftdub3lwv','79649f2310fdc9c290270fbf6c55be085a79d8d325518cdeeb2b5bcc9dc07eec','2026-04-12 08:16:48.000','2026-04-05 08:17:54.458','2026-04-05 08:16:48.087'),('cmnlho5yf0004lgefzqwd1vpo','cmng3liu00003c0eftdub3lwv','18d63ab1be2e0aca0a0edbc4e0d1c7124c000c6b873e1f2c6c035b9b0f6917d3','2026-04-12 08:17:54.000','2026-04-05 08:18:20.731','2026-04-05 08:17:54.471'),('cmnlhoq8f0005lgefzgtrt2h5','cmng3liu00003c0eftdub3lwv','2839200ccbbbda0efdb2e7640e15ed6a19862e61146a913df84af0c433f947c9','2026-04-12 08:18:20.000','2026-04-05 08:27:46.622','2026-04-05 08:18:20.751'),('cmnli0uvh000dlgefl2qgr3o0','cmng3liu00003c0eftdub3lwv','62beab48030767b9788c44528689b0ede9ab5180f9a70b29219944ac1f0c87b4','2026-04-12 08:27:46.000','2026-04-05 08:31:48.580','2026-04-05 08:27:46.637'),('cmnli61kk000elgefjsfcsvel','cmng3liu00003c0eftdub3lwv','e0be90beaba4d2bde2239a6dbaf3725de4262d2c649da68cc1f96c2bee997c23','2026-04-12 08:31:48.000','2026-04-05 08:33:38.337','2026-04-05 08:31:48.597'),('cmnli8e9h000glgefvj8dmfrr','cmng3liu00003c0eftdub3lwv','a3bb0b7fda3bf3fda8372aadf15f51bcdae4eb4f1cb3d9cfdcae7f14c5e2a110','2026-04-12 08:33:38.000',NULL,'2026-04-05 08:33:38.357'),('cmnlikfyr0000u4efe6h04w7x','cmng3liu00003c0eftdub3lwv','4eb8d5af18532f6da074733118096064915ccd4dab7db5ec01c0d3d94ddac8ed','2026-04-12 08:43:00.000',NULL,'2026-04-05 08:43:00.435'),('cmno4m7400000x4ef1q3qt177','cmng3liu00003c0eftdub3lwv','e11d4323b15bda439a69d70afbd72690f30446eb7f735595ebac5c975108f0df','2026-04-14 04:35:46.000','2026-04-07 04:36:47.720','2026-04-07 04:35:46.176'),('cmno4nimi0001x4efn7up9sf0','cmng3liu00003c0eftdub3lwv','b507ab2058f0924a0cd13b36cd3de3398fa135ba15d4b76ac97d8fe4dcbfd568','2026-04-14 04:36:47.000',NULL,'2026-04-07 04:36:47.754');
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
INSERT INTO `reputation_ledger` VALUES ('cmng4jm69000ac0efoq1mp1yz','cmng3liu00003c0eftdub3lwv',50,'BLOG_QUALITY',NULL,NULL,'2026-04-01 14:11:36.321',NULL),('cmniii3os000004ef2dd8tgo4','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-03 06:17:52.684',NULL),('cmnlfvy3d0001u0efiy51wmg8','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:27:58.297',NULL),('cmnlfvzuq0002u0eftnbxcu3g','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:28:00.578',NULL),('cmnlfw1z30003u0ef9yyhgb33','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:28:03.327',NULL),('cmnlfw3xz0004u0efu8uyytaf','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:28:05.879',NULL),('cmnlfw62v0005u0ef5ea6hln5','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:28:08.647',NULL),('cmnlfw7sx0006u0ef68pz1o9a','cmng3liu00003c0eftdub3lwv',-50,'BLOG_QUALITY',NULL,NULL,'2026-04-05 07:28:10.881',NULL);
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
-- Table structure for table `schedule_blog_system`
--

DROP TABLE IF EXISTS `schedule_blog_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_blog_system` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prompt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_blog_system`
--

LOCK TABLES `schedule_blog_system` WRITE;
/*!40000 ALTER TABLE `schedule_blog_system` DISABLE KEYS */;
INSERT INTO `schedule_blog_system` VALUES ('1',1,'gemini-2.5-flash','Bạn là một luật sư dày dặn kinh nghiệm và là một chuyên gia content marketing. Hãy lập danh sách các tiêu đề bài viết blog cho lĩnh vực luật. Yêu cầu: \n- Tập trung vào những sai lầm phổ biến mà người dân thường mắc phải. ý tưởng phải mang tính thời sự/tranh luận.\n- Dựa vào tags đã có sẵn mà tạo ý tưởng  liên quan','2026-04-05 07:48:48.098');
/*!40000 ALTER TABLE `schedule_blog_system` ENABLE KEYS */;
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
INSERT INTO `tags` VALUES ('cmnlfwosg0007u0efmw788ht2','phan-tich-an-le-ai','Phân tích Án lệ AI','2026-04-05 07:28:32.896','2026-04-05 07:28:32.896',NULL),('cmnlfwvtw0008u0ef5xy0r1cl','thu-tuc-hanh-chinh-40','Thủ tục Hành chính 4.0','2026-04-05 07:28:42.021','2026-04-05 07:28:42.021',NULL),('cmnlfx3mk0009u0efke8k2nb7','phap-ly-khoi-nghiep','Pháp lý Khởi nghiệp','2026-04-05 07:28:52.124','2026-04-05 07:28:52.124',NULL),('cmnlfxddl000au0efanlll568','giai-ma-djieu-luat','Giải mã Điều luật','2026-04-05 07:29:04.761','2026-04-05 07:29:04.761',NULL),('cmnlfxklj000bu0efwrtqihuw','xu-huong-legal-tech','Xu hướng Legal-Tech','2026-04-05 07:29:14.119','2026-04-05 07:29:14.119',NULL),('cmnlfxutc000cu0ef6d04t89x','canh-bao-rui-ro-so','Cảnh báo Rủi ro số','2026-04-05 07:29:27.360','2026-04-05 07:29:27.360',NULL),('cmnlgrt5u0001noefq07092hf','khac','Khác','2026-04-05 07:52:44.898','2026-04-05 07:52:44.898',NULL);
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
INSERT INTO `user_contribution_scores` VALUES ('cmng4jm6j000bc0ef3j9tique','cmng3liu00003c0eftdub3lwv',0,'2026-04-01 14:11:36.331','2026-04-05 07:28:10.902');
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
  `role` enum('USER','VERIFIED_LAWYER','ADMIN','AI_BOT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
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
INSERT INTO `users` VALUES ('cmnbiumhc000ap0efeqcd7fgo','n23dvcn009@student.ptithcm.edu.vn',NULL,'2026-03-29 08:53:13.678','USER','2026-03-29 08:53:13.680','2026-03-29 08:53:13.680',NULL),('cmng3hp6h0000c0ef234062ye','lethanhdat15672@gmail.com','$2b$12$cScuzfcVgCHOOJ0RYCIXCOCO4k2lcBKU1s5PoDTv9FHsd0yv8v/bS',NULL,'USER','2026-04-01 13:42:07.289','2026-04-01 13:42:07.289',NULL),('cmng3liu00003c0eftdub3lwv','lethanhdat1567@gmail.com','$2b$12$9lbPzQnqYFEJ965tl9V7q.29VZ7sRrectxB/.ILu/G98eHFX76i5a','2026-04-01 13:45:21.269','ADMIN','2026-04-01 13:45:05.688','2026-04-05 01:48:50.362',NULL),('cmnil1gxe0003vkef2z6y4f53','datlethanh1567@gmail.com','$2b$12$W3x4Yqa1.SG0ArMUiJ8Ym.8tDvBWWdFntGQ6dASeYQI5aZF0NwK/a','2026-04-03 07:29:16.653','USER','2026-04-03 07:28:55.538','2026-04-03 07:29:16.660',NULL);
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

-- Dump completed on 2026-04-07 11:37:00
