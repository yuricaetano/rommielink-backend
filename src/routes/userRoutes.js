import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser 
} from '../controllers/userController.js';

const router = Router();

router.get('/users', getAllUsers);
router.post('/user', createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
