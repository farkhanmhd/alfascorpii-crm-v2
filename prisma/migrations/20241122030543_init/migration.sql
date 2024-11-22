/*
  Warnings:

  - Changed the type of `callerRelation` on the `FollowUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CallerRelation" AS ENUM ('Direct Customer', 'Parents', 'Children', 'Spouse', 'Sibling', 'Neighbor', 'Uncle', 'Aunt', 'Nephew', 'Niece', 'Grandparents', 'Cousin', 'Friend', 'Other');

-- AlterTable
ALTER TABLE "FollowUp" DROP COLUMN "callerRelation",
ADD COLUMN     "callerRelation" "CallerRelation" NOT NULL;
