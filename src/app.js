import express from "express";
import userRoutes from "./routes/userRoutes.js";
import estudanteRoutes from "./routes/estudanteRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", userRoutes); // Prefixo para as rotas de usuário
app.use("/api", estudanteRoutes); // Prefixo para as rotas de estudante

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
