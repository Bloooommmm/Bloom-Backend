CREATE TABLE "TrPeriod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TrPeriod_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TrMood" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "note" TEXT,
    "loggedAt" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TrMood_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TrMood_userId_loggedAt_key" ON "TrMood"("userId", "loggedAt");
CREATE INDEX "TrPeriod_userId_startDate_idx" ON "TrPeriod"("userId", "startDate");
CREATE INDEX "TrMood_userId_loggedAt_idx" ON "TrMood"("userId", "loggedAt");
ALTER TABLE "TrPeriod" ADD CONSTRAINT "TrPeriod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrMood" ADD CONSTRAINT "TrMood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
