/*
  Warnings:

  - You are about to alter the column `chat_expiry_hours` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `global_expiry_hours` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "requested_by" TEXT NOT NULL,
    "chat_expiry_hours" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("chat_expiry_hours", "contact_id", "created_at", "id", "requested_by", "status", "user_id") SELECT "chat_expiry_hours", "contact_id", "created_at", "id", "requested_by", "status", "user_id" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "language_code" TEXT NOT NULL DEFAULT 'it-IT',
    "flag" TEXT NOT NULL DEFAULT '🇮🇹',
    "api_key" TEXT,
    "has_api_key" BOOLEAN NOT NULL DEFAULT false,
    "preferred_voice" TEXT,
    "push_subscription" TEXT,
    "public_key" TEXT,
    "read_aloud" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT,
    "global_expiry_hours" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "language_code", "name", "password_hash", "preferred_voice", "public_key", "push_subscription", "read_aloud", "username") SELECT "api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "language_code", "name", "password_hash", "preferred_voice", "public_key", "push_subscription", "read_aloud", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
