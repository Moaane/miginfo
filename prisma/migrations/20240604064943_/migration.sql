/*
  Warnings:

  - You are about to drop the column `image` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `portofolios` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `partners` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `portofolios` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `icon`,
    DROP COLUMN `image`,
    ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
