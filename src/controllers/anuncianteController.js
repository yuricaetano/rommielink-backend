import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar anunciante
export const createAnunciante = async (req, res) => {
  const { userId } = req.body;

  try {
    const novoAnunciante = await prisma.anunciante.create({
      data: {
        userId,
      },
    });

    res.status(201).json(novoAnunciante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar anunciante.' });
  }
};

// Buscar anunciante por ID
export const getAnuncianteById = async (req, res) => {
  const { id } = req.params;

  try {
    const anunciante = await prisma.anunciante.findUnique({
      where: { id },
      include: {
        user: true,
        imovel: true,
      },
    });

    if (!anunciante) {
      return res.status(404).json({ error: 'Anunciante não encontrado.' });
    }

    res.status(200).json(anunciante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar anunciante.' });
  }
};

// Atualizar anunciante
export const updateAnunciante = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const anuncianteAtualizado = await prisma.anunciante.update({
      where: { id },
      data: { userId },
    });

    res.status(200).json(anuncianteAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar anunciante.' });
  }
};

// Excluir anunciante
export const deleteAnunciante = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.anunciante.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir anunciante.' });
  }
};
