/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "backgroundImage",
DROP COLUMN "profileImage",
ADD COLUMN     "backgroundImageUrl" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;
