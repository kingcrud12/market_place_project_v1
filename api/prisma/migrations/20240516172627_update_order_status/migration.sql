/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `ordersStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ordersStatus_orderId_key` ON `ordersStatus`(`orderId`);
