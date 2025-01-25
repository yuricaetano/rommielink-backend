import { Router } from 'express';
import {
  createImovel,
  getAllImoveis,
  getImovelById,
  updateImovel,
  deleteImovel,
  getImoveisPorFiltros
} from '../controllers/imovelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/anunciante/imovel', authMiddleware, createImovel);
router.get('/imovel', getImoveisPorFiltros);
router.get('/anunciante/imovel', authMiddleware, getAllImoveis);
router.get('/imovel/:id', authMiddleware, getImovelById);
router.put('/anunciante/imovel/:id', authMiddleware, updateImovel);
router.delete('/anunciante/imovel/:id', authMiddleware, deleteImovel);

export default router;