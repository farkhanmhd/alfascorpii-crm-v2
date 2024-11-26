/*
  Warnings:

  - You are about to drop the `CustomerMotorcycle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerMotorcycle" DROP CONSTRAINT "CustomerMotorcycle_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerMotorcycle" DROP CONSTRAINT "CustomerMotorcycle_motorcycleId_fkey";

-- DropTable
DROP TABLE "CustomerMotorcycle";
