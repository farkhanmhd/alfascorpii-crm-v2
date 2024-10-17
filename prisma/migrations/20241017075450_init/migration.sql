/*
  Warnings:

  - Added the required column `tampil` to the `Keterangan_FU` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keterangan_FU" ADD COLUMN     "tampil" TEXT NOT NULL;
