/*
  Warnings:

  - You are about to drop the `CustomerMotorcycles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dealers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseRanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowUps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hobbies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HouseOwnerships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncomeRanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leasings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MotorcycleTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Motorcycles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReligiousHolidays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerMotorcycles" DROP CONSTRAINT "CustomerMotorcycles_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerMotorcycles" DROP CONSTRAINT "CustomerMotorcycles_motorcycle_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_dealer_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_expense_range_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_hobby_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_house_ownership_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_income_range_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_religious_holidays_id_fkey";

-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_leasing_id_fkey";

-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_motorcycle_id_fkey";

-- DropForeignKey
ALTER TABLE "FollowUps" DROP CONSTRAINT "FollowUps_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "FollowUps" DROP CONSTRAINT "FollowUps_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Motorcycles" DROP CONSTRAINT "Motorcycles_type_id_fkey";

-- DropTable
DROP TABLE "CustomerMotorcycles";

-- DropTable
DROP TABLE "Customers";

-- DropTable
DROP TABLE "Dealers";

-- DropTable
DROP TABLE "Deals";

-- DropTable
DROP TABLE "ExpenseRanges";

-- DropTable
DROP TABLE "FollowUps";

-- DropTable
DROP TABLE "Hobbies";

-- DropTable
DROP TABLE "HouseOwnerships";

-- DropTable
DROP TABLE "IncomeRanges";

-- DropTable
DROP TABLE "Jobs";

-- DropTable
DROP TABLE "Leasings";

-- DropTable
DROP TABLE "MotorcycleTypes";

-- DropTable
DROP TABLE "Motorcycles";

-- DropTable
DROP TABLE "ReligiousHolidays";

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "Area";

-- DropEnum
DROP TYPE "CallerRelation";

-- DropEnum
DROP TYPE "FollowUpMethod";

-- DropEnum
DROP TYPE "FollowUpResult";

-- DropEnum
DROP TYPE "FollowUpStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "dealerCode" TEXT NOT NULL,
    "dealerName" TEXT NOT NULL,
    "dealerArea" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "subDistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReligiousHoliday" (
    "id" SERIAL NOT NULL,
    "holidayName" TEXT NOT NULL,
    "holidayMessage" TEXT NOT NULL,
    "holidayDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReligiousHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleType" (
    "id" SERIAL NOT NULL,
    "motorcycleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotorcycleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "chassisId" TEXT NOT NULL,
    "engineId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerMotorcycle" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "motorcycleId" INTEGER NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerMotorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "purchaseType" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "leasingId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leasing" (
    "id" SERIAL NOT NULL,
    "leasingName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasesWithLeasing" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "leasingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasesWithLeasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerJob" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "jobName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHoliday" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "holidayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDealer" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "callerRecipient" TEXT NOT NULL,
    "callerRelation" TEXT NOT NULL,
    "followUpDate" TIMESTAMP(3) NOT NULL,
    "followUpMethod" TEXT NOT NULL,
    "followUpStatus" TEXT NOT NULL,
    "followUpDetail" TEXT NOT NULL,
    "followUpResult" TEXT NOT NULL,
    "followUpMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpParticipant" (
    "id" TEXT NOT NULL,
    "followUpId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUpParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpProduct" (
    "id" TEXT NOT NULL,
    "followUpId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUpProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nik_key" ON "Customer"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasesWithLeasing_purchaseId_key" ON "PurchasesWithLeasing"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerJob_customerId_key" ON "CustomerJob"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDealer_customerId_key" ON "CustomerDealer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_followUpId_key" ON "FollowUpParticipant"("followUpId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_customerId_key" ON "FollowUpParticipant"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_userId_key" ON "FollowUpParticipant"("userId");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MotorcycleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesWithLeasing" ADD CONSTRAINT "PurchasesWithLeasing_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasesWithLeasing" ADD CONSTRAINT "PurchasesWithLeasing_leasingId_fkey" FOREIGN KEY ("leasingId") REFERENCES "Leasing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerJob" ADD CONSTRAINT "CustomerJob_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerJob" ADD CONSTRAINT "CustomerJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHoliday" ADD CONSTRAINT "CustomerHoliday_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHoliday" ADD CONSTRAINT "CustomerHoliday_holidayId_fkey" FOREIGN KEY ("holidayId") REFERENCES "ReligiousHoliday"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDealer" ADD CONSTRAINT "CustomerDealer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDealer" ADD CONSTRAINT "CustomerDealer_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpParticipant" ADD CONSTRAINT "FollowUpParticipant_followUpId_fkey" FOREIGN KEY ("followUpId") REFERENCES "FollowUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpParticipant" ADD CONSTRAINT "FollowUpParticipant_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpParticipant" ADD CONSTRAINT "FollowUpParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpProduct" ADD CONSTRAINT "FollowUpProduct_followUpId_fkey" FOREIGN KEY ("followUpId") REFERENCES "FollowUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpProduct" ADD CONSTRAINT "FollowUpProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "MotorcycleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
