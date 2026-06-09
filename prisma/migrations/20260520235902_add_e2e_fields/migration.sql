-- AlterTable
ALTER TABLE "User" ADD COLUMN "public_key" TEXT;

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
    "expiry_hours" INTEGER,
    "read_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME,
    "is_encrypted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Message" ("conversation_id", "created_at", "expires_at", "expiry_hours", "id", "original_language", "original_text", "read_at", "recipient_id", "sender_id", "translated_text") SELECT "conversation_id", "created_at", "expires_at", "expiry_hours", "id", "original_language", "original_text", "read_at", "recipient_id", "sender_id", "translated_text" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
