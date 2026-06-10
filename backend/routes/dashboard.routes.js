import express from "express";
import { getKpis } from "../controllers/dashboard.controller.js";
import { publicLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.get("/kpis", publicLimiter, getKpis);

export default router;