-- DropIndex
DROP INDEX `products_authorId_fkey` ON `products`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
