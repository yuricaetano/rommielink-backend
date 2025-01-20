/*
  Warnings:

  - You are about to drop the column `tipoImovel` on the `Imovel` table. All the data in the column will be lost.
  - Added the required column `tipoQuarto` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "tipoImovel",
ADD COLUMN     "tipoQuarto" "TipoQuarto" NOT NULL;
