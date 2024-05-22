/*
  Warnings:

  - You are about to drop the column `consumerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `orderDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cartId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consummerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderDetails` DROP FOREIGN KEY `orderDetails_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderDetails` DROP FOREIGN KEY `orderDetails_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_consumerId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_authorId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `consumerId`,
    ADD COLUMN `cartId` INTEGER NOT NULL,
    ADD COLUMN `consummerId` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL;

-- DropTable
DROP TABLE `orderDetails`;

-- CreateTable
CREATE TABLE `ordersStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `status` ENUM('PAID', 'UNPAID', 'CANCELED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
