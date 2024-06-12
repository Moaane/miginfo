/*
  Warnings:

  - You are about to drop the column `active` on the `carousels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `carousels` DROP COLUMN `active`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
