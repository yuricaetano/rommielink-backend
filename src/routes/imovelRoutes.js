import { Router } from 'express';
import {
  createImovel,
  getImoveisByAnunciante,
  updateImovel,
  deleteImovel,
  getImoveisByCidade
} from '../controllers/imovelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/anunciante/imovel', authMiddleware, createImovel);
router.get('/imovel', getImoveisByCidade);
router.get('/anunciante/imovel', authMiddleware, getImoveisByAnunciante);
router.put('/anunciante/imovel/:id', authMiddleware, updateImovel);
router.delete('/anunciante/imovel/:id', authMiddleware, deleteImovel);

export default router;