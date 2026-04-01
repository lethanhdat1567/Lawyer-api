/*
  Warnings:

  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `reports_handled_by_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `reports_reporter_id_fkey`;

-- DropTable
DROP TABLE `reports`;
