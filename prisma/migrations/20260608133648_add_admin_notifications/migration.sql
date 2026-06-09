-- CreateTable
CREATE TABLE "AdminNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AdminNotificationTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "notificationId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    CONSTRAINT "AdminNotificationTranslation_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "AdminNotification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminNotificationRecipient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" DATETIME,
    CONSTRAINT "AdminNotificationRecipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "AdminNotification" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AdminNotificationRecipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminNotificationTranslation_notificationId_languageCode_key" ON "AdminNotificationTranslation"("notificationId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "AdminNotificationRecipient_notificationId_userId_key" ON "AdminNotificationRecipient"("notificationId", "userId");
