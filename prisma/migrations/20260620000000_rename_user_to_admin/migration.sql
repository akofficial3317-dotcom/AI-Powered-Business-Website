-- Rename the existing table and its database objects without losing records.
ALTER TABLE "User" RENAME TO "Admin";
ALTER TABLE "Admin" RENAME CONSTRAINT "User_pkey" TO "Admin_pkey";
ALTER INDEX "User_email_key" RENAME TO "Admin_email_key";

ALTER TABLE "Admin"
ALTER COLUMN "role" SET DEFAULT 'admin';
