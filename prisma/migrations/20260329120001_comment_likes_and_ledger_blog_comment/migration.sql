-- AlterTable
ALTER TABLE `reputation_ledger` ADD COLUMN `ref_blog_comment_id` VARCHAR(191) NULL,
    MODIFY `reason` ENUM('HUB_REPLY_HELPFUL', 'BLOG_QUALITY', 'BLOG_COMMENT_HELPFUL', 'MOD_ADJUSTMENT', 'ADMIN_BONUS', 'ADMIN_PENALTY') NOT NULL;

-- CreateTable
CREATE TABLE `hub_comment_likes` (
    `user_id` VARCHAR(191) NOT NULL,
    `hub_comment_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `hub_comment_likes_hub_comment_id_idx`(`hub_comment_id`),
    PRIMARY KEY (`user_id`, `hub_comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_comment_likes` (
    `user_id` VARCHAR(191) NOT NULL,
    `blog_comment_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `blog_comment_likes_blog_comment_id_idx`(`blog_comment_id`),
    PRIMARY KEY (`user_id`, `blog_comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hub_comment_likes` ADD CONSTRAINT `hub_comment_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hub_comment_likes` ADD CONSTRAINT `hub_comment_likes_hub_comment_id_fkey` FOREIGN KEY (`hub_comment_id`) REFERENCES `hub_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_comment_likes` ADD CONSTRAINT `blog_comment_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_comment_likes` ADD CONSTRAINT `blog_comment_likes_blog_comment_id_fkey` FOREIGN KEY (`blog_comment_id`) REFERENCES `blog_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reputation_ledger` ADD CONSTRAINT `reputation_ledger_ref_blog_comment_id_fkey` FOREIGN KEY (`ref_blog_comment_id`) REFERENCES `blog_comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
