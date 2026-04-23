import express from "express";

const router = express.Router();

router.get("/medicamentos", (req, res) => {
  res.json({ success: true, message: "Ruta medicamentos activa" });
});

export default router;