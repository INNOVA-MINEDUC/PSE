import express from "express";
import { listAuditoria } from "../controllers/auditoria.controller.js";
import { exportPdf, exportExcel, exportCsv } from "../controllers/auditoria-export.controller.js";
import { requireToken, requireRole } from "../middleware/auth.middleware.js";
import { protectedLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();
const guard  = [protectedLimiter, requireToken, requireRole("admin")];

router.get("/",              ...guard, listAuditoria);
router.get("/export/pdf",   ...guard, exportPdf);
router.get("/export/excel", ...guard, exportExcel);
router.get("/export/csv",   ...guard, exportCsv);

export default router;
