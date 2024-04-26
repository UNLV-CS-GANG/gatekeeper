-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizationId" TEXT;

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "linkCode" VARCHAR(14) NOT NULL,
    "joinCode" VARCHAR(14),
    "ownerId" TEXT NOT NULL,
    "parentOrganizationId" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminOfOrganizations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MemberOfOrganizations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_linkCode_key" ON "Organization"("linkCode");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_joinCode_key" ON "Organization"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminOfOrganizations_AB_unique" ON "_AdminOfOrganizations"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminOfOrganizations_B_index" ON "_AdminOfOrganizations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberOfOrganizations_AB_unique" ON "_MemberOfOrganizations"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberOfOrganizations_B_index" ON "_MemberOfOrganizations"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_parentOrganizationId_fkey" FOREIGN KEY ("parentOrganizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminOfOrganizations" ADD CONSTRAINT "_AdminOfOrganizations_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminOfOrganizations" ADD CONSTRAINT "_AdminOfOrganizations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberOfOrganizations" ADD CONSTRAINT "_MemberOfOrganizations_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberOfOrganizations" ADD CONSTRAINT "_MemberOfOrganizations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
