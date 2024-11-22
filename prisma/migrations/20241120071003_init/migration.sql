/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CustomerMotorcycles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CustomerMotorcycles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Dealers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Dealers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Deals` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Deals` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ExpenseRanges` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ExpenseRanges` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FollowUps` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FollowUps` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `HouseOwnerships` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `HouseOwnerships` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `IncomeRanges` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `IncomeRanges` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Leasings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Leasings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `MotorcycleTypes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MotorcycleTypes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Motorcycles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Motorcycles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReligiousHolidays` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ReligiousHolidays` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerMotorcycles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Dealers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Deals" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ExpenseRanges" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FollowUps" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Hobbies" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "HouseOwnerships" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "IncomeRanges" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Leasings" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MotorcycleTypes" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Motorcycles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ReligiousHolidays" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
