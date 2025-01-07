import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar proximidade
export const createProximidade = async (req, res) => {
    const {
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
        preferenciaId
    } = req.body;
    
    try {
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

    res.status(201).json(proximidade);   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar proximidades pelo ID do estudante
export const getProximidadesByEstudanteId = async (req, res) => {
    try {
      const { estudanteId } = req.params;
  
      const estudante = await prisma.estudante.findUnique({
        where: { id: estudanteId },
        include: {
          preferencias: {
            include: {
              proximidades: true, // Inclui as proximidades associadas
            },
          },
        },
      });
  
      if (!estudante) {
        return res.status(404).json({ message: 'Estudante não encontrado.' });
      }
  
      return res.status(200).json(estudante.preferencias.proximidades);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
// Buscar proximidades pelo ID do imóvel
export const getProximidadesByImovelId = async (req, res) => {
try {
    const { imovelId } = req.params;

    const proximidades = await prisma.proximidades.findMany({
    where: { imovelId },
    });

    if (proximidades.length === 0) {
    return res.status(404).json({ message: 'Proximidades não encontradas para o imóvel.' });
    }

    return res.status(200).json(proximidades);
} catch (error) {
    return res.status(500).json({ error: error.message });
}
};