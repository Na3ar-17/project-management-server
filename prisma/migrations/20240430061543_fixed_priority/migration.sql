/*
  Warnings:

  - You are about to drop the column `prioryty` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "prioryty",
ADD COLUMN     "priority" "EnumTaskPriority" NOT NULL DEFAULT 'low';
