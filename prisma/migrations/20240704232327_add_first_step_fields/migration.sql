/*
  Warnings:

  - Added the required column `type` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('BAKERY', 'RESTAURANT_AND_CAFE', 'OTHER');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "type" "BusinessType" NOT NULL;
