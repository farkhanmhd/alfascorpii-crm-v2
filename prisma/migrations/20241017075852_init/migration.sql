/*
  Warnings:

  - The `tampil` column on the `Keterangan_FU` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Keterangan_FU" DROP COLUMN "tampil",
ADD COLUMN     "tampil" "Status" NOT NULL DEFAULT 'SHOW';
