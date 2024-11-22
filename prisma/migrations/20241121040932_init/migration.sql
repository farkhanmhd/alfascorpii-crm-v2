/*
  Warnings:

  - Changed the type of `incomeDetail` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `incomeLevel` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Income" DROP COLUMN "incomeDetail",
ADD COLUMN     "incomeDetail" TEXT NOT NULL,
DROP COLUMN "incomeLevel",
ADD COLUMN     "incomeLevel" "FinancialLevel" NOT NULL;
