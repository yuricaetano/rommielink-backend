import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser,
  userLogin,
  userLogout
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Rotas públicas
router.post('/', createUser);
router.post('/login', userLogin);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Rotas protegidas com JWT
router.post('/logout', authMiddleware, userLogout);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;