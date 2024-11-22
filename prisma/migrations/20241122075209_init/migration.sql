/*
  Warnings:

  - A unique constraint covering the columns `[dealerId]` on the table `CustomerDealer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerDealer_dealerId_key" ON "CustomerDealer"("dealerId");
