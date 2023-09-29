/*
  Warnings:

  - You are about to drop the column `imageId` on the `Contact` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Contact" ("createdAt", "email", "id", "isDeleted", "name", "phone", "updatedAt") SELECT "createdAt", "email", "id", "isDeleted", "name", "phone", "updatedAt" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "contactId" INTEGER,
    CONSTRAINT "Image_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("content", "createdAt", "id", "isDeleted", "name", "updatedAt") SELECT "content", "createdAt", "id", "isDeleted", "name", "updatedAt" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_contactId_key" ON "Image"("contactId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
