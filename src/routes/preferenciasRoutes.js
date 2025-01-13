import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
  createPreferencias,
  updatePreferencias,
  getPreferenciasByEstudanteId,
} from '../controllers/preferenciasController.js';

const router = express.Router();

// Criar preferências para um estudante
router.post('/estudante/:estudanteId/preferencias', authMiddleware, createPreferencias);

// Atualizar preferências de um estudante
router.put('/preferencias/:id', authMiddleware, updatePreferencias);

// Buscar preferências por ID do Estudante
router.get('/estudante/:estudanteId/preferencias', authMiddleware, getPreferenciasByEstudanteId);

export default router;