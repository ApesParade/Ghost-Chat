-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminNotification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminNotification" ("createdAt", "id", "senderId") SELECT "createdAt", "id", "senderId" FROM "AdminNotification";
DROP TABLE "AdminNotification";
ALTER TABLE "new_AdminNotification" RENAME TO "AdminNotification";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
