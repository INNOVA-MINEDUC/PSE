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

const router = express.Router();

// Lectura pública — el portal los consume sin autenticación
router.get("/", getNoticias);
router.get("/:id", getNoticiaById);

// Escritura protegida — requiere token ASISTO válido
router.post("/", requireToken, createNoticia);
router.put("/:id", requireToken, updateNoticia);
router.delete("/:id", requireToken, deleteNoticia);

router.post("/upload", requireToken, uploadNoticias.single("imagen"), (req, res) => {
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