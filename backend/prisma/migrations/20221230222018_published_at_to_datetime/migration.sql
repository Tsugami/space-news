/*
  Warnings:

  - Changed the type of `publishedAt` on the `articles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "publishedAt",
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL;
