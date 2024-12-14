const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/', getUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

module.exports = router;