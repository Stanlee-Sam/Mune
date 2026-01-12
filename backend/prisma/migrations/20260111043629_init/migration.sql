-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('MONITOR', 'BOOK_VET', 'SEE_VET', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'VET');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "SymptomCategory" AS ENUM ('GI', 'RESPIRATORY', 'BEHAVIORAL', 'REPRODUCTIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "OutbreakStatus" AS ENUM ('ACTIVE', 'RESOLVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OWNER',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PetType" NOT NULL DEFAULT 'CAT',
    "birthDate" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SymptomCategory" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "riskLevel" "RiskLevel" NOT NULL,
    "action" "Action" NOT NULL,
    "isOverride" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "minDurationHrs" INTEGER,
    "ageLimitMonths" INTEGER,
    "outbreakActive" BOOLEAN,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleSymptom" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "symptomId" TEXT NOT NULL,

    CONSTRAINT "RuleSymptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutbreakReport" (
    "id" TEXT NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "vetId" TEXT NOT NULL,
    "status" "OutbreakStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutbreakReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VetClinic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyAvailable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VetClinic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSymptom" ADD CONSTRAINT "RuleSymptom_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSymptom" ADD CONSTRAINT "RuleSymptom_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutbreakReport" ADD CONSTRAINT "OutbreakReport_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
