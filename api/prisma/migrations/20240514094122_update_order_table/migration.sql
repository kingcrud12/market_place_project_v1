/*
  Warnings:

  - Added the required column `productIds` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `productIds` VARCHAR(191) NOT NULL;
