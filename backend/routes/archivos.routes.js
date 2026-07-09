import express from "express";
import { viewArchivo } from "../controllers/archivos.controller.js";

const router = express.Router();

// Proxy público de visualización de archivos del bucketService.
router.get("/:key/view", viewArchivo);

router.get("/:modulo", (req, res) => {
  res.json({ success: true, modulo: req.params.modulo });
});

export default router;