/*
  Warnings:

  - You are about to drop the column `calendlyLink` on the `BeyondWordsService` table. All the data in the column will be lost.
  - You are about to drop the column `calendlyLink` on the `CorporateService` table. All the data in the column will be lost.
  - You are about to drop the column `calendlyLink` on the `CounsellingService` table. All the data in the column will be lost.
  - You are about to drop the column `calendlyLink` on the `MindfulnessService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BeyondWordsService" DROP COLUMN "calendlyLink",
ADD COLUMN     "serviceLink" TEXT;

-- AlterTable
ALTER TABLE "CorporateService" DROP COLUMN "calendlyLink",
ADD COLUMN     "serviceLink" TEXT;

-- AlterTable
ALTER TABLE "CounsellingService" DROP COLUMN "calendlyLink",
ADD COLUMN     "serviceLink" TEXT;

-- AlterTable
ALTER TABLE "MindfulnessService" DROP COLUMN "calendlyLink",
ADD COLUMN     "serviceLink" TEXT;

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
