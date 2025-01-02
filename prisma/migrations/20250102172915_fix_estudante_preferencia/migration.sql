/*
  Warnings:

  - You are about to drop the column `matricula` on the `Estudante` table. All the data in the column will be lost.
  - You are about to drop the column `caracteristicas` on the `Preferencias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Estudante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `Estudante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Estudante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `Estudante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoConvivencia` to the `Estudante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero_moradores` to the `Preferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idade_maxima` to the `Preferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idade_minima` to the `Preferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_moradores` to the `Preferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientacao_sexual_moradores` to the `Preferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religioso` to the `Preferencias` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoConvivencia" AS ENUM ('OCASIONAL', 'REGULAR', 'INTENSA');

-- AlterTable
ALTER TABLE "Estudante" DROP COLUMN "matricula",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "rg" TEXT NOT NULL,
ADD COLUMN     "tipoConvivencia" "TipoConvivencia" NOT NULL;

-- AlterTable
ALTER TABLE "Preferencias" DROP COLUMN "caracteristicas",
ADD COLUMN     "genero_moradores" TEXT NOT NULL,
ADD COLUMN     "idade_maxima" INTEGER NOT NULL,
ADD COLUMN     "idade_minima" INTEGER NOT NULL,
ADD COLUMN     "numero_moradores" INTEGER NOT NULL,
ADD COLUMN     "orientacao_sexual_moradores" TEXT NOT NULL,
ADD COLUMN     "religiao" TEXT,
ADD COLUMN     "religioso" BOOLEAN NOT NULL,
ADD COLUMN     "tipoAnimal" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_cpf_key" ON "Estudante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_rg_key" ON "Estudante"("rg");
