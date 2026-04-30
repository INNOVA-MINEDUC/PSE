import express from "express";
import {
  getNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from "../controllers/noticias.controller.js";

const router = express.Router();

router.get("/noticias", getNoticias);
router.post("/admin/noticias", createNoticia);
router.put("/admin/noticias/:id", updateNoticia);
router.delete("/admin/noticias/:id", deleteNoticia);

export default router;