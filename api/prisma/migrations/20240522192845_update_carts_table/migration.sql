/*
  Warnings:

  - Added the required column `consummerId` to the `Carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Carts` ADD COLUMN `consummerId` INTEGER NOT NULL;
