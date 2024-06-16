/*
  Warnings:

  - You are about to drop the column `authorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the `_CartProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CartProducts` DROP FOREIGN KEY `_CartProducts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartProducts` DROP FOREIGN KEY `_CartProducts_B_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `authorId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `updatedAt`,
    MODIFY `price` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `_CartProducts`;

-- CreateTable
CREATE TABLE `cartsProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartsProducts` ADD CONSTRAINT `cartsProducts_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartsProducts` ADD CONSTRAINT `cartsProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
