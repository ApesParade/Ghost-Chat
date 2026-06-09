-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "recording_beep" TEXT DEFAULT 'pop',
    "push_subscription" TEXT,
    "public_key" TEXT,
    "avatar" TEXT,
    "global_expiry_hours" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "ephemeralDefault" BOOLEAN NOT NULL DEFAULT false,
    "adminNote" TEXT
);
INSERT INTO "new_User" ("adminNote", "api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "isActive", "isAdmin", "language_code", "name", "password_hash", "preferred_voice", "public_key", "push_subscription", "recording_beep", "username") SELECT "adminNote", "api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "isActive", "isAdmin", "language_code", "name", "password_hash", "preferred_voice", "public_key", "push_subscription", "recording_beep", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
