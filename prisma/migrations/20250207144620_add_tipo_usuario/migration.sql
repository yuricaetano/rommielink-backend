/*
  Warnings:

  - Added the required column `tipo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('Estudante', 'Anunciante');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "tipo" "TipoUsuario" NOT NULL DEFAULT 'Estudante';

