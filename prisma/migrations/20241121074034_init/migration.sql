/*
  Warnings:

  - You are about to drop the column `dealerArea` on the `Dealer` table. All the data in the column will be lost.
  - Added the required column `dealerCity` to the `Dealer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dealer" DROP COLUMN "dealerArea",
ADD COLUMN     "dealerCity" TEXT NOT NULL;
