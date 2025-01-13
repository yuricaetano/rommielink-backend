import {Router} from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Importa o middleware de autenticação
import{
    getAllEstudantes,
    getEstudanteByIdDetalhado,
    createEstudante,
    updateEstudante,
    deleteEstudante
} from '../controllers/estudanteController.js';

const router = Router();

router.get('/', authMiddleware, getAllEstudantes);
router.get('/:id', authMiddleware, getEstudanteByIdDetalhado);
router.post('/', authMiddleware, createEstudante);
router.put('/:id', authMiddleware, updateEstudante);
router.delete('/:id', authMiddleware, deleteEstudante);

export default router;