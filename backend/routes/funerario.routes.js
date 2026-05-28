import express from "express";
import {
  getFunerario,
  getMetricasFunerario,
  updateMetricasFunerario,
} from "../controllers/funerario.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Público
router.get("/", getFunerario);
router.get("/metricas", getMetricasFunerario);

// Protegido
router.put("/metricas", requireToken, updateMetricasFunerario);

export default router;
