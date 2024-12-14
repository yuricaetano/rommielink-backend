-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nomeUsuario" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudante" (
    "id" TEXT NOT NULL,
    "tipoQuarto" TEXT NOT NULL,
    "valorMaximoAluguel" DOUBLE PRECISION NOT NULL,
    "periodoMaximoLocacao" TEXT NOT NULL,
    "peridoMinimoLocacao" TEXT NOT NULL,
    "fotoPerfil" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL DEFAULT '',
    "curso" TEXT NOT NULL DEFAULT '',
    "matricula" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Estudante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferencias" (
    "id" TEXT NOT NULL,
    "fumante" BOOLEAN NOT NULL,
    "possuiAnimal" BOOLEAN NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "estudanteId" TEXT NOT NULL,

    CONSTRAINT "Preferencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anunciante" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Anunciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL,
    "tipoImovel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "valorAluguel" DOUBLE PRECISION NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodoMaximoLocacao" TEXT NOT NULL,
    "periodoMinimoLocacao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoImovel" TEXT NOT NULL,
    "anuncianteId" TEXT NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proximidades" (
    "id" TEXT NOT NULL,
    "universidade" BOOLEAN NOT NULL,
    "academia" BOOLEAN NOT NULL,
    "hospital" BOOLEAN NOT NULL,
    "farmacia" BOOLEAN NOT NULL,
    "mercado" BOOLEAN NOT NULL,
    "shopping" BOOLEAN NOT NULL,
    "postoGasolina" BOOLEAN NOT NULL,
    "agenciaBancaria" BOOLEAN NOT NULL,
    "pontoOnibus" BOOLEAN NOT NULL,
    "estacaoMetro" BOOLEAN NOT NULL,
    "imovelId" TEXT NOT NULL,
    "preferenciaId" TEXT NOT NULL,

    CONSTRAINT "Proximidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nomeUsuario_key" ON "User"("nomeUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_userId_key" ON "Estudante"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Anunciante_userId_key" ON "Anunciante"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_imovelId_key" ON "Endereco"("imovelId");

-- AddForeignKey
ALTER TABLE "Estudante" ADD CONSTRAINT "Estudante_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferencias" ADD CONSTRAINT "Preferencias_estudanteId_fkey" FOREIGN KEY ("estudanteId") REFERENCES "Estudante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anunciante" ADD CONSTRAINT "Anunciante_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_anuncianteId_fkey" FOREIGN KEY ("anuncianteId") REFERENCES "Anunciante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proximidades" ADD CONSTRAINT "Proximidades_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proximidades" ADD CONSTRAINT "Proximidades_preferenciaId_fkey" FOREIGN KEY ("preferenciaId") REFERENCES "Preferencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
