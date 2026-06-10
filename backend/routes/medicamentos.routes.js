import express from "express";
import {
  getMedicamentos,
  getMetricasMedicamentos,
  updateMetricasMedicamentos,
} from "../controllers/medicamentos.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { publicLimiter, protectedLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Público
router.get("/", publicLimiter, getMedicamentos);
router.get("/metricas", publicLimiter, getMetricasMedicamentos);

// Protegido
router.put("/metricas", protectedLimiter, requireToken, updateMetricasMedicamentos);

export default router;
