-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Manager', 'Leader', 'CRO');

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('Sumatera Utara', 'Aceh', 'Kepulauan Riau', 'Riau');

-- CreateEnum
CREATE TYPE "CallerRelation" AS ENUM ('Direct Customer', 'Parents', 'Children', 'Spouse', 'Sibling', 'Neighbor', 'Uncle', 'Aunt', 'Nephew', 'Niece', 'Grandparents', 'Cousin', 'Friend', 'Other');

-- CreateEnum
CREATE TYPE "FollowUpMethod" AS ENUM ('CALL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('Contacted', 'Not Contacted', 'Delivered', 'Not Delivered');

-- CreateEnum
CREATE TYPE "FollowUpDetail" AS ENUM ('Not Interested', 'Not Yet', 'Busy', 'Cold', 'Warm', 'Hot', 'Unanswered', 'Unregistered', 'Unreachable', 'Wrong Number', 'Wrong Connection', 'Inactive');

-- CreateEnum
CREATE TYPE "FollowUpResult" AS ENUM ('Cash', 'Approve', 'Cancel', 'Reject', 'Pending', 'Not Yet');

-- CreateEnum
CREATE TYPE "HouseOwnershipStatus" AS ENUM ('Owned', 'Parents Property', 'Rented', 'Moving', 'Official House', 'Others');

-- CreateEnum
CREATE TYPE "FinancialLevel" AS ENUM ('Very Low', 'Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" SERIAL NOT NULL,
    "dealerCode" TEXT NOT NULL,
    "dealerName" TEXT NOT NULL,
    "dealerCity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "subDistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReligiousHoliday" (
    "id" SERIAL NOT NULL,
    "holidayName" TEXT NOT NULL,
    "holidayMessage" TEXT NOT NULL,
    "holidayDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReligiousHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleType" (
    "id" SERIAL NOT NULL,
    "motorcycleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerMotorcycle" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "motorcycleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerMotorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerPurchases" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "purchaseType" TEXT NOT NULL,
    "purchaseAmount" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leasing" (
    "id" SERIAL NOT NULL,
    "leasingName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasesWithLeasing" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "leasingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasesWithLeasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerJob" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "jobName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHoliday" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "holidayId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseDealer" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "dealerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseDealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "callerRecipient" TEXT NOT NULL,
    "callerRelation" "CallerRelation" NOT NULL,
    "followUpDate" TIMESTAMP(3) NOT NULL,
    "followUpMethod" "FollowUpMethod" NOT NULL,
    "followUpStatus" "FollowUpStatus" NOT NULL,
    "followUpDetail" "FollowUpDetail" NOT NULL,
    "followUpResult" "FollowUpResult" NOT NULL,
    "followUpMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpParticipant" (
    "id" TEXT NOT NULL,
    "followUpId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUpParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpProduct" (
    "id" TEXT NOT NULL,
    "followUpId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUpProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseOwnership" (
    "id" SERIAL NOT NULL,
    "ownershipStatus" "HouseOwnershipStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseOwnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHouseOwnership" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "houseOwnershipId" INTEGER NOT NULL,
    "houseOwnershipDetail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerHouseOwnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "hobbyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHobby" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    "hobbyDetail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerHobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "upperLimit" INTEGER NOT NULL,
    "lowerLimit" INTEGER NOT NULL,
    "incomeDetail" TEXT NOT NULL,
    "incomeLevel" "FinancialLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "upperLimit" INTEGER NOT NULL,
    "lowerLimit" INTEGER NOT NULL,
    "expenseDetail" TEXT NOT NULL,
    "expenseLevel" "FinancialLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerFinancial" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "incomeId" INTEGER NOT NULL,
    "expenseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerFinancial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nik_key" ON "Customer"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPurchases_purchaseId_key" ON "CustomerPurchases"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasesWithLeasing_purchaseId_key" ON "PurchasesWithLeasing"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerJob_customerId_key" ON "CustomerJob"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseDealer_purchaseId_key" ON "PurchaseDealer"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseDealer_dealerId_key" ON "PurchaseDealer"("dealerId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_followUpId_key" ON "FollowUpParticipant"("followUpId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_customerId_key" ON "FollowUpParticipant"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowUpParticipant_userId_key" ON "FollowUpParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerHouseOwnership_customerId_key" ON "CustomerHouseOwnership"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerHobby_customerId_key" ON "CustomerHobby"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerFinancial_customerId_key" ON "CustomerFinancial"("customerId");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MotorcycleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycle" ADD CONSTRAINT "CustomerMotorcycle_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPurchases" ADD CONSTRAINT "CustomerPurchases_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPurchases" ADD CONSTRAINT "CustomerPurchases_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "PurchaseDealer" ADD CONSTRAINT "PurchaseDealer_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDealer" ADD CONSTRAINT "PurchaseDealer_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "CustomerHouseOwnership" ADD CONSTRAINT "CustomerHouseOwnership_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHouseOwnership" ADD CONSTRAINT "CustomerHouseOwnership_houseOwnershipId_fkey" FOREIGN KEY ("houseOwnershipId") REFERENCES "HouseOwnership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHobby" ADD CONSTRAINT "CustomerHobby_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerHobby" ADD CONSTRAINT "CustomerHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFinancial" ADD CONSTRAINT "CustomerFinancial_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFinancial" ADD CONSTRAINT "CustomerFinancial_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFinancial" ADD CONSTRAINT "CustomerFinancial_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
