/*
  Warnings:

  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CartProducts` DROP FOREIGN KEY `_CartProducts_A_fkey`;

-- DropTable
DROP TABLE `carts`;

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
