/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "EnumTaskPriority" AS ENUM ('low', 'normal', 'high');

-- CreateEnum
CREATE TYPE "EnumTaskStatus" AS ENUM ('inQueue', 'onProgress', 'testing', 'completed');

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "prioryty" "EnumTaskPriority" NOT NULL DEFAULT 'low',
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripton" TEXT,
    "status" "EnumTaskStatus" NOT NULL DEFAULT 'inQueue',
    "projectId" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
