/*
  Warnings:

  - You are about to drop the `crawl_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_configs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `task_configs` DROP FOREIGN KEY `task_configs_default_prompt_id_fkey`;

-- DropTable
DROP TABLE `crawl_logs`;

-- DropTable
DROP TABLE `prompts`;

-- DropTable
DROP TABLE `task_configs`;

-- CreateTable
CREATE TABLE `chat_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT 'Cuộc trò chuyện mới',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_messages` (
    `id` VARCHAR(191) NOT NULL,
    `session_id` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'assistant', 'system') NOT NULL,
    `content` TEXT NOT NULL,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
