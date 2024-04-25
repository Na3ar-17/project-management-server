-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "file_name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);
