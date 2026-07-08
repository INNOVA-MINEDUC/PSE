import express from "express";
import {
  getNoticias,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia,
  addGaleriaImage,
  addGaleriaImagesBatch,
  deleteGaleriaImage,
} from "../controllers/noticias.controller.js";

import { uploadNoticias } from "../meddleware/upload.middleware.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { publicLimiter, protectedLimiter, uploadLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Lectura pública — el portal los consume sin autenticación
router.get("/", publicLimiter, getNoticias);
router.get("/:id", publicLimiter, getNoticiaById);

// Escritura protegida — requiere token válido (rol admin o user)
router.post("/", protectedLimiter, requireToken, createNoticia);
router.put("/:id", protectedLimiter, requireToken, updateNoticia);
router.delete("/:id", protectedLimiter, requireToken, deleteNoticia);

// Upload imagen miniatura/hero
router.post("/upload", uploadLimiter, requireToken, uploadNoticias.single("imagen"), (req, res) => {
  if (!req.file || !req.storageFile) {
    return res.status(400).json({ success: false, error: "No se subió ninguna imagen" });
  }
  res.json({ success: true, url: req.storageFile.key });
});

// Galería de imágenes adicionales
router.post("/:id/galeria", uploadLimiter, requireToken, uploadNoticias.single("imagen"), addGaleriaImage);
router.post("/:id/galeria/batch", uploadLimiter, requireToken, uploadNoticias.array("imagenes", 20), addGaleriaImagesBatch);
router.delete("/:id/galeria/:imgId", protectedLimiter, requireToken, deleteGaleriaImage);

export default router;
