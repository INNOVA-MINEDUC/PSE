import express from "express";
import {
  getNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from "../controllers/noticias.controller.js";
import { uploadNoticias } from "../meddleware/upload.middleware.js";
import path from "path";

const router = express.Router();

router.get("/", getNoticias);
router.post("/admin/noticias", createNoticia);
router.put("/admin/noticias/:id", updateNoticia);
router.delete("/admin/noticias/:id", deleteNoticia);

// Endpoint para subir imágenes de noticias
router.post(
  "/admin/noticias/upload",
  uploadNoticias.single("imagen"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No se subió ninguna imagen" });
    }
    // Devolver la ruta relativa para guardar en la base de datos
    const url = `/uploads/noticias/${req.file.filename}`;
    res.json({ success: true, url });
  }
);

export default router;