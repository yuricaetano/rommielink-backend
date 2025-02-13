import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEstudante = async (req, res) => {
  const { 
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
    cidade,
    preferencias 
  } = req.body;

  try {
    // Verificar se o CPF já está registrado
    const existingEstudante = await prisma.estudante.findUnique({
      where: { cpf },
    });

    if (existingEstudante) {
      return res.status(400).json({ error: 'CPF já registrado.' });
    }

    // Validação do campo tipoConvivencia em cada preferência
    const validValues = ["Independente", "Moderada", "Compartilhada"];
    for (const preferencia of preferencias) {
      if (!validValues.includes(preferencia.tipoConvivencia)) {
        return res.status(400).json({ error: `Valor inválido para tipoConvivencia: ${preferencia.tipoConvivencia}` });
      }
    }

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
        cidade,
        preferencias: {
          create: preferencias.map((pref) => ({
            genero_moradores: pref.genero_moradores,
            orientacao_sexual_moradores: pref.orientacao_sexual_moradores,
            numero_moradores: pref.numero_moradores,
            fumante: pref.fumante,
            possuiAnimal: pref.possuiAnimal,
            tipoAnimal: pref.tipoAnimal,
            idade_minima: pref.idade_minima,
            idade_maxima: pref.idade_maxima,
            religioso: pref.religioso,
            religiao: pref.religiao,
            tipoConvivencia: pref.tipoConvivencia,
            maiorQualidade: pref.maiorQualidade,
            piorDefeito: pref.piorDefeito,
            principalFatorMoradia: pref.principalFatorMoradia,
          }))
        }
      },
    });
    res.status(201).json(newEstudante);
  } catch (error) {
    console.error("Erro ao criar estudante:", error);
    res.status(500).json({ error: 'Erro ao criar estudante' });
  }
};

export const updateEstudante = async (req, res) => {
  const { id } = req.params;
  const { 
    tipoQuarto, 
    valorMaximoAluguel, 
    periodoMaximoLocacao, 
    periodoMinimoLocacao, 
    fotoPerfil, 
    sexo, 
    instituicao, 
    curso, 
    cpf, 
    rg
  } = req.body;
  try {
    const updatedEstudante = await prisma.estudante.update({
      where: { id },
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
        rg
      },
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
  const page = parseInt(req.query.page) || 1; // Página padrão é 1
  const limit = parseInt(req.query.limit) || 10; // Limite padrão é 10 estudantes por página
  const skip = (page - 1) * limit; // Calcula o número de estudantes a serem pulados
  const cidade = req.query.cidade || ''; // Filtro de cidade, se fornecido

  try {
    // Busca estudantes com paginação e filtro por cidade
    const estudantes = await prisma.estudante.findMany({
      where: {
        cidade: {
          contains: cidade,
          mode: 'insensitive',
        },
      },
      include: {
        user: true, // Inclui informações do usuário relacionado
      },
      skip,
      take: limit,
    });

    const totalEstudantes = await prisma.estudante.count({
      where: {
        cidade: {
          contains: cidade,
          mode: 'insensitive',
        },
      },
    });

    const totalPages = Math.ceil(totalEstudantes / limit);

    if (estudantes.length === 0) {
      return res.status(404).json({ error: 'Nenhum estudante encontrado' });
    }

    res.status(200).json({
      estudantes,
      currentPage: page,
      totalPages,
      totalEstudantes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar estudantes.' });
  }
};


export const getEstudanteByIdDetalhado = async (req, res) => {
  const { id } = req.params;
  try {
    const estudante = await prisma.estudante.findUnique({
      where: { id },
      include: { 
        preferencias: true
      },
    });
    if (!estudante) {
        return res.status(404).json({ error: 'Estudante não encontrado.' });
    }
    res.status(200).json(estudante);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudante.' });
  }
};