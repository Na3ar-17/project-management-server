/*
  Warnings:

  - You are about to drop the column `previous_status` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "previous_status",
ADD COLUMN     "been_completed_before" BOOLEAN NOT NULL DEFAULT false;
