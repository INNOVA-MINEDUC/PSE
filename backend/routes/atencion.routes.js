import express from "express";
import {
  getAtencion,
  getMetricasAtencion,
  updateMetricasAtencion,
} from "../controllers/atencion.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { publicLimiter, protectedLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Público
router.get("/", publicLimiter, getAtencion);
router.get("/metricas", publicLimiter, getMetricasAtencion);

// Protegido
router.put("/metricas", protectedLimiter, requireToken, updateMetricasAtencion);

export default router;
