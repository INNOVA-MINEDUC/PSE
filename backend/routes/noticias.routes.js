import express from "express";
import {
  getNoticias,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from "../controllers/noticias.controller.js";

import { uploadNoticias } from "../meddleware/upload.middleware.js";
import { requireToken } from "../middleware/auth.middleware.js";
import { publicLimiter, protectedLimiter, uploadLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Lectura pública — el portal los consume sin autenticación
router.get("/", publicLimiter, getNoticias);
router.get("/:id", publicLimiter, getNoticiaById);

// Escritura protegida — requiere token ASISTO válido
router.post("/", protectedLimiter, requireToken, createNoticia);
router.put("/:id", protectedLimiter, requireToken, updateNoticia);
router.delete("/:id", protectedLimiter, requireToken, deleteNoticia);

router.post("/upload", uploadLimiter, requireToken, uploadNoticias.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No se subió ninguna imagen",
    });
  }

  const url = `/uploads/noticias/${req.file.filename}`;

  res.json({
    success: true,
    url,
  });
});

export default router;