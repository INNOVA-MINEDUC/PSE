import dotenv from "dotenv";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

import dashboardRoutes from "./routes/dashboard.routes.js";
import noticiasRoutes from "./routes/noticias.routes.js";
import atencionRoutes from "./routes/atencion.routes.js";
import medicamentosRoutes from "./routes/medicamentos.routes.js";
import llamadasRoutes from "./routes/llamadas.routes.js";
import funerarioRoutes from "./routes/funerario.routes.js";
import archivosRoutes from "./routes/archivos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import { uploadLimiter, protectedLimiter } from "./middleware/rateLimiter.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// App corre detrás de un reverse proxy (nginx). Confiar en el primer
// hop para que express-rate-limit lea bien X-Forwarded-For.
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.101.2.14:5173",
      "http://10.101.2.6:5173",
      "https://saludescolar-dev.mineduc.edu.gt",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let db;

app.use((req, res, next) => {
  req.db = db;
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API PSE funcionando",
    time: new Date().toISOString(),
  });
});

// DB check
app.get("/api/db-check", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Login local (reemplaza ASISTO) ───────────────────────────
app.post("/api/auth/login", uploadLimiter, async (req, res) => {
  try {
    const usuario  = String(req.body.usuario  || "").trim();
    const password = String(req.body.password || "").trim();

    if (!usuario || !password) {
      return res.status(400).json({
        success: false,
        error: "Usuario y contraseña son requeridos.",
      });
    }

    // Acepta nombre de usuario o correo electrónico
    const [rows] = await db.query(
      `SELECT id, full_name, email, usuario, password_hash, role, activo
       FROM users
       WHERE (usuario = ? OR email = ?) AND activo = 1
       LIMIT 1`,
      [usuario, usuario]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        error: "Credenciales incorrectas.",
      });
    }

    const u = rows[0];
    const match = await bcrypt.compare(password, u.password_hash);

    if (!match) {
      return res.status(401).json({
        success: false,
        error: "Credenciales incorrectas.",
      });
    }

    const token = jwt.sign(
      { id: u.id, usuario: u.usuario, rol: u.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id:      u.id,
        nombre:  u.full_name,
        correo:  u.email,
        usuario: u.usuario,
        rol:     u.role,
      },
    });
  } catch (err) {
    console.error("ERROR LOGIN:", err.message);
    return res.status(500).json({ success: false, error: "Error interno en login" });
  }
});

// ── Usuario actual ────────────────────────────────────────────
app.get("/api/auth/me", protectedLimiter, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token no proporcionado" });
    }

    const token   = authHeader.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query(
      `SELECT id, full_name, email, usuario, role, activo
       FROM users WHERE id = ? AND activo = 1 LIMIT 1`,
      [payload.id]
    );

    if (!rows.length) {
      return res.status(401).json({ success: false, error: "Sesión inválida" });
    }

    const u = rows[0];
    return res.json({
      success: true,
      user: {
        id:      u.id,
        nombre:  u.full_name,
        correo:  u.email,
        usuario: u.usuario,
        rol:     u.role,
      },
    });
  } catch {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
});

// ── Rutas del sistema ─────────────────────────────────────────
app.use("/api/dashboard",    dashboardRoutes);
app.use("/api/noticias",     noticiasRoutes);
app.use("/api/atencion",     atencionRoutes);
app.use("/api/medicamentos", medicamentosRoutes);
app.use("/api/llamadas",     llamadasRoutes);
app.use("/api/funerario",    funerarioRoutes);
app.use("/api/archivos",     archivosRoutes);
app.use("/api/usuarios",     usuariosRoutes);

// Las migraciones NO corren en el arranque de la app.
// Se ejecutan como paso aparte del pipeline (one-off container)
// vía `node migrate.js up` antes del deploy. Ver migrate.js.
async function start() {
  db = await mysql.createPool({
    host:             process.env.DB_HOST,
    port:             Number(process.env.DB_PORT),
    user:             process.env.DB_USER,
    password:         process.env.DB_PASSWORD,
    database:         process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit:  10,
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Error arrancando backend:", err);
  process.exit(1);
});
