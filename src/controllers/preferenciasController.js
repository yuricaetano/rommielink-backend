import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar preferências para um estudante
export const createPreferencias = async (req, res) => {
  const {
    genero_moradores,
    orientacao_sexual_moradores,
    numero_moradores,
    fumante,
    possuiAnimal,
    tipoAnimal,
    idade_minima,
    idade_maxima,
    religioso,
    religiao,
    tipoConvivencia,
    maiorQualidade,
    piorDefeito,
    principalFatorMoradia,
    estudanteId, // Estudante ao qual as preferências pertencem
    proximidades, // Lista de proximidades (relacionamento)
  } = req.body;

  try {
    const novasPreferencias = await prisma.preferencias.create({
      data: {
        genero_moradores,
        orientacao_sexual_moradores,
        numero_moradores,
        fumante,
        possuiAnimal,
        tipoAnimal,
        idade_minima,
        idade_maxima,
        religioso,
        religiao,
        tipoConvivencia,
        maiorQualidade,
        piorDefeito,
        principalFatorMoradia,
        estudanteId,
        proximidades
      },
    });

    res.status(201).json(novasPreferencias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar preferências.' });
  }
};

export const updatePreferencias = async (req, res) => {
  const { id } = req.params;
  const {
    genero_moradores,
    orientacao_sexual_moradores,
    numero_moradores,
    fumante,
    possuiAnimal,
    tipoAnimal,
    idade_minima,
    idade_maxima,
    religioso,
    religiao,
    tipoConvivencia,
    maiorQualidade,
    piorDefeito,
    principalFatorMoradia,
    proximidades, // Opcional
  } = req.body;

  try {
    const preferenciasAtualizadas = await prisma.preferencias.update({
      where: { id },
      data: {
        genero_moradores,
        orientacao_sexual_moradores,
        numero_moradores,
        fumante,
        possuiAnimal,
        tipoAnimal,
        idade_minima,
        idade_maxima,
        religioso,
        religiao,
        tipoConvivencia,
        maiorQualidade,
        piorDefeito,
        principalFatorMoradia,
        ...(proximidades && { // Adiciona proximidades apenas se forem fornecidas
          proximidades: {
            deleteMany: {}, // Remove todas as proximidades existentes
            create: proximidades, // Cria novas proximidades
          },
        }),
      },
    });

    res.status(200).json(preferenciasAtualizadas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar preferências.' });
  }
};

// Buscar preferências por ID do Estudante
export const getPreferenciasByEstudanteId = async (req, res) => {
  const { estudanteId } = req.params;
  try {
    const preferencias = await prisma.preferencias.findUnique({
      where: { estudanteId },
      include: { proximidades: true }, // Inclui proximidades associadas
    });

    if (!preferencias) {
      return res.status(404).json({ error: 'Preferências não encontradas para o estudante especificado.' });
    }

    res.status(200).json(preferencias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar preferências.' });
  }
};