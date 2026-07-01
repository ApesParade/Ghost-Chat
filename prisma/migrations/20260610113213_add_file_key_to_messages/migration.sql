/*
  Warnings:

  - You are about to drop the column `audio_data` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `image_data` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `video_data` on the `Message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversation_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "translated_text" TEXT NOT NULL,
    "original_text" TEXT,
    "original_language" TEXT,
    "expiry_hours" REAL,
    "read_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME,
    "is_encrypted" BOOLEAN NOT NULL DEFAULT false,
    "reactions" TEXT,
    "type" TEXT NOT NULL DEFAULT 'text',
    "file_key" TEXT
);
INSERT INTO "new_Message" ("conversation_id", "created_at", "expires_at", "expiry_hours", "id", "is_encrypted", "original_language", "original_text", "reactions", "read_at", "recipient_id", "sender_id", "translated_text", "type") SELECT "conversation_id", "created_at", "expires_at", "expiry_hours", "id", "is_encrypted", "original_language", "original_text", "reactions", "read_at", "recipient_id", "sender_id", "translated_text", "type" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE INDEX "Message_conversation_id_created_at_idx" ON "Message"("conversation_id", "created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
