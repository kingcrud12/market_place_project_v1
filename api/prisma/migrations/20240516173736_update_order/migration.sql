-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` ENUM('PAID', 'UNPAID', 'CANCELED') NOT NULL DEFAULT 'UNPAID';
