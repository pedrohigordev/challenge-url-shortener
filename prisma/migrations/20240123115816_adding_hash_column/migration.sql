/*
  Warnings:

  - You are about to drop the column `shortened_url` on the `urls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "urls" DROP COLUMN "shortened_url",
ADD COLUMN     "hash" TEXT NOT NULL DEFAULT 'wwwwww';
