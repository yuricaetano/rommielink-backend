/*
  Warnings:

  - You are about to drop the column `peridoMinimoLocacao` on the `Estudante` table. All the data in the column will be lost.
  - You are about to drop the `Anunciante` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `periodoMinimoLocacao` to the `Estudante` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anunciante" DROP CONSTRAINT "Anunciante_userId_fkey";

-- DropForeignKey
ALTER TABLE "Imovel" DROP CONSTRAINT "Imovel_anuncianteId_fkey";

-- AlterTable
ALTER TABLE "Estudante" DROP COLUMN "peridoMinimoLocacao",
ADD COLUMN     "periodoMinimoLocacao" TEXT NOT NULL;

-- DropTable
DROP TABLE "Anunciante";

-- CreateTable
CREATE TABLE "anunciante" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "anunciante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anunciante_userId_key" ON "anunciante"("userId");

-- AddForeignKey
ALTER TABLE "anunciante" ADD CONSTRAINT "anunciante_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_anuncianteId_fkey" FOREIGN KEY ("anuncianteId") REFERENCES "anunciante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
