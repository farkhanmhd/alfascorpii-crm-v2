/*
  Warnings:

  - You are about to drop the column `area` on the `Customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "area";

-- AlterTable
ALTER TABLE "Dealers" ADD COLUMN     "area" "Area";
