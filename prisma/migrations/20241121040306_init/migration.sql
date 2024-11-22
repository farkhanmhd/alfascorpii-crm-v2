/*
  Warnings:

  - You are about to drop the column `ownershipDetail` on the `HouseOwnership` table. All the data in the column will be lost.
  - Added the required column `houseOwnershipDetail` to the `CustomerHouseOwnership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerHouseOwnership" ADD COLUMN     "houseOwnershipDetail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HouseOwnership" DROP COLUMN "ownershipDetail";
