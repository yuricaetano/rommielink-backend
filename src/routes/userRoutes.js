import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser 
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
