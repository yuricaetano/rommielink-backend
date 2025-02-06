/*
  Warnings:

  - The values [quartoIndividual,quartoCompartilhado,espacoInteiro] on the enum `TipoQuarto` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `nomeUsuario` on the `User` table. All the data in the column will be lost.
  - Added the required column `aceitaFumante` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acetaAnimal` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restricaoGenero` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoAnunciante` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoAnunciante" AS ENUM ('CompanheiroQuarto', 'Proprietario', 'Imobiliaria');

-- CreateEnum
CREATE TYPE "RestricaoGenero" AS ENUM ('Masculino', 'Feminino', 'NaoImporta');

-- AlterEnum
BEGIN;
CREATE TYPE "TipoQuarto_new" AS ENUM ('QuartoIndividual', 'QuartoCompartilhado', 'EspacoInteiro');
ALTER TABLE "Imovel" ALTER COLUMN "tipoQuarto" TYPE "TipoQuarto_new" USING ("tipoQuarto"::text::"TipoQuarto_new");
ALTER TYPE "TipoQuarto" RENAME TO "TipoQuarto_old";
ALTER TYPE "TipoQuarto_new" RENAME TO "TipoQuarto";
DROP TYPE "TipoQuarto_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Proximidades" DROP CONSTRAINT "Proximidades_preferenciaId_fkey";

-- DropIndex
DROP INDEX "User_nomeUsuario_key";

-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "aceitaFumante" BOOLEAN NOT NULL,
ADD COLUMN     "acetaAnimal" BOOLEAN NOT NULL,
ADD COLUMN     "moraNaPropriedade" BOOLEAN,
ADD COLUMN     "possuiMoradores" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "restricaoGenero" "RestricaoGenero" NOT NULL,
ADD COLUMN     "tipoAnunciante" "TipoAnunciante" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nomeUsuario",
ADD COLUMN     "sobrenome" TEXT NOT NULL DEFAULT 'Não informado';

-- CreateTable
CREATE TABLE "Morador" (
    "id" TEXT NOT NULL,
    "idadeMinima" INTEGER NOT NULL,
    "idadeMaxima" INTEGER NOT NULL,
    "genero" "SexoMorador" NOT NULL,
    "curso" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "idiomas" TEXT[],
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Morador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Morador" ADD CONSTRAINT "Morador_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
