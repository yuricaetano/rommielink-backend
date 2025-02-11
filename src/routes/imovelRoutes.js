import { Router } from 'express';
import {
  createImovel,
  getImoveisByAnunciante,
  updateImovel,
  deleteImovel,
  getImoveisByCidade,
  checkIfAnunciante
} from '../controllers/imovelController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/anunciante/imovel', authMiddleware, checkIfAnunciante, createImovel);
router.get('/imovel', getImoveisByCidade);
router.get('/anunciante/imovel', authMiddleware, getImoveisByAnunciante);
router.put('/anunciante/imovel/:id', authMiddleware,checkIfAnunciante, updateImovel);
router.delete('/anunciante/imovel/:id', authMiddleware,checkIfAnunciante, deleteImovel);

export default router;