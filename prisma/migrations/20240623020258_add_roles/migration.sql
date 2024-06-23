/*
  Warnings:

  - You are about to drop the column `language` on the `Chat` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUSINESS', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "language";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';
