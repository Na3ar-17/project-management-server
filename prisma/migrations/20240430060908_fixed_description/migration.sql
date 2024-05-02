/*
  Warnings:

  - You are about to drop the column `descripton` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT;
