import express from "express";
import {
  getFunerario,
  getMetricasFunerario,
  updateMetricasFunerario,
} from "../controllers/funerario.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { uploadPdf } from "../meddleware/upload.middleware.js";
import { publicLimiter, protectedLimiter, uploadLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Público
router.get("/", publicLimiter, getFunerario);
router.get("/metricas", publicLimiter, getMetricasFunerario);

// Protegido
router.put("/metricas", protectedLimiter, requireToken, updateMetricasFunerario);

router.post("/upload-pdf", uploadLimiter, requireToken, uploadPdf.single("archivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No se subió ningún archivo PDF" });
  }
  res.json({ success: true, url: `/uploads/docs/${req.file.filename}` });
});

export default router;
