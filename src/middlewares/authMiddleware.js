import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho Authorization
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Verifica se o usuário é um anunciante
    if (decoded.tipo !== 'anunciante') {
      return res.status(403).json({ message: "Acesso restrito a anunciantes" });
    }

    // Adiciona as informações do usuário (decodificadas do token) à requisição
    req.user = decoded;

    next(); // Chama a próxima função ou rota
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
