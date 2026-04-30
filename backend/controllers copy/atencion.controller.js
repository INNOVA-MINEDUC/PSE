import express from "express";
import { getAtencion } from "../controllers/atencion.controller.js";

const router = express.Router();

router.get("/", getAtencion);

export default router;.