import express from "express";

const router = express.Router();

router.get("/atencion", (req, res) => {
  res.json({ success: true, message: "Ruta atención activa" });
});

export default router;