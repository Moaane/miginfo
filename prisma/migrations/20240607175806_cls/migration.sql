/*
  Warnings:

  - Added the required column `order` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `about_pages` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `news_pages` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `service_pages` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `teams` ADD COLUMN `order` INTEGER NOT NULL;
