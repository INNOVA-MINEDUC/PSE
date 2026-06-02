import express from "express";
import {
  getFunerario,
  getMetricasFunerario,
  updateMetricasFunerario,
} from "../controllers/funerario.controller.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { uploadPdf } from "../meddleware/upload.middleware.js";

const router = express.Router();

// Público
router.get("/", getFunerario);
router.get("/metricas", getMetricasFunerario);

// Protegido
router.put("/metricas", requireToken, updateMetricasFunerario);

router.post("/upload-pdf", requireToken, uploadPdf.single("archivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No se subió ningún archivo PDF" });
  }
  res.json({ success: true, url: `/uploads/docs/${req.file.filename}` });
});

export default router;
