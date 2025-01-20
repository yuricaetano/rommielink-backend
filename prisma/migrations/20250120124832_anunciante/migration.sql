/*
  Warnings:

  - Added the required column `fotoPerfil` to the `anunciante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anunciante" ADD COLUMN     "fotoPerfil" TEXT NOT NULL;
