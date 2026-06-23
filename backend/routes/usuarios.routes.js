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

// Todas las rutas requieren token válido + rol admin
const adminOnly = [protectedLimiter, requireToken, requireRole("admin")];

router.get("/",                      adminOnly, listUsuarios);
router.post("/",                     adminOnly, createUsuario);
router.put("/:id",                   adminOnly, updateUsuario);
router.patch("/:id/toggle-activo",   adminOnly, toggleActivo);
router.patch("/:id/reset-password",  adminOnly, resetPassword);

export default router;
