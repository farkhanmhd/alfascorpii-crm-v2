/*
  Warnings:

  - You are about to drop the column `kategori_hasil` on the `Keterangan_Hasil` table. All the data in the column will be lost.
  - You are about to drop the column `keterangan` on the `Keterangan_Hasil` table. All the data in the column will be lost.
  - Added the required column `keterangan_hasil` to the `Keterangan_Hasil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keterangan_Hasil" DROP COLUMN "kategori_hasil",
DROP COLUMN "keterangan",
ADD COLUMN     "keterangan_hasil" TEXT NOT NULL;
