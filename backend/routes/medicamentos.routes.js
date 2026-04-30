import express from "express";
import { getMedicamentos } from "../controllers/medicamentos.controller.js";

const router = express.Router();

router.get("/", getMedicamentos);

export default router;