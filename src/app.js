import express from "express";
import userRoutes from "./routes/userRoutes.js";
import estudanteRoutes from "./routes/estudanteRoutes.js";
import preferenciasRoutes from "./routes/preferenciasRoutes.js";
import proximidadesRoutes from "./routes/proximidadesRoutes.js";
import anuncianteRoutes from "./routes/anuncianteRoutes.js";
import imovelRoutes from "./routes/imovelRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes); // Prefixo para as rotas de usuário
app.use("/api/estudante", estudanteRoutes);
app.use("/api/preferencias", preferenciasRoutes);
app.use("/api/proximidades", proximidadesRoutes);
app.use("/api/anunciante", anuncianteRoutes);
app.use("/api/imovel", imovelRoutes);
app.use(cors({
    origin: "http://localhost:3000", // Permite apenas o frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  }));

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));

export default app;