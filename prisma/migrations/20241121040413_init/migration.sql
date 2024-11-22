/*
  Warnings:

  - You are about to drop the column `hobbyDetail` on the `Hobby` table. All the data in the column will be lost.
  - Added the required column `hobbyDetail` to the `CustomerHobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerHobby" ADD COLUMN     "hobbyDetail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hobby" DROP COLUMN "hobbyDetail";
