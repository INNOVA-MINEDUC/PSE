import express from "express";

const router = express.Router();

router.get("/funerario", (req, res) => {
  res.json({ success: true, message: "Ruta funerario activa" });
});

export default router;