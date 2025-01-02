/*
  Warnings:

  - You are about to drop the column `tipoConvivencia` on the `Estudante` table. All the data in the column will be lost.
  - Added the required column `tipoConvivencia` to the `Preferencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudante" DROP COLUMN "tipoConvivencia";

-- AlterTable
ALTER TABLE "Preferencias" ADD COLUMN     "tipoConvivencia" "TipoConvivencia" NOT NULL;
