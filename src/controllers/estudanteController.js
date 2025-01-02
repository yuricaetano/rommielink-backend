import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEstudante = async (req, res) => {
  const { tipoQuarto, valorMaximoAluguel, periodoMaximoLocacao, periodoMinimoLocacao, fotoPerfil, sexo, instituicao, curso, cpf, rg, userId, preferencias } = req.body;

  try {
    const newEstudante = await prisma.estudante.create({
      data: {
        tipoQuarto,
        valorMaximoAluguel,
        periodoMaximoLocacao,
        periodoMinimoLocacao,
        fotoPerfil,
        sexo,
        instituicao,
        curso,
        cpf,
        rg,
        userId,
        preferencias: {
          create: preferencias // Vincula as preferências diretamente ao estudante (se fornecido)
        },
      },
    });

    res.status(201).json(newEstudante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estudante' });
  }
};


export const updateEstudante = async (req, res) => {
  const { id } = req.params;
  const { tipoQuarto, valorMaximoAluguel, periodoMaximoLocacao, periodoMinimoLocacao, fotoPerfil, sexo, instituicao, curso, cpf, rg, userId, preferencias } = req.body;
  try {
    const updatedEstudante = await prisma.estudante.update({
      where: { id },
      data: { tipoQuarto, valorMaximoAluguel, periodoMaximoLocacao, periodoMinimoLocacao, fotoPerfil, sexo, instituicao, curso, cpf, rg, userId, preferencias },
    });
    res.status(200).json(updatedEstudante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estudante' });
  }
};

export const deleteEstudante = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estudante.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar estudante' });
  }
};

export const getAllEstudantes = async (req, res) => {
    try {
      const estudantes = await prisma.estudante.findMany({
        include: { user: true }, // Inclui informações do usuário relacionado
      });
      if (estudantes.length === 0) {
        return res.status(404).json({ error: 'Nenhum estudante encontrado' });
      }
      res.status(200).json(estudantes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estudantes.' });
    }
};

export const getEstudanteById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudante = await prisma.estudante.findUnique({
      where: { id },
      include: { user: true }, // Inclui informações do usuário relacionado
    });
    if (!estudante) {
        return res.status(404).json({ error: 'Estudante não encontrado.' });
    }
    res.status(200).json(estudante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudante.' });
  }
};