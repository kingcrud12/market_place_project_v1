/*
  Warnings:

  - You are about to alter the column `productId` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `productId` INTEGER NOT NULL;
