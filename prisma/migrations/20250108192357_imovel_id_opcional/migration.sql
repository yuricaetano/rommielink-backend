/*
  Warnings:

  - A unique constraint covering the columns `[imovelId]` on the table `Proximidades` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Proximidades" ALTER COLUMN "imovelId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proximidades_imovelId_key" ON "Proximidades"("imovelId");
