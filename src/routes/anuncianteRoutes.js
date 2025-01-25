import {Router} from "express";
import {
  tornarAnunciante,
  listarImoveisDoAnunciante,
  criarImovel,
} from "../controllers/anuncianteController.js";
import authMiddleware  from "../middlewares/authMiddleware.js";

const router = Router();
// Torna o usuário um anunciante
router.post("/", authMiddleware, tornarAnunciante);
// Lista todos os imóveis do anunciante autenticado
router.get("/imovel", authMiddleware, listarImoveisDoAnunciante);
// Cria um novo imóvel para o anunciante autenticado
router.post("/imovel", authMiddleware, criarImovel);

export default router;