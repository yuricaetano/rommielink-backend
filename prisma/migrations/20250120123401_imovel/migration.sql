/*
  Warnings:

  - Added the required column `aceitaVisita` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arCondicionado` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manutencao` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexoMorador` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoMoradia` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifi` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMoradia" AS ENUM ('Casa', 'Apartamento', 'Kitnet', 'Republica');

-- CreateEnum
CREATE TYPE "TipoQuarto" AS ENUM ('quartoIndividual', 'quartoCompartilhado', 'espacoInteiro');

-- CreateEnum
CREATE TYPE "SexoMorador" AS ENUM ('Masculino', 'Feminino', 'Mistas');

-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "aceitaVisita" BOOLEAN NOT NULL,
ADD COLUMN     "arCondicionado" BOOLEAN NOT NULL,
ADD COLUMN     "manutencao" BOOLEAN NOT NULL,
ADD COLUMN     "sexoMorador" "SexoMorador" NOT NULL,
ADD COLUMN     "tipoMoradia" "TipoMoradia" NOT NULL,
ADD COLUMN     "wifi" BOOLEAN NOT NULL;
