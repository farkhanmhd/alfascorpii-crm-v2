/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `CustomerMotorcycle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerMotorcycle" DROP CONSTRAINT "CustomerMotorcycle_purchaseId_fkey";

-- AlterTable
ALTER TABLE "CustomerMotorcycle" DROP COLUMN "purchaseId";

-- CreateTable
CREATE TABLE "CustomerPurchases" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPurchases_purchaseId_key" ON "CustomerPurchases"("purchaseId");

-- AddForeignKey
ALTER TABLE "CustomerPurchases" ADD CONSTRAINT "CustomerPurchases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPurchases" ADD CONSTRAINT "CustomerPurchases_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
