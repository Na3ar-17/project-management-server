/*
  Warnings:

  - You are about to drop the column `createdBy` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "createdBy",
ADD COLUMN     "memberId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "companyName";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
