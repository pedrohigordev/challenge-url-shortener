-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
