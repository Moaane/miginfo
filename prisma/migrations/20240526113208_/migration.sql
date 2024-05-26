/*
  Warnings:

  - The primary key for the `client_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `client_categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `client_categories` table. All the data in the column will be lost.
  - The primary key for the `event_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `event_categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `event_categories` table. All the data in the column will be lost.
  - The primary key for the `news_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `news_categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `news_categories` table. All the data in the column will be lost.
  - The primary key for the `partner_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `partner_categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `partner_categories` table. All the data in the column will be lost.
  - You are about to drop the `client_categories_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_categories_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news_categories_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partner_categories_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_categories_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services_categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[client_id,category_id]` on the table `client_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[news_id,category_id]` on the table `event_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[news_id,category_id]` on the table `news_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[partnerId,categoryId]` on the table `partner_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `client_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `client_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `event_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_id` to the `event_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `news_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_id` to the `news_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `partner_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnerId` to the `partner_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `client_categories_join` DROP FOREIGN KEY `client_categories_join_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `client_categories_join` DROP FOREIGN KEY `client_categories_join_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_categories_join` DROP FOREIGN KEY `event_categories_join_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `event_categories_join` DROP FOREIGN KEY `event_categories_join_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `news_categories_join` DROP FOREIGN KEY `news_categories_join_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `news_categories_join` DROP FOREIGN KEY `news_categories_join_news_id_fkey`;

-- DropForeignKey
ALTER TABLE `partner_categories_join` DROP FOREIGN KEY `partner_categories_join_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `partner_categories_join` DROP FOREIGN KEY `partner_categories_join_partnerId_fkey`;

-- DropForeignKey
ALTER TABLE `service_categories_join` DROP FOREIGN KEY `service_categories_join_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_categories_join` DROP FOREIGN KEY `service_categories_join_service_id_fkey`;

-- DropIndex
DROP INDEX `event_categories_name_key` ON `event_categories`;

-- AlterTable
ALTER TABLE `client_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `client_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`client_id`, `category_id`);

-- AlterTable
ALTER TABLE `event_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `news_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`news_id`, `category_id`);

-- AlterTable
ALTER TABLE `news` ADD COLUMN `type` ENUM('NEWS', 'EVENT') NOT NULL DEFAULT 'NEWS';

-- AlterTable
ALTER TABLE `news_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `news_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`news_id`, `category_id`);

-- AlterTable
ALTER TABLE `partner_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `partnerId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`partnerId`, `categoryId`);

-- DropTable
DROP TABLE `client_categories_join`;

-- DropTable
DROP TABLE `event_categories_join`;

-- DropTable
DROP TABLE `events`;

-- DropTable
DROP TABLE `news_categories_join`;

-- DropTable
DROP TABLE `partner_categories_join`;

-- DropTable
DROP TABLE `service_categories_join`;

-- DropTable
DROP TABLE `services_categories`;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('SERVICE', 'PARTNER', 'CLIENT', 'NEWS', 'EVENT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_categories` (
    `serviceId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `service_categories_serviceId_categoryId_key`(`serviceId`, `categoryId`),
    PRIMARY KEY (`serviceId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `client_categories_client_id_category_id_key` ON `client_categories`(`client_id`, `category_id`);

-- CreateIndex
CREATE UNIQUE INDEX `event_categories_news_id_category_id_key` ON `event_categories`(`news_id`, `category_id`);

-- CreateIndex
CREATE UNIQUE INDEX `news_categories_news_id_category_id_key` ON `news_categories`(`news_id`, `category_id`);

-- CreateIndex
CREATE UNIQUE INDEX `partner_categories_partnerId_categoryId_key` ON `partner_categories`(`partnerId`, `categoryId`);

-- CreateIndex
CREATE UNIQUE INDEX `sessions_user_id_key` ON `sessions`(`user_id`);

-- AddForeignKey
ALTER TABLE `service_categories` ADD CONSTRAINT `service_categories_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_categories` ADD CONSTRAINT `service_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_categories` ADD CONSTRAINT `partner_categories_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_categories` ADD CONSTRAINT `partner_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_categories` ADD CONSTRAINT `client_categories_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_categories` ADD CONSTRAINT `client_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_categories` ADD CONSTRAINT `news_categories_news_id_fkey` FOREIGN KEY (`news_id`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_categories` ADD CONSTRAINT `news_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_categories` ADD CONSTRAINT `event_categories_news_id_fkey` FOREIGN KEY (`news_id`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_categories` ADD CONSTRAINT `event_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
