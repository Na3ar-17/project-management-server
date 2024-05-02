/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_projectId_fkey";

-- DropTable
DROP TABLE "task";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "EnumTaskPriority" NOT NULL DEFAULT 'low',
    "due_date" TEXT NOT NULL,
    "description" TEXT,
    "status" "EnumTaskStatus" NOT NULL DEFAULT 'inQueue',
    "projectId" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_tasks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "sub_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
