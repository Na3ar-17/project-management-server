/*
  Warnings:

  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_project_id_fkey";

-- DropTable
DROP TABLE "Statistics";

-- CreateTable
CREATE TABLE "statistics" (
    "project_id" TEXT NOT NULL,
    "tasks_completed" INTEGER NOT NULL DEFAULT 0,
    "tasks_created" INTEGER NOT NULL DEFAULT 0,
    "tasks_deleted" INTEGER NOT NULL DEFAULT 0,
    "members" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("project_id")
);

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
