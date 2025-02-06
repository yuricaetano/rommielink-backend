import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getImoveisByCidade = async (req, res) => {
  const { cidade, proximidade, sexoMorador, possuiMoradores } = req.query;

  try {
    const imoveis = await prisma.imovel.findMany({
      where: {
        endereco: {
          some: {
            cidade: cidade,
          },
        },
        proximidades: proximidade
          ? {
              some: {
                nome: {
                  in: proximidade.split(','),
                },
              },
            }
          : undefined,
        sexoMorador: sexoMorador || undefined,
        possuiMoradores: possuiMoradores !== undefined ? possuiMoradores : undefined,
      },
    });

    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
};

export const getImoveisByAnunciante = async (req, res) => {
  const anuncianteId = req.user.id;
  try {
    const imoveis = await prisma.imovel.findMany({
      where: {
        anuncianteId: anuncianteId,
      },
    });

    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis do anunciante' });
  }
};

// Criar um imóvel (com autenticação)
export const createImovel = async (req, res) => {
  const anuncianteId = req.user.id; // Pega o ID do anunciante logado

  const { tipoQuarto, status, valorAluguel, periodoMaximoLocacao, periodoMinimoLocacao, descricao, fotoImovel, wifi, arCondicionado, manutencao, aceitaVisita, aceitaFumante, acetaAnimal, tipoMoradia, sexoMorador, possuiMoradores, tipoAnunciante, restricaoGenero, proximidades, endereco } = req.body;

  try {
    const imovel = await prisma.imovel.create({
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
        aceitaFumante,
        acetaAnimal,
        tipoMoradia,
        sexoMorador,
        possuiMoradores,
        tipoAnunciante,
        restricaoGenero,
        anuncianteId,
        proximidades: {
          connect: proximidades.map((prox) => ({ id: prox })), // Conectar as proximidades
        },
        endereco: {
          create: endereco, // Criar endereço com os dados passados
        },
      },
    });

    res.status(201).json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar imóvel' });
  }
};

// Editar um imóvel (com autenticação)
export const updateImovel = async (req, res) => {
  const anuncianteId = req.user.id; // Pega o ID do anunciante logado
  const imovelId = req.params.id; // ID do imóvel a ser editado

  const { tipoQuarto, status, valorAluguel, periodoMaximoLocacao, periodoMinimoLocacao, descricao, fotoImovel, wifi, arCondicionado, manutencao, aceitaVisita, aceitaFumante, acetaAnimal, tipoMoradia, sexoMorador, possuiMoradores, tipoAnunciante, restricaoGenero, proximidades, endereco } = req.body;

  try {
    const imovel = await prisma.imovel.update({
      where: {
         id: imovelId,
         anuncianteId: anuncianteId,
      },
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
        aceitaFumante,
        acetaAnimal,
        tipoMoradia,
        sexoMorador,
        possuiMoradores,
        tipoAnunciante,
        restricaoGenero,
        proximidades: {
          set: proximidades.map((prox) => ({ id: prox })),
        },
        endereco: {
          update: endereco,
        },
      },
    });

    res.status(200).json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar imóvel' });
  }
};

export const deleteImovel = async (req, res) => {
  const anuncianteId = req.user.id;
  const imovelId = req.params.id;

  try {
    // Verifica se o imóvel pertence ao anunciante
    const imovel = await prisma.imovel.findUnique({
      where: {
        id: imovelId,
      },
      include: {
        anunciante: true,
      },
    });

    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }

    if (imovel.anuncianteId !== anuncianteId) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este imóvel' });
    }

    // Deleta o imóvel se o anunciante for o proprietário
    await prisma.imovel.delete({
      where: {
        id: imovelId,
      },
    });

    res.status(200).json({ message: 'Imóvel deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar imóvel' });
  }
};

