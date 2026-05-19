import express from "express";

const router = express.Router();


router.get("/:modulo", (req, res) => {
  res.json({ success: true, modulo: req.params.modulo });
});

export default router;