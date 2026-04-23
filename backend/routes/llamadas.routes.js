import express from "express";

const router = express.Router();

router.get("/llamadas", (req, res) => {
  res.json({ success: true, message: "Ruta llamadas activa" });
});

export default router;