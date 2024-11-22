/*
  Warnings:

  - You are about to drop the column `lower_limit` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `upper_limt` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `lower_limit` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `upper_limt` on the `Income` table. All the data in the column will be lost.
  - Added the required column `lowerLimit` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upperLimit` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowerLimit` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upperLimit` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "lower_limit",
DROP COLUMN "upper_limt",
ADD COLUMN     "lowerLimit" INTEGER NOT NULL,
ADD COLUMN     "upperLimit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "lower_limit",
DROP COLUMN "upper_limt",
ADD COLUMN     "lowerLimit" INTEGER NOT NULL,
ADD COLUMN     "upperLimit" INTEGER NOT NULL;
