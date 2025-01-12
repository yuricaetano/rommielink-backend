import {Router} from 'express';
import {
  createAnunciante,
  getAnuncianteById,
  updateAnunciante,
  deleteAnunciante,
} from '../controllers/anuncianteController.js';

const router = Router();

// Rotas do anunciante
router.post('/', createAnunciante);
router.get('/:id', getAnuncianteById);
router.put('/:id', updateAnunciante);
router.delete('/:id', deleteAnunciante);

export default router;