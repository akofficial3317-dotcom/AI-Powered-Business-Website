-- Add optional Admin ownership/management references without removing existing data.
ALTER TABLE "Blog" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "Inquiry" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "Feedback" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "Event" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "ChatHistory" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "GalleryImage" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "NewsletterSubscriber" ADD COLUMN "managedById" INTEGER;
ALTER TABLE "EventRegistration" ADD COLUMN "managedById" INTEGER;

-- Associate existing records with the first current Admin, when one exists.
UPDATE "Blog" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "Inquiry" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "Feedback" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "Event" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "ChatHistory" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "GalleryImage" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "NewsletterSubscriber" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);
UPDATE "EventRegistration" SET "managedById" = (SELECT "id" FROM "Admin" ORDER BY "id" LIMIT 1);

CREATE INDEX "Blog_managedById_idx" ON "Blog"("managedById");
CREATE INDEX "Inquiry_managedById_idx" ON "Inquiry"("managedById");
CREATE INDEX "Feedback_managedById_idx" ON "Feedback"("managedById");
CREATE INDEX "Event_managedById_idx" ON "Event"("managedById");
CREATE INDEX "ChatHistory_managedById_idx" ON "ChatHistory"("managedById");
CREATE INDEX "GalleryImage_managedById_idx" ON "GalleryImage"("managedById");
CREATE INDEX "NewsletterSubscriber_managedById_idx" ON "NewsletterSubscriber"("managedById");
CREATE INDEX "EventRegistration_managedById_idx" ON "EventRegistration"("managedById");

ALTER TABLE "Blog" ADD CONSTRAINT "Blog_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Event" ADD CONSTRAINT "Event_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ChatHistory" ADD CONSTRAINT "ChatHistory_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "NewsletterSubscriber" ADD CONSTRAINT "NewsletterSubscriber_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
