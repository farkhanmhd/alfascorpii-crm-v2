/*
  Warnings:

  - Changed the type of `purchaseType` on the `Purchase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "PurchaseDealer_dealerId_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseType",
ADD COLUMN     "purchaseType" "PurchaseType" NOT NULL;
