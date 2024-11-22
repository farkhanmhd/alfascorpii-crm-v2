-- CreateEnum
CREATE TYPE "CallerRelation" AS ENUM ('Direct Customer', 'Father', 'Mother', 'Husband', 'Wife', 'Sister', 'Brother', 'Others');

-- CreateEnum
CREATE TYPE "FollowUpResult" AS ENUM ('Cash', 'Approve', 'Cancel', 'Reject', 'Pending', 'Not Yet');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('Contacted', 'Not Contacted', 'Delivered', 'Not Delivered');

-- CreateEnum
CREATE TYPE "FollowUpMethod" AS ENUM ('Whatsapp', 'Call');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Manager', 'Leader', 'CRO');

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp_number" TEXT,
    "instagram_link" TEXT,
    "facebook_link" TEXT,
    "email" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "job_id" INTEGER,
    "hobby_id" INTEGER,
    "house_ownership_id" INTEGER,
    "income_range_id" INTEGER,
    "expense_range_id" INTEGER,
    "religious_holidays_id" INTEGER,
    "dealer_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "job_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobbies" (
    "id" SERIAL NOT NULL,
    "hobby_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseOwnerships" (
    "id" SERIAL NOT NULL,
    "houseownership_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseOwnerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeRanges" (
    "id" SERIAL NOT NULL,
    "upper_limit" INTEGER NOT NULL,
    "lower_limit" INTEGER NOT NULL,
    "income_range" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeRanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseRanges" (
    "id" SERIAL NOT NULL,
    "upper_limit" INTEGER NOT NULL,
    "lower_limit" INTEGER NOT NULL,
    "expense_range" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseRanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReligiousHolidays" (
    "id" SERIAL NOT NULL,
    "holiday_name" TEXT NOT NULL,
    "holiday_message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReligiousHolidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorcycles" (
    "id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "chassis_id" TEXT NOT NULL,
    "engine_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Motorcycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorcycleTypes" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MotorcycleTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerMotorcycles" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "motorcycle_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerMotorcycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deals" (
    "id" TEXT NOT NULL,
    "deal_type" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,
    "motorcycle_id" INTEGER NOT NULL,
    "leasing_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealers" (
    "id" SERIAL NOT NULL,
    "dealer_code" TEXT NOT NULL,
    "dealer_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leasings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leasings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUps" (
    "id" TEXT NOT NULL,
    "caller_recipient" TEXT NOT NULL,
    "caller_relation" "CallerRelation" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "customer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "motorcycle_id" INTEGER,
    "method" "FollowUpMethod" NOT NULL,
    "status" "FollowUpStatus" NOT NULL,
    "result" "FollowUpResult" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_nik_key" ON "Customers"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_job_name_key" ON "Jobs"("job_name");

-- CreateIndex
CREATE UNIQUE INDEX "Hobbies_hobby_name_key" ON "Hobbies"("hobby_name");

-- CreateIndex
CREATE UNIQUE INDEX "HouseOwnerships_houseownership_type_key" ON "HouseOwnerships"("houseownership_type");

-- CreateIndex
CREATE UNIQUE INDEX "IncomeRanges_income_range_key" ON "IncomeRanges"("income_range");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseRanges_expense_range_key" ON "ExpenseRanges"("expense_range");

-- CreateIndex
CREATE UNIQUE INDEX "ReligiousHolidays_holiday_name_key" ON "ReligiousHolidays"("holiday_name");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycles_chassis_id_key" ON "Motorcycles"("chassis_id");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycles_engine_id_key" ON "Motorcycles"("engine_id");

-- CreateIndex
CREATE UNIQUE INDEX "MotorcycleTypes_type_name_key" ON "MotorcycleTypes"("type_name");

-- CreateIndex
CREATE UNIQUE INDEX "Dealers_dealer_code_key" ON "Dealers"("dealer_code");

-- CreateIndex
CREATE UNIQUE INDEX "Leasings_name_key" ON "Leasings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nip_key" ON "Users"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_hobby_id_fkey" FOREIGN KEY ("hobby_id") REFERENCES "Hobbies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_house_ownership_id_fkey" FOREIGN KEY ("house_ownership_id") REFERENCES "HouseOwnerships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_income_range_id_fkey" FOREIGN KEY ("income_range_id") REFERENCES "IncomeRanges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_expense_range_id_fkey" FOREIGN KEY ("expense_range_id") REFERENCES "ExpenseRanges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_religious_holidays_id_fkey" FOREIGN KEY ("religious_holidays_id") REFERENCES "ReligiousHolidays"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorcycles" ADD CONSTRAINT "Motorcycles_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "MotorcycleTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycles" ADD CONSTRAINT "CustomerMotorcycles_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerMotorcycles" ADD CONSTRAINT "CustomerMotorcycles_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "Motorcycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "Motorcycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_leasing_id_fkey" FOREIGN KEY ("leasing_id") REFERENCES "Leasings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUps" ADD CONSTRAINT "FollowUps_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUps" ADD CONSTRAINT "FollowUps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
