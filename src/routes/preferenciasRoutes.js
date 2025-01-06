import express from 'express';
import {
  createPreferencias,
  updatePreferencias,
  getPreferenciasByEstudanteId,
} from '../controllers/preferenciasController.js';

const router = express.Router();

// Criar preferências para um estudante
router.post('/estudante/:estudanteId/preferencias', createPreferencias);

// Atualizar preferências de um estudante
router.put('/preferencias/:id', updatePreferencias);

// Buscar preferências por ID do Estudante
router.get('/estudante/:estudanteId/preferencias', getPreferenciasByEstudanteId);

export default router;