import express from "express";
import { getFunerario } from "../controllers/funerario.controller.js";

const router = express.Router();

router.get("/", getFunerario);

export default router;,