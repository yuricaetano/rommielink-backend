-- AlterTable
ALTER TABLE "Estudante" ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "enderecoId" TEXT;

-- AddForeignKey
ALTER TABLE "Estudante" ADD CONSTRAINT "Estudante_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
