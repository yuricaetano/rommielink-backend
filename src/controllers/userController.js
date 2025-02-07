export const createUser = async (req, res) => {
  const { nome, sobrenome, email, senha, confirmarSenha, telefone, dataNascimento, tipoUsuario } = req.body;

  try {
    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    // Verificar se o tipo de usuário é válido
    if (!["Estudante", "Anunciante"].includes(tipoUsuario)) {
      return res.status(400).json({ error: 'Tipo de usuário inválido. Escolha "Estudante" ou "Anunciante".' });
    }

    // Verificar se o email já existe
    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
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
        tipo: tipoUsuario, // Agora armazenando corretamente
      },
    });

    console.log("Usuário criado:", { id: newUser.id, email: newUser.email });

    // Gerar token JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, tipo: newUser.tipo }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};
