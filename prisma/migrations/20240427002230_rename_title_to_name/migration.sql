/*
  Warnings:

  - You are about to drop the column `title` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `name` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(60) NOT NULL;
