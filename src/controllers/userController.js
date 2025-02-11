import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../prismaClient.js';

const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = 10;

// Criar usuário
export const createUser = async (req, res) => {
  const { nome, sobrenome, email, senha, confirmarSenha, telefone, dataNascimento, tipoUsuario } = req.body;

  try {
    if (senha !== confirmarSenha) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    if (!["Estudante", "Anunciante"].includes(tipoUsuario)) {
      return res.status(400).json({ error: 'Tipo de usuário inválido. Escolha "Estudante" ou "Anunciante".' });
    }

    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const hashedSenha = await bcrypt.hash(senha, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: hashedSenha,
        confirmarSenha: hashedSenha,
        telefone,
        dataNascimento,
        tipo: tipoUsuario,
      },
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, tipo: newUser.tipo }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
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

// Obter usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user){
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, telefone, dataNascimento } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { nome,sobrenome, email, telefone, dataNascimento, },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
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

// Solicitação de recuperação de senha
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires },
    });

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Ou outro serviço, como SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail de envio
        pass: process.env.EMAIL_PASS, // Senha ou App Password
      },
    });

    // Opções do e-mail
    const mailOptions = {
      from: '"Roomielink" <roomielink@gmail.com>', // E-mail de remetente
      to: email, // E-mail do destinatário
      subject: 'Redefinição de Senha',
      text: `Use este token para redefinir sua senha: ${resetToken}`,
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email de recuperação enviado.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao solicitar recuperação de senha.' });
  }
};

// Redefinição de senha
export const updatePassword = async (req, res) => {
  const { resetToken, novaSenha } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { resetToken, resetTokenExpires: { gt: new Date() } },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }

    const hashedSenha = await bcrypt.hash(novaSenha, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: user.id },
      data: { senha: hashedSenha, resetToken: null, resetTokenExpires: null },
    });

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao redefinir senha.' });
  }
};