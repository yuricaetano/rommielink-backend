import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser,
  userLogin 
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Rotas públicas
router.post('/', createUser);
router.post('/login', userLogin);

// Rotas protegidas com JWT
router.use(authMiddleware); // Aplica o middleware a partir daqui

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;