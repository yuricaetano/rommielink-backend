import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Número de rounds para o hash
const SALT_ROUNDS = 10;
// Configuração do JWT
const SECRET_KEY = process.env.SECRET_KEY;

export const createUser = async (req, res) => {
  const { nome, sobrenome, email, senha, confirmarSenha, telefone, dataNascimento,} = req.body;

  try {
    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    // Verificar se o email já existe
    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Criptografar a senha
    const hashedSenha = await bcrypt.hash(senha, SALT_ROUNDS);

    // Criar o usuário no banco
    const newUser = await prisma.user.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: hashedSenha,
        telefone,
        dataNascimento,
      },
    });

    console.log("Usuário criado:", { id: newUser.id, email: newUser.email });
    const token = jwt.sign({id: newUser.id, email: newUser.email}, SECRET_KEY,{expiresIn: '1h',});

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }

};

// Fazer login de um usuário
export const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    // Gera o token JWT
    const token = jwt.sign({
      id: user.id, email: user.email
    }, 
      SECRET_KEY,{
      expiresIn: '1h', // Expira em 1 hora
    }
  );

    res.json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

const invalidTokens = [];

export const userLogout = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  invalidTokens.push(token);
  res.json({ message: 'Logout bem-sucedido.' });
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
export const getAllUsers = async (req, res) => {
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
  const { nome, sobrenome, email, senha, } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { nome, sobrenome, email, senha, telefone, dataNascimento, },
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
