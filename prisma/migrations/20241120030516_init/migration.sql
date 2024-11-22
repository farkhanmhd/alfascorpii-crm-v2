/*
  Warnings:

  - Made the column `area` on table `Dealers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dealers" ALTER COLUMN "area" SET NOT NULL;
