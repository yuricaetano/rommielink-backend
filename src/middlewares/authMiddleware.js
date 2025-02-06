import jwt from "jsonwebtoken";

// Lista de tokens inválidos (se necessário)
const invalidTokens = [];

const studentAuthMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado" });
  }

  if (invalidTokens.includes(token)) {
    return res.status(403).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.tipo !== 'estudante') {
      return res.status(403).json({ message: "Acesso restrito a estudantes" });
    }

    if (!decoded.id) {
      return res.status(400).json({ message: "ID do estudante não encontrado" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default studentAuthMiddleware;
