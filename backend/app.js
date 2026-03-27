import dotenv from "dotenv";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.101.2.14:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

let db;

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

/**
 * LOGIN REAL (con BD)
 * Body: { email, password }
 * Respuesta:
 *  - ok: true/false
 *  - user: { id, email, full_name, role }
 *  - token: JWT
 */
app.post("/api/auth/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "").trim();

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email y contraseña son requeridos.",
      });
    }

    // Buscar usuario
    const [rows] = await db.query(
      `SELECT id, email, password_hash, full_name, role
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    const user = rows[0];

    // Comparar contraseña (hash)
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    // JWT (si no hay JWT_SECRET, usamos uno “dev” para que no truene en local)
    const secret = process.env.JWT_SECRET || "dev-secret-change-me";
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "8h" }
    );

    return res.json({
      ok: true,
      message: "Login correcto ✅",
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Error en /api/auth/login:", err);
    return res.status(500).json({
      ok: false,
      message: "Error interno en login",
    });
  }
});

async function start() {
  db = await mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Error arrancando backend:", err);
  process.exit(1);
});