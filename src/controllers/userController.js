import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar um novo usuário
export const createUser = async (req, res) => {
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

// Obter um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id }, // Certifique-se de converter o `id` para inteiro, se necessário
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};

// Obter todos os usuários
export const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Busca todos os usuários no banco
    if (users.length === 0) {
      return res.status(404).json({ error: 'Nenhum usuário encontrado' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};

// Atualizar um usuário por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { nome, email, senha, },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
};

// Deletar um usuário por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(204).send(); // Resposta sem conteúdo após exclusão
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
};
