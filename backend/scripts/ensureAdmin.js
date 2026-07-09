// Garantiza que el usuario administrador del nuevo sistema exista y esté correcto.
// Diseñado para ejecutarse como one-off container en el pipeline, después de las
// migraciones y antes de levantar la aplicación.
//
// Comportamiento según NODE_ENV:
//   development — si ADMIN_INITIAL_PASSWORD no está definida, usa contraseña
//                 temporal por defecto y advierte en los logs.
//   production  — si ADMIN_INITIAL_PASSWORD no está definida, emite warning y
//                 sale sin crear admin (nunca usa contraseña por defecto).
//
// Todos los caminos terminan con exit 0 (no bloquea el pipeline).

import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

dotenv.config();

const ADMIN_EMAIL   = "admin@pse.mineduc.edu.gt";
const ADMIN_USUARIO = "admin";
const ADMIN_NOMBRE  = "Administrador PSE";
const ADMIN_ROLE    = "admin";

// Contraseña de respaldo SOLO para development cuando ADMIN_INITIAL_PASSWORD no está definida.
const DEV_FALLBACK_PASSWORD = "DevAdmin2025@PSE";

async function main() {
  const isDev = process.env.NODE_ENV === "development";

  const db = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log(`[ensureAdmin] Conectado a ${process.env.DB_NAME}@${process.env.DB_HOST}`);
    console.log(`[ensureAdmin] Ambiente: ${isDev ? "development" : "production"}`);

    // ── Paso 1: verificar si el admin ya está completamente correcto ──────────
    const [correct] = await db.query(
      `SELECT id FROM users
       WHERE usuario = ?
         AND email   = ?
         AND role    = ? COLLATE utf8mb4_bin
         AND activo  = 1
       LIMIT 1`,
      [ADMIN_USUARIO, ADMIN_EMAIL, ADMIN_ROLE]
    );

    if (correct.length > 0) {
      console.log(`[ensureAdmin] Admin correcto ya existe (id=${correct[0].id}). No se requiere acción.`);
      return;
    }

    // ── Paso 2: resolver contraseña ───────────────────────────────────────────
    let adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

    if (!adminPassword) {
      if (!isDev) {
        console.warn(
          "[ensureAdmin] WARNING: El admin correcto no existe en la BD y\n" +
          "         ADMIN_INITIAL_PASSWORD no está definida en el entorno.\n" +
          "         En producción NO se usa contraseña por defecto.\n" +
          "         Define ADMIN_INITIAL_PASSWORD en el .env del servidor y vuelve a deployar."
        );
        return;
      }

      adminPassword = DEV_FALLBACK_PASSWORD;
      console.warn(
        `[ensureAdmin] WARNING: ADMIN_INITIAL_PASSWORD no definida.\n` +
        `         Usando contraseña temporal de desarrollo: ${DEV_FALLBACK_PASSWORD}\n` +
        "         Cambia esta contraseña después del primer login."
      );
    }

    // ── Paso 3: buscar si existe algún registro candidato (legacy o incompleto) ──
    const [candidate] = await db.query(
      `SELECT id, email, usuario, role, activo
       FROM users
       WHERE usuario = ? OR email = ?
       LIMIT 1`,
      [ADMIN_USUARIO, ADMIN_EMAIL]
    );

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    if (candidate.length > 0) {
      const u = candidate[0];
      console.log(
        `[ensureAdmin] Registro candidato encontrado (id=${u.id}, ` +
        `email=${u.email}, usuario=${u.usuario ?? "(null)"}, ` +
        `role=${u.role}, activo=${u.activo}). Actualizando...`
      );

      await db.query(
        `UPDATE users
         SET full_name      = ?,
             email          = ?,
             usuario        = ?,
             password_hash  = ?,
             role           = ?,
             activo         = 1,
             actualizado_en = NOW()
         WHERE id = ?`,
        [ADMIN_NOMBRE, ADMIN_EMAIL, ADMIN_USUARIO, passwordHash, ADMIN_ROLE, u.id]
      );

      console.log(`[ensureAdmin] Admin actualizado correctamente (id=${u.id}).`);
    } else {
      console.log("[ensureAdmin] No se encontró ningún registro candidato. Insertando admin nuevo...");

      const [result] = await db.query(
        `INSERT INTO users (full_name, email, usuario, password_hash, role, activo)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [ADMIN_NOMBRE, ADMIN_EMAIL, ADMIN_USUARIO, passwordHash, ADMIN_ROLE]
      );

      console.log(`[ensureAdmin] Admin insertado correctamente (id=${result.insertId}).`);
    }

    console.log(`   email   : ${ADMIN_EMAIL}`);
    console.log(`   usuario : ${ADMIN_USUARIO}`);
    console.log(`   role    : ${ADMIN_ROLE}`);
    console.log(`   activo  : 1`);
    console.log("[ensureAdmin] Listo.");
  } finally {
    await db.end();
  }
}

main().catch((err) => {
  // Errores inesperados (conexión fallida, SQL roto, etc.) loguean pero
  // no bloquean el pipeline — el backend levanta y el admin puede crearse
  // manualmente después.
  console.error("[ensureAdmin] Error inesperado:", err.message);
  process.exit(0);
});
