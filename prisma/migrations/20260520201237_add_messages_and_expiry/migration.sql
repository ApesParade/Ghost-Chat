/*
  Warnings:

  - You are about to drop the `ActiveConversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "global_expiry_hours" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActiveConversation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversation_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "translated_text" TEXT NOT NULL,
    "original_text" TEXT,
    "original_language" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME
);
