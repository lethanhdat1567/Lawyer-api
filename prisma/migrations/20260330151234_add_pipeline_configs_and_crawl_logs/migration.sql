-- CreateTable
CREATE TABLE `prompts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `task_type` ENUM('HTML_CLEANING', 'CLASSIFICATION', 'METADATA_EXTRACT', 'EMBEDDING') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `prompts_name_key`(`name`),
    INDEX `prompts_task_type_idx`(`task_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_configs` (
    `id` VARCHAR(191) NOT NULL,
    `task_type` ENUM('HTML_CLEANING', 'CLASSIFICATION', 'METADATA_EXTRACT', 'EMBEDDING') NOT NULL,
    `model_name` VARCHAR(191) NOT NULL,
    `default_prompt_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `task_configs_task_type_key`(`task_type`),
    INDEX `task_configs_is_active_idx`(`is_active`),
    INDEX `task_configs_default_prompt_id_idx`(`default_prompt_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crawl_logs` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `status` ENUM('SUCCESS', 'FAILED', 'NO_CHANGE') NOT NULL,
    `content_hash` VARCHAR(191) NULL,
    `full_text_hash` VARCHAR(191) NULL,
    `error_message` TEXT NULL,
    `started_at` DATETIME(3) NULL,
    `finished_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `crawl_logs_url_created_at_idx`(`url`, `created_at`),
    INDEX `crawl_logs_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task_configs` ADD CONSTRAINT `task_configs_default_prompt_id_fkey` FOREIGN KEY (`default_prompt_id`) REFERENCES `prompts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
