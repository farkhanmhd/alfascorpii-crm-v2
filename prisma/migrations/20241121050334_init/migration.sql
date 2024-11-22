/*
  Warnings:

  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
