/*
  Warnings:

  - Added the required column `area` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Area" AS ENUM ('Medan', 'Sumatera Utara', 'Aceh', 'Riau', 'Kepulauan Riau');

-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "area" "Area" NOT NULL;
