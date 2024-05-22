/*
  Warnings:

  - You are about to alter the column `cartId` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `cartId` INTEGER NOT NULL;
