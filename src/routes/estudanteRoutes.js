import {Router} from 'express';
import{
    getAllEstudantes,
    getEstudanteByIdDetalhado,
    createEstudante,
    updateEstudante,
    deleteEstudante
} from '../controllers/estudanteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllEstudantes);
router.get('/:id', getEstudanteByIdDetalhado);
router.post('/', authMiddleware, createEstudante);
router.put('/:id', authMiddleware,updateEstudante);
router.delete('/:id', authMiddleware,deleteEstudante);

export default router;