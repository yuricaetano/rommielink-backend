import {Router} from 'express';
// import authMiddleware from '../middlewares/authMiddleware';
import{
    getAllEstudantes,
    getEstudanteByIdDetalhado,
    createEstudante,
    updateEstudante,
    deleteEstudante
} from '../controllers/estudanteController.js';

const router = Router();

router.get('/', getAllEstudantes);
router.get('/:id', getEstudanteByIdDetalhado);
router.post('/', createEstudante);
router.put('/:id', updateEstudante);
router.delete('/:id', deleteEstudante);

export default router;