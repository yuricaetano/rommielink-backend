const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

  const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  };

  const createUser = async (req, res) => {
    const { nome, email } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          nome,
          email,
          senha: req.body.senha,
          telefone: req.body.telefone,
          dataNascimento: req.body.dataNascimento,
          nomeUsuario: req.body.nomeUsuario,
        },
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  };

  module.exports = { getUsers, createUser };