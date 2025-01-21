import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Torna o usuário um anunciante
export const tornarAnunciante = async (req, res) => {
  const userId = req.user.id;

  try {
    const existente = await prisma.anunciante.findUnique({
      where: { userId },
    });

    if (existente) {
      return res.status(400).json({ error: "Usuário já é um anunciante." });
    }

    const novoAnunciante = await prisma.anunciante.create({
      data: { userId },
    });

    res.status(201).json({
      message: "Usuário agora é um anunciante.",
      anunciante: novoAnunciante,
    });
  } catch (error) {
    console.error("Erro ao tornar usuário anunciante:", error);
    res.status(500).json({ error: "Erro ao atualizar o status do usuário." });
  }
};

// Lista todos os imóveis do anunciante autenticado
export const listarImoveisDoAnunciante = async (req, res) => {
  const userId = req.user.id;

  try {
    const anunciante = await prisma.anunciante.findUnique({
      where: { userId },
      include: { imovel: true },
    });

    if (!anunciante) {
      return res.status(404).json({ error: "Anunciante não encontrado." });
    }

    res.status(200).json(anunciante.imovel);
  } catch (error) {
    console.error("Erro ao listar imóveis do anunciante:", error);
    res.status(500).json({ error: "Erro ao listar imóveis." });
  }
};

// Chama o CRUD de imóvel (exemplo: criar imóvel)
export const criarImovel = async (req, res) => {
    const userId = req.user.id;
    const {
      tipoImovel,
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
      proximidades,
      endereco
    } = req.body;
  
    try {
      // Verifica se o usuário é um anunciante
      const anunciante = await prisma.anunciante.findUnique({
        where: { userId },
      });
  
      if (!anunciante) {
        return res.status(403).json({ error: "Usuário não é um anunciante." });
      }
  
      // Cria o imóvel associado ao anunciante
      const novoImovel = await prisma.imovel.create({
        data: {
          tipoImovel,
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
          anuncianteId: anunciante.id,
          proximidades: {
            create: proximidades,
          },
          endereco: {
            create: endereco,
          },
        },
      });
  
      res.status(201).json({
        message: "Imóvel criado com sucesso!",
        imovel: novoImovel,
      });
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      res.status(500).json({ error: "Erro ao criar imóvel." });
    }
};  