import { Router } from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser,
  deleteUser 
} from '../controllers/userController.js';

const router = Router();

// Rota para obter todos os usuários
router.get('/', getAllUsers);
// Rota para criar um novo usuário
router.post('/', createUser);
// Rota para obter um único usuário por ID
router.get('/:id', getUserById);
// Rota para atualizar um usuário por ID
router.put('/:id', updateUser);
// Rota para deletar um usuário por ID
router.delete('/:id', deleteUser);

export default router;
