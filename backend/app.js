import dotenv from "dotenv";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.101.2.14:5173",
      "http://10.101.2.6:5173",
      "https://saludescolar-dev.mineduc.edu.gt",
      "https://saludescolar.mineduc.edu.gt",
    ],
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

// Login con ASISTO
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("BODY LOGIN:", req.body);

    const correoElectronico = String(req.body.correoElectronico || "").trim();
    const clave = String(req.body.clave || "").trim();

    if (!correoElectronico || !clave) {
      return res.status(400).json({
        success: false,
        error: "Correo y contraseña son requeridos.",
      });
    }

    const mutation = `
      mutation IniciarSesion {
        iniciarSesion(
          clave: "${clave}"
          correoElectronico: "${correoElectronico}"
          sistemaClave: "ASISTO"
        ) {
          token
        }
      }
    `;

    const response = await axios.post(
      process.env.API,
      {
        query: mutation,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "RESPUESTA GRAPHQL LOGIN:",
      JSON.stringify(response.data, null, 2)
    );

    if (response.data.errors) {
      return res.status(401).json({
        success: false,
        error: response.data.errors[0].message || "Credenciales incorrectas",
      });
    }

    const token = response?.data?.data?.iniciarSesion?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No se recibió token desde ASISTO",
      });
    }

    return res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("ERROR LOGIN:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "Error interno en login",
    });
  }
});

// Usuario actual
app.get("/api/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Token no proporcionado",
      });
    }

    const query = `
      query {
        usuarioActual {
          nombres
          apellidos
          roles {
            clave
            nombre
          }
        }
      }
    `;

    const response = await axios.post(
      process.env.API,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    console.log(
      "RESPUESTA GRAPHQL ME:",
      JSON.stringify(response.data, null, 2)
    );

    if (response.data.errors) {
      return res.status(401).json({
        success: false,
        error: response.data.errors[0].message || "Token inválido",
      });
    }

    return res.json({
      success: true,
      user: response?.data?.data?.usuarioActual || null,
    });
  } catch (err) {
    console.error("ERROR /me:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "Error al validar sesión",
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