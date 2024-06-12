/*
  Warnings:

  - You are about to drop the `carousels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `carousels`;

-- CreateTable
CREATE TABLE `caraousel` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` JSON NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
