/*
  Warnings:

  - Changed the type of `province` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Province" AS ENUM ('Sumatera Utara', 'Aceh', 'Kepulauan Riau', 'Riau');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "province",
ADD COLUMN     "province" "Province" NOT NULL;
