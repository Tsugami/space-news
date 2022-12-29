-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "external_id" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "newsSite" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "launches" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "launches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticlesToLaunches" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticlesToEvents" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_external_id_key" ON "articles"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "launches_external_id_key" ON "launches"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_external_id_key" ON "events"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticlesToLaunches_AB_unique" ON "_ArticlesToLaunches"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticlesToLaunches_B_index" ON "_ArticlesToLaunches"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticlesToEvents_AB_unique" ON "_ArticlesToEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticlesToEvents_B_index" ON "_ArticlesToEvents"("B");

-- AddForeignKey
ALTER TABLE "_ArticlesToLaunches" ADD CONSTRAINT "_ArticlesToLaunches_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticlesToLaunches" ADD CONSTRAINT "_ArticlesToLaunches_B_fkey" FOREIGN KEY ("B") REFERENCES "launches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticlesToEvents" ADD CONSTRAINT "_ArticlesToEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticlesToEvents" ADD CONSTRAINT "_ArticlesToEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
