/*
  Warnings:

  - You are about to drop the `cart_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_products` DROP FOREIGN KEY `cart_products_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_products` DROP FOREIGN KEY `cart_products_productId_fkey`;

-- DropTable
DROP TABLE `cart_products`;

-- DropTable
DROP TABLE `carts`;

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consummerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartProducts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartProducts_AB_unique`(`A`, `B`),
    INDEX `_CartProducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartProducts` ADD CONSTRAINT `_CartProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
