import { Router } from 'express';
import { 
  getAllUsers, 
  createUser,
  getUserById, 
  updateUser,
  deleteUser,
  forgotPassword,
  updatePassword,
  userLogin,
  userLogout,
  mudarTipoUsuario
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Rotas públicas
router.post('/', createUser);
router.post('/forgot-password', forgotPassword);
router.post('/login', userLogin);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Rotas protegidas com JWT
router.post('/logout', authMiddleware, userLogout);
router.put('/:id', authMiddleware, updateUser);
router.put('/:id/password', authMiddleware, updatePassword);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/mudar-tipo',authMiddleware, mudarTipoUsuario);

export default router;