-- Purge rows that were soft-deleted (about to drop deleted_at columns).
DELETE FROM `blog_comments` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `blog_posts` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `tags` WHERE `deleted_at` IS NOT NULL;

DELETE FROM `hub_comments` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `hub_posts` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `hub_categories` WHERE `deleted_at` IS NOT NULL;

DELETE FROM `lawyer_verifications` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `assistant_conversations` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `profiles` WHERE `deleted_at` IS NOT NULL;
DELETE FROM `users` WHERE `deleted_at` IS NOT NULL;

ALTER TABLE `users` DROP COLUMN `deleted_at`;
ALTER TABLE `profiles` DROP COLUMN `deleted_at`;
ALTER TABLE `lawyer_verifications` DROP COLUMN `deleted_at`;
ALTER TABLE `assistant_conversations` DROP COLUMN `deleted_at`;
ALTER TABLE `hub_categories` DROP COLUMN `deleted_at`;
ALTER TABLE `hub_posts` DROP COLUMN `deleted_at`;
ALTER TABLE `hub_comments` DROP COLUMN `deleted_at`;
ALTER TABLE `blog_posts` DROP COLUMN `deleted_at`;
ALTER TABLE `tags` DROP COLUMN `deleted_at`;
ALTER TABLE `blog_comments` DROP COLUMN `deleted_at`;
