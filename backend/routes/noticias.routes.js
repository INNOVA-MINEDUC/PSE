import express from "express";

const router = express.Router();

router.get("/noticias", (req, res) => {
  res.json({ success: true, message: "Ruta noticias activa" });
});

export default router;