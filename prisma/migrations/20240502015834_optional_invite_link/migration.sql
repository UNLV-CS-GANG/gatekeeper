-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "inviteLink" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Organization_ownerId_idx" ON "Organization"("ownerId");
