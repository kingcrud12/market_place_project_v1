/*
  Warnings:

  - Added the required column `authorId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `authorId` INTEGER NOT NULL;
