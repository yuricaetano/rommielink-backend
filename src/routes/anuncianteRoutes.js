import {Router} from "express";
import {
  tornarAnunciante,
  listarImoveisDoAnunciante,
  criarImovel,
} from "../controllers/anuncianteController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();
// Torna o usuário um anunciante
router.post("/", authenticate, tornarAnunciante);
// Lista todos os imóveis do anunciante autenticado
router.get("/imoveis", authenticate, listarImoveisDoAnunciante);
// Cria um novo imóvel para o anunciante autenticado
router.post("/imoveis", authenticate, criarImovel);

export default router;