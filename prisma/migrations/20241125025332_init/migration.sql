/*
  Warnings:

  - The primary key for the `Motorcycle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CustomerMotorcycle" DROP CONSTRAINT "CustomerMotorcycle_motorcycleId_fkey";

-- AlterTable
ALTER TABLE "CustomerMotorcycle" ALTER COLUMN "motorcycleId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Motorcycle" DROP CONSTRAINT "Motorcycle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Motorcycle_id_seq";

-- CreateTable
CREATE TABLE "PurchaseMotorcycle" (
    "id" TEXT NOT NULL,
    "motorcycleId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseMotorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseMotorcycle_motorcycleId_key" ON "PurchaseMotorcycle"("motorcycleId");

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseMotorcycle" ADD CONSTRAINT "PurchaseMotorcycle_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseMotorcycle" ADD CONSTRAINT "PurchaseMotorcycle_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
