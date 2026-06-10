import express from "express";
import {
  getLlamadas,
  getMetricasLlamadas,
  updateMetricasLlamadas,
} from "../controllers/llamadas.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { publicLimiter, protectedLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Público
router.get("/", publicLimiter, getLlamadas);
router.get("/metricas", publicLimiter, getMetricasLlamadas);

// Protegido
router.put("/metricas", protectedLimiter, requireToken, updateMetricasLlamadas);

export default router;
