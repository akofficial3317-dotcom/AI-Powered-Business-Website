ALTER TABLE "NewsletterSubscriber" RENAME COLUMN "email" TO "subscribedEmail";

ALTER INDEX "NewsletterSubscriber_email_key" RENAME TO "NewsletterSubscriber_subscribedEmail_key";
