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
    "push_subscription" TEXT,
    "show_original" BOOLEAN NOT NULL DEFAULT false,
    "read_aloud" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT,
    "global_expiry_hours" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "language_code", "name", "password_hash", "preferred_voice", "push_subscription", "show_original", "username") SELECT "api_key", "avatar", "created_at", "flag", "global_expiry_hours", "has_api_key", "id", "language_code", "name", "password_hash", "preferred_voice", "push_subscription", "show_original", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
