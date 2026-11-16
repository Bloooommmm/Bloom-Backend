ALTER TABLE "MsUser" ADD COLUMN "firebaseUid" TEXT;
CREATE UNIQUE INDEX "MsUser_firebaseUid_key" ON "MsUser"("firebaseUid");
