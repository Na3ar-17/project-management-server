-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_user_id_fkey";

-- DropForeignKey
ALTER TABLE "statistics" DROP CONSTRAINT "statistics_project_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_projectId_fkey";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
