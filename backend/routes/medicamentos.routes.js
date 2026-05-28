import express from "express";
import {
  getMedicamentos,
  getMetricasMedicamentos,
  updateMetricasMedicamentos,
} from "../controllers/medicamentos.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Público
router.get("/", getMedicamentos);
router.get("/metricas", getMetricasMedicamentos);

// Protegido
router.put("/metricas", requireToken, updateMetricasMedicamentos);

export default router;
