-- CreateTable
CREATE TABLE "BoothRequest" (
    "id" TEXT NOT NULL,
    "boothNumber" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoothRequest_pkey" PRIMARY KEY ("id")
);
