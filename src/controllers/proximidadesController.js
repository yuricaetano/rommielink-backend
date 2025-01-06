import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar proximidade
const createProximidade = async (req, res) => {
  try {
    const { universidade, academia, hospital, farmacia, mercado, shopping, postoGasolina, agenciaBancaria, pontoOnibus, estacaoMetro, imovelId, Policiamento, Lazer_Cultura, Areas_Verdes, preferenciaId } = req.body;

    const proximidade = await prisma.proximidades.create({
      data: {
        universidade,
        academia,
        hospital,
        farmacia,
        mercado,
        shopping,
        postoGasolina,
        agenciaBancaria,
        pontoOnibus,
        estacaoMetro,
        imovelId,
        Policiamento,
        Lazer_Cultura,
        Areas_Verdes,
        preferenciaId,
      },
    });

    return res.status(201).json(proximidade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar proximidades por ID
const getProximidadeById = async (req, res) => {
  const { id } = req.params;

  try {
    const proximidade = await prisma.proximidades.findUnique({
      where: { id },
    });

    if (!proximidade) {
      return res.status(404).json({ message: 'Proximidade não encontrada' });
    }

    return res.status(200).json(proximidade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar proximidade
const updateProximidade = async (req, res) => {
  const { id } = req.params;
  const { universidade, academia, hospital, farmacia, mercado, shopping, postoGasolina, agenciaBancaria, pontoOnibus, estacaoMetro, imovelId, Policiamento, Lazer_Cultura, Areas_Verdes, preferenciaId } = req.body;

  try {
    const proximidade = await prisma.proximidades.update({
      where: { id },
      data: {
        universidade,
        academia,
        hospital,
        farmacia,
        mercado,
        shopping,
        postoGasolina,
        agenciaBancaria,
        pontoOnibus,
        estacaoMetro,
        imovelId,
        Policiamento,
        Lazer_Cultura,
        Areas_Verdes,
        preferenciaId,
      },
    });

    return res.status(200).json(proximidade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Deletar proximidade
const deleteProximidade = async (req, res) => {
  const { id } = req.params;

  try {
    const proximidade = await prisma.proximidades.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Proximidade deletada com sucesso', proximidade });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar todas as proximidades
const getAllProximidades = async (req, res) => {
  try {
    const proximidades = await prisma.proximidades.findMany();
    return res.status(200).json(proximidades);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProximidade,
  getProximidadeById,
  updateProximidade,
  deleteProximidade,
  getAllProximidades,
};