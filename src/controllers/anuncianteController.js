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