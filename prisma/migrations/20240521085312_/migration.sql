/*
  Warnings:

  - You are about to drop the column `category_id` on the `client_categories` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `client_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `event_categories` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `event_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `news_categories` table. All the data in the column will be lost.
  - You are about to drop the column `news_id` on the `news_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `partner_categories` table. All the data in the column will be lost.
  - You are about to drop the column `partner_id` on the `partner_categories` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `event_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `client_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `event_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `news_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `partner_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `client_categories` DROP FOREIGN KEY `client_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `client_categories` DROP FOREIGN KEY `client_categories_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_categories` DROP FOREIGN KEY `event_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_categories` DROP FOREIGN KEY `event_categories_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `news_categories` DROP FOREIGN KEY `news_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `news_categories` DROP FOREIGN KEY `news_categories_news_id_fkey`;

-- DropForeignKey
ALTER TABLE `partner_categories` DROP FOREIGN KEY `partner_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `partner_categories` DROP FOREIGN KEY `partner_categories_partner_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_categories` DROP FOREIGN KEY `service_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_categories` DROP FOREIGN KEY `service_categories_service_id_fkey`;

-- DropIndex
DROP INDEX `client_categories_client_id_category_id_key` ON `client_categories`;

-- DropIndex
DROP INDEX `event_categories_event_id_category_id_key` ON `event_categories`;

-- DropIndex
DROP INDEX `news_categories_news_id_category_id_key` ON `news_categories`;

-- DropIndex
DROP INDEX `partner_categories_partner_id_category_id_key` ON `partner_categories`;

-- AlterTable
ALTER TABLE `client_categories` DROP COLUMN `category_id`,
    DROP COLUMN `client_id`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `event_categories` DROP COLUMN `category_id`,
    DROP COLUMN `event_id`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `news_categories` DROP COLUMN `category_id`,
    DROP COLUMN `news_id`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `partner_categories` DROP COLUMN `category_id`,
    DROP COLUMN `partner_id`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `services` ADD COLUMN `status` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `service_categories`;

-- CreateTable
CREATE TABLE `services_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_categories_join` (
    `service_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `service_categories_join_service_id_category_id_key`(`service_id`, `category_id`),
    PRIMARY KEY (`service_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partner_categories_join` (
    `partnerId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `partner_categories_join_partnerId_categoryId_key`(`partnerId`, `categoryId`),
    PRIMARY KEY (`partnerId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_categories_join` (
    `client_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `client_categories_join_client_id_category_id_key`(`client_id`, `category_id`),
    PRIMARY KEY (`client_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_categories_join` (
    `news_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `news_categories_join_news_id_category_id_key`(`news_id`, `category_id`),
    PRIMARY KEY (`news_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_categories_join` (
    `eventId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `event_categories_join_eventId_categoryId_key`(`eventId`, `categoryId`),
    PRIMARY KEY (`eventId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `event_categories_name_key` ON `event_categories`(`name`);

-- AddForeignKey
ALTER TABLE `service_categories_join` ADD CONSTRAINT `service_categories_join_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_categories_join` ADD CONSTRAINT `service_categories_join_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `services_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_categories_join` ADD CONSTRAINT `partner_categories_join_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_categories_join` ADD CONSTRAINT `partner_categories_join_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `partner_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_categories_join` ADD CONSTRAINT `client_categories_join_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_categories_join` ADD CONSTRAINT `client_categories_join_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `client_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_categories_join` ADD CONSTRAINT `news_categories_join_news_id_fkey` FOREIGN KEY (`news_id`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news_categories_join` ADD CONSTRAINT `news_categories_join_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `news_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_categories_join` ADD CONSTRAINT `event_categories_join_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_categories_join` ADD CONSTRAINT `event_categories_join_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `event_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
