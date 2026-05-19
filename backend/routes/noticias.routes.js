import express from "express";
import {
  getNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from "../controllers/noticias.controller.js";
import { uploadNoticias } from "../meddleware/upload.middleware.js";

const router = express.Router();

router.get("/", getNoticias);
router.post("/", createNoticia);
router.put("/:id", updateNoticia);
router.delete("/:id", deleteNoticia);

router.post("/upload", uploadNoticias.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No se subió ninguna imagen",
    });
  }

  const url = `/uploads/noticias/${req.file.filename}`;
  res.json({ success: true, url });
});

export default router;