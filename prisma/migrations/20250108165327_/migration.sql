/*
  Warnings:

  - The values [Ocasional,Regular,Intensa] on the enum `TipoConvivencia` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoConvivencia_new" AS ENUM ('Independente', 'Moderada', 'Compartilhada');
ALTER TABLE "Preferencias" ALTER COLUMN "tipoConvivencia" TYPE "TipoConvivencia_new" USING ("tipoConvivencia"::text::"TipoConvivencia_new");
ALTER TYPE "TipoConvivencia" RENAME TO "TipoConvivencia_old";
ALTER TYPE "TipoConvivencia_new" RENAME TO "TipoConvivencia";
DROP TYPE "TipoConvivencia_old";
COMMIT;
