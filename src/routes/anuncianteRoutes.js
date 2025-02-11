import {Router} from "express";
import {
  tornarAnunciante
} from "../controllers/anuncianteController.js";
import authMiddleware  from "../middlewares/authMiddleware.js";

const router = Router();
// Torna o usuário um anunciante
router.post("/", authMiddleware, tornarAnunciante);

export default router;