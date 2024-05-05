-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_project_id_fkey";

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
