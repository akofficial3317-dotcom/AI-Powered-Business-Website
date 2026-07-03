-- AlterTable
ALTER TABLE "Event" ADD COLUMN "eventType" TEXT NOT NULL DEFAULT 'Event';
ALTER TABLE "Event" ADD COLUMN "availability" TEXT;
ALTER TABLE "Event" ADD COLUMN "registrationEnabled" BOOLEAN NOT NULL DEFAULT true;
