/*
  Warnings:

  - Added the required column `contactMethod` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContactMethodType" AS ENUM ('PHONE', 'EMAIL', 'WHATSAPP');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "contactMethod" "ContactMethodType" NOT NULL;
