/*
  Warnings:

  - You are about to drop the column `direction` on the `news_pages` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `news_pages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `news_pages` DROP COLUMN `direction`,
    DROP COLUMN `image`;
