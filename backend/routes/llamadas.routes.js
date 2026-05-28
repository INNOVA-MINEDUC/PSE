import express from "express";
import {
  getLlamadas,
  getMetricasLlamadas,
  updateMetricasLlamadas,
} from "../controllers/llamadas.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Público
router.get("/", getLlamadas);
router.get("/metricas", getMetricasLlamadas);

// Protegido
router.put("/metricas", requireToken, updateMetricasLlamadas);

export default router;
