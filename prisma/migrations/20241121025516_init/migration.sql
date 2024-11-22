/*
  Warnings:

  - Changed the type of `followUpMethod` on the `FollowUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followUpStatus` on the `FollowUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followUpDetail` on the `FollowUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followUpResult` on the `FollowUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Manager', 'Leader', 'CRO');

-- CreateEnum
CREATE TYPE "FollowUpMethod" AS ENUM ('CALL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('Contacted', 'Not Contacted', 'Delivered', 'Not Delivered');

-- CreateEnum
CREATE TYPE "FollowUpDetail" AS ENUM ('Not Interested', 'Not Yet', 'Busy', 'Cold', 'Warm', 'Hot', 'Unanswered', 'Unregistered', 'Unreachable', 'Wrong Number', 'Wrong Connection', 'Inactive');

-- CreateEnum
CREATE TYPE "FollowUpResult" AS ENUM ('Cash', 'Approve', 'Cancel', 'Reject', 'Pending', 'Not Yet');

-- AlterTable
ALTER TABLE "FollowUp" DROP COLUMN "followUpMethod",
ADD COLUMN     "followUpMethod" "FollowUpMethod" NOT NULL,
DROP COLUMN "followUpStatus",
ADD COLUMN     "followUpStatus" "FollowUpStatus" NOT NULL,
DROP COLUMN "followUpDetail",
ADD COLUMN     "followUpDetail" "FollowUpDetail" NOT NULL,
DROP COLUMN "followUpResult",
ADD COLUMN     "followUpResult" "FollowUpResult" NOT NULL;
