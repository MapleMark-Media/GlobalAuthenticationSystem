-- CreateTable
CREATE TABLE "WebService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceName" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WebService_serviceName_key" ON "WebService"("serviceName");
