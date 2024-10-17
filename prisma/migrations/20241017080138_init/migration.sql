/*
  Warnings:

  - You are about to drop the column `status` on the `Keterangan_Hasil` table. All the data in the column will be lost.
  - Added the required column `status_fu` to the `Keterangan_Hasil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keterangan_Hasil" DROP COLUMN "status",
ADD COLUMN     "status_fu" TEXT NOT NULL;
