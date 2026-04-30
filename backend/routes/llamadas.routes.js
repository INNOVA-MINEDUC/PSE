import express from "express";
import { getLlamadas } from "../controllers/llamadas.controller.js";

const router = express.Router();

router.get("/", getLlamadas);

export default router;