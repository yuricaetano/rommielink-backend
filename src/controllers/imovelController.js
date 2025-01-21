import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar um novo imóvel
export const createImovel = async (req, res) => {
  const {
    tipoQuarto,
    status,
    valorAluguel,
    periodoMaximoLocacao,
    periodoMinimoLocacao,
    descricao,
    fotoImovel,
    wifi,
    arCondicionado,
    manutencao,
    aceitaVisita,
    tipoMoradia,
    sexoMorador,
    anuncianteId,
    proximidades,
    endereco
  } = req.body;

  try {
    const newImovel = await prisma.imovel.create({
      data: {
        tipoQuarto,
        status,
        valorAluguel,
        periodoMaximoLocacao,
        periodoMinimoLocacao,
        descricao,
        fotoImovel,
        wifi,
        arCondicionado,
        manutencao,
        aceitaVisita,
        tipoMoradia,
        sexoMorador,
        anunciante: {
          connect: { id: anuncianteId },
        },
        proximidades: {
          create: proximidades,
        },
        endereco: {
          create: endereco,
        },
      },
    });

    res.status(201).json(newImovel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar imóvel.' });
  }
};

export const getImoveisPorFiltros = async (req, res) => {
    const {
      cidade,
      bairro,
      valorMaximo,
      tipoQuarto,
      tipoMoradia,
      wifi,
      sexoMorador,
      proximidades, // Filtro por proximidades (array de strings)
    } = req.query;
  
    try {
      // Monta o objeto de filtros dinâmicos
      const filtros = {
        valorAluguel: valorMaximo ? { lte: parseFloat(valorMaximo) } : undefined,
        tipoQuarto: tipoQuarto || undefined,
        tipoMoradia: tipoMoradia || undefined,
        wifi: wifi ? wifi === 'true' : undefined,
        sexoMorador: sexoMorador || undefined,
        endereco: {
          some: {
            cidade: cidade || undefined,
            bairro: bairro || undefined,
          },
        },
        proximidades: proximidades
          ? {
              some: {
                descricao: { in: proximidades.split(',') }, // Proximidades como array de strings
              },
            }
          : undefined,
      };
  
      // Remove campos não usados
      Object.keys(filtros).forEach((key) => {
        if (filtros[key] === undefined) delete filtros[key];
      });
  
      // Busca no banco com Prisma
      const imoveis = await prisma.imovel.findMany({
        where: filtros,
        include: {
          endereco: true, // Inclui detalhes do endereço
          proximidades: true, // Inclui as proximidades
          anunciante: true, // Inclui detalhes do anunciante, se necessário
        },
      });
  
      if (imoveis.length === 0) {
        return res.status(404).json({ message: 'Nenhum imóvel encontrado com os filtros fornecidos.' });
      }
  
      res.status(200).json(imoveis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar imóveis.' });
    }
  };

export const getAllImoveis = async (req, res) => {
    try {
      const userId = req.user.id; // ID do usuário autenticado, extraído do token
      const anunciante = await prisma.anunciante.findUnique({
        where: { userId },
      });
  
      if (!anunciante) {
        return res.status(403).json({ error: 'Acesso negado. Apenas anunciantes podem visualizar esta lista.' });
      }
  
      const imoveis = await prisma.imovel.findMany({
        where: { anuncianteId: anunciante.id }, // Apenas imóveis do anunciante autenticado
        include: {
          anunciante: true,
          proximidades: true,
          endereco: true,
        },
      });
  
      if (imoveis.length === 0) {
        return res.status(404).json({ error: 'Nenhum imóvel encontrado para este anunciante.' });
      }
  
      res.status(200).json(imoveis);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os imóveis' });
    }
  };

// Obter um imóvel por ID
export const getImovelById = async (req, res) => {
  const { id } = req.params;
  try {
    const imovel = await prisma.imovel.findUnique({
      where: { id },
      include: {
        anunciante: true,
        proximidades: true,
        endereco: true,
      },
    });
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }
    res.status(200).json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o imóvel' });
  }
};

// Atualizar um imóvel por ID
export const updateImovel = async (req, res) => {
  const { id } = req.params;
  const {
    tipoQuarto,
    status,
    valorAluguel,
    periodoMaximoLocacao,
    periodoMinimoLocacao,
    descricao,
    fotoImovel,
    wifi,
    arCondicionado,
    manutencao,
    aceitaVisita,
    tipoMoradia,
    sexoMorador,
    anuncianteId,
    proximidades,
    endereco
  } = req.body;

  try {
    const updatedImovel = await prisma.imovel.update({
      where: { id },
      data: {
        tipoQuarto,
        status,
        valorAluguel,
        periodoMaximoLocacao,
        periodoMinimoLocacao,
        descricao,
        fotoImovel,
        wifi,
        arCondicionado,
        manutencao,
        aceitaVisita,
        tipoMoradia,
        sexoMorador,
        anunciante: {
          connect: { id: anuncianteId },
        },
        proximidades: {
          upsert: proximidades.map((prox) => ({
            where: { id: prox.id },
            update: prox,
            create: prox,
          })),
        },
        endereco: {
          upsert: endereco.map((end) => ({
            where: { id: end.id },
            update: end,
            create: end,
          })),
        },
      },
    });

    res.status(200).json(updatedImovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o imóvel' });
  }
};

// Deletar um imóvel por ID
export const deleteImovel = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.imovel.delete({
      where: { id },
    });
    res.status(204).send(); // Resposta sem conteúdo após exclusão
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o imóvel' });
  }
};