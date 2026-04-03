/*
  Warnings:

  - You are about to drop the column `day_of_week` on the `schedule_blog_system` table. All the data in the column will be lost.
  - You are about to drop the column `posts_per_run` on the `schedule_blog_system` table. All the data in the column will be lost.
  - You are about to drop the column `schedule_time` on the `schedule_blog_system` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schedule_blog_system` DROP COLUMN `day_of_week`,
    DROP COLUMN `posts_per_run`,
    DROP COLUMN `schedule_time`;
