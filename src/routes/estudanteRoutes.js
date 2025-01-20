import {Router} from 'express';
import{
    getAllEstudantes,
    getEstudanteByIdDetalhado,
    createEstudante,
    updateEstudante,
    deleteEstudante
} from '../controllers/estudanteController.js';
import {authenticate} from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getAllEstudantes);
router.get('/:id', authenticate, getEstudanteByIdDetalhado);
router.post('/', authenticate, createEstudante);
router.put('/:id', authenticate,updateEstudante);
router.delete('/:id', authenticate,deleteEstudante);

export default router;