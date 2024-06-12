/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `imageUrl`,
    ADD COLUMN `image` JSON NULL;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `imageUrl`,
    ADD COLUMN `image` JSON NULL;

-- AlterTable
ALTER TABLE `partners` DROP COLUMN `imageUrl`,
    ADD COLUMN `image` JSON NULL;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `iconUrl`,
    DROP COLUMN `imageUrl`,
    ADD COLUMN `icon` JSON NULL,
    ADD COLUMN `image` JSON NULL;
