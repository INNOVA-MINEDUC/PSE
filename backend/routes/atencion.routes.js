import express from "express";
import {
  getAtencion,
  getMetricasAtencion,
  updateMetricasAtencion,
} from "../controllers/atencion.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Público
router.get("/", getAtencion);
router.get("/metricas", getMetricasAtencion);

// Protegido
router.put("/metricas", requireToken, updateMetricasAtencion);

export default router;
