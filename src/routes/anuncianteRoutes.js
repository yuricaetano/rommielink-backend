import { Router } from 'express';
import {
  createAnunciante,
  updateAnunciante,
  deleteAnunciante,
  getAllAnunciantes,
  getAnuncianteById,
} from '../controllers/anuncianteController';

const router = Router();

router.post('/', createAnunciante);
router.put('/:id', updateAnunciante);
router.delete('/:id', deleteAnunciante);
router.get('/', getAllAnunciantes);
router.get('/:id', getAnuncianteById);

export default router;