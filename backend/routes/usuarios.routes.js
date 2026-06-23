import express from "express";
import {
  listUsuarios,
  createUsuario,
  updateUsuario,
  toggleActivo,
  resetPassword,
} from "../controllers/usuarios.controller.js";
import { requireToken, requireRole } from "../middleware/auth.middleware.js";
import { protectedLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.get("/",                     protectedLimiter, requireToken, requireRole("admin"), listUsuarios);
router.post("/",                    protectedLimiter, requireToken, requireRole("admin"), createUsuario);
router.put("/:id",                  protectedLimiter, requireToken, requireRole("admin"), updateUsuario);
router.patch("/:id/toggle-activo",  protectedLimiter, requireToken, requireRole("admin"), toggleActivo);
router.patch("/:id/reset-password", protectedLimiter, requireToken, requireRole("admin"), resetPassword);

export default router;
