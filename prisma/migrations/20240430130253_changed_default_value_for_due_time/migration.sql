-- AlterTable
ALTER TABLE "task" ALTER COLUMN "due_date" DROP DEFAULT,
ALTER COLUMN "due_date" SET DATA TYPE TEXT;
