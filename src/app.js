import express from "express";
import userRoutes from "./routes/userRoutes.js";
// import estudanteRoutes from "./routes/estudanteRoutes.js";
// import anuncianteRoutes from "./routes/anuncianteRoutes.js";
// import imovelRoutes from "./routes/imovelRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes); // Prefixo para as rotas de usuário
// app.use("/api", estudanteRoutes);
// app.use("/api", anuncianteRoutes);
// app.use("/api", imovelRoutes);


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

export default app;