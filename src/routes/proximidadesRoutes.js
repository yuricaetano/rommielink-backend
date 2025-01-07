import express from 'express';
import {
  createProximidade,
  getProximidadesByEstudanteId,
  getProximidadesByImovelId,
} from '../controllers/proximidadesController.js';

const router = express.Router();

// Criar proximidade
router.post('/proximidades', createProximidade);

// Buscar proximidades pelo ID do estudante
router.get('/proximidades/estudante/:estudanteId', getProximidadesByEstudanteId);

// Buscar proximidades pelo ID do imóvel
router.get('/proximidades/imovel/:imovelId', getProximidadesByImovelId);


export default router;