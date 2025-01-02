import {Router} from 'express';
import{
    getAllEstudantes,
    getEstudanteById,
    createEstudante,
    updateEstudante,
    deleteEstudante
} from '../controllers/estudanteController.js';

const router = Router();

router.get('/', getAllEstudantes);
router.get('/:id', getEstudanteById);
router.post('/', createEstudante);
router.put('/:id', updateEstudante);
router.delete('/:id', deleteEstudante);

export default router;