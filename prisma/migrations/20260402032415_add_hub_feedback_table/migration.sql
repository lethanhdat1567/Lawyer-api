-- CreateTable
CREATE TABLE `hub_feedbacks` (
    `id` VARCHAR(191) NOT NULL,
    `hub_id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `rawResponse` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hub_feedbacks_hub_id_key`(`hub_id`),
    INDEX `hub_feedbacks_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hub_feedbacks` ADD CONSTRAINT `hub_feedbacks_hub_id_fkey` FOREIGN KEY (`hub_id`) REFERENCES `hub_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
