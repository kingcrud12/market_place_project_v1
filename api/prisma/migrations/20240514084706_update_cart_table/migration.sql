/*
  Warnings:

  - You are about to drop the column `productId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CartToProduct` DROP FOREIGN KEY `_CartToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartToProduct` DROP FOREIGN KEY `_CartToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `productId`;

-- DropTable
DROP TABLE `_CartToProduct`;

-- CreateTable
CREATE TABLE `_CartProducts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartProducts_AB_unique`(`A`, `B`),
    INDEX `_CartProducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
