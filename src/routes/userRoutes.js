import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser,
  userLogin 
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Login do usuário
router.post('/login', userLogin);

export default router;
