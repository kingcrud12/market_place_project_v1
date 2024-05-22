/*
  Warnings:

  - Added the required column `quantity` to the `orderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderDetails` ADD COLUMN `quantity` INTEGER NOT NULL;
