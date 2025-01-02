/*
  Warnings:

  - Added the required column `Areas_Verdes` to the `Proximidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lazer_Cultura` to the `Proximidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Policiamento` to the `Proximidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proximidades" ADD COLUMN     "Areas_Verdes" BOOLEAN NOT NULL,
ADD COLUMN     "Lazer_Cultura" BOOLEAN NOT NULL,
ADD COLUMN     "Policiamento" BOOLEAN NOT NULL;
