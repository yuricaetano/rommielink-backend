/*
  Warnings:

  - You are about to drop the column `periodoMaximoLocacao` on the `Imovel` table. All the data in the column will be lost.
  - You are about to drop the column `periodoMinimoLocacao` on the `Imovel` table. All the data in the column will be lost.
  - Added the required column `banheiroPrivativo` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroBanheiros` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroQuartos` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoMinimoEstadia` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quartosDisponiveis` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "periodoMaximoLocacao",
DROP COLUMN "periodoMinimoLocacao",
ADD COLUMN     "banheiroPrivativo" BOOLEAN NOT NULL,
ADD COLUMN     "numeroBanheiros" INTEGER NOT NULL,
ADD COLUMN     "numeroQuartos" INTEGER NOT NULL,
ADD COLUMN     "periodoMinimoEstadia" TEXT NOT NULL,
ADD COLUMN     "quartosDisponiveis" INTEGER NOT NULL;
