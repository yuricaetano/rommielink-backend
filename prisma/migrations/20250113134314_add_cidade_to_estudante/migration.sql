/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `Estudante` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estudante" DROP CONSTRAINT "Estudante_enderecoId_fkey";

-- AlterTable
ALTER TABLE "Estudante" DROP COLUMN "enderecoId";
