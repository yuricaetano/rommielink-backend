import { Router } from 'express';
import {
  createImovel,
  getAllImoveis,
  getImovelById,
  updateImovel,
  deleteImovel,
  getImoveisPorFiltros
} from '../controllers/imovelController.js';
import {authenticate} from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/anunciante/imovel', authenticate, createImovel);
router.get('/imovel', getImoveisPorFiltros);
router.get('/anunciante/imovel', authenticate, getAllImoveis);
router.get('/imovel/:id', authenticate, getImovelById);
router.put('/anunciante/imovel/:id', authenticate, updateImovel);
router.delete('/anunciante/imovel/:id', authenticate, deleteImovel);

export default router;