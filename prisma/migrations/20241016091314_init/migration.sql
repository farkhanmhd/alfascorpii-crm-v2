/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('HIDE', 'SHOW');

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_kode_key" ON "Dealer"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_nip_key" ON "Staff"("nip");
