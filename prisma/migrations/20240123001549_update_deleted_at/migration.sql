/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `urls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "urls" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
