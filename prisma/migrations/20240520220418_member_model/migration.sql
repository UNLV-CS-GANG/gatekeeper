/*
  Warnings:

  - You are about to drop the `_AdminOfOrganizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MemberOfOrganizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdminOfOrganizations" DROP CONSTRAINT "_AdminOfOrganizations_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminOfOrganizations" DROP CONSTRAINT "_AdminOfOrganizations_B_fkey";

-- DropForeignKey
ALTER TABLE "_MemberOfOrganizations" DROP CONSTRAINT "_MemberOfOrganizations_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberOfOrganizations" DROP CONSTRAINT "_MemberOfOrganizations_B_fkey";

-- DropTable
DROP TABLE "_AdminOfOrganizations";

-- DropTable
DROP TABLE "_MemberOfOrganizations";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Member_organizationId_idx" ON "Member"("organizationId");

-- CreateIndex
CREATE INDEX "Member_userId_idx" ON "Member"("userId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
