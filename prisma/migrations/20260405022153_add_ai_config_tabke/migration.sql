-- CreateTable
CREATE TABLE `ai_configs` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `advisor_prompt` TEXT NOT NULL,
    `community_prompt` TEXT NOT NULL,
    `blog_prompt` TEXT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
