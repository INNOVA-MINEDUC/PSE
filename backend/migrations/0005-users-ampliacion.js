// ============================================================
// 0005 — Ampliación de tabla users: autenticación propia PSE
//
// Agrega las columnas faltantes para reemplazar ASISTO:
//   usuario        VARCHAR(50) UNIQUE  — nombre de inicio de sesión
//   activo         TINYINT(1)          — estado del usuario
//   actualizado_en DATETIME            — timestamp de última edición
//
// Inserta el usuario administrador inicial cuya contraseña
// se lee desde la variable de entorno ADMIN_INITIAL_PASSWORD.
// La migración falla intencionalmente si esa variable no está
// definida para evitar instalar el sistema sin credenciales.
//
// Idempotente: addColumnIfMissing + INSERT IGNORE.
// No modifica migraciones anteriores (0001–0004).
// ============================================================

import bcrypt from "bcrypt";
import { addColumnIfMissing } from "./_helpers.js";

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;

  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!adminPassword) {
    throw new Error(
      "[0005] Variable de entorno ADMIN_INITIAL_PASSWORD no definida.\n" +
        "Define la contraseña del administrador inicial en tu archivo .env\n" +
        "antes de ejecutar esta migración.\n" +
        "Ejemplo: ADMIN_INITIAL_PASSWORD=TuContraseñaSegura2025@"
    );
  }

  // ── Columnas nuevas ────────────────────────────────────────
  await addColumnIfMissing(
    sequelize,
    "users",
    "usuario",
    "VARCHAR(50) NULL",
    "full_name"
  );

  await addColumnIfMissing(
    sequelize,
    "users",
    "activo",
    "TINYINT(1) NOT NULL DEFAULT 1",
    "role"
  );

  await addColumnIfMissing(
    sequelize,
    "users",
    "actualizado_en",
    "DATETIME NULL ON UPDATE CURRENT_TIMESTAMP",
    "created_at"
  );

  // Índice UNIQUE en usuario (solo si aún no existe)
  const [idxRows] = await sequelize.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME   = 'users'
       AND INDEX_NAME   = 'uq_users_usuario'
     LIMIT 1`
  );
  if (!idxRows.length) {
    await sequelize.query(
      `ALTER TABLE users ADD UNIQUE INDEX uq_users_usuario (usuario)`
    );
  }

  // Normalizar el DEFAULT del campo role a 'user' (era 'ADMIN')
  await sequelize.query(
    `ALTER TABLE users MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user'`
  );

  // ── Seed: usuario administrador inicial ───────────────────
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await sequelize.query(
    `INSERT IGNORE INTO users (full_name, email, usuario, password_hash, role, activo)
     VALUES (?, ?, ?, ?, 'admin', 1)`,
    {
      replacements: [
        "Administrador PSE",
        "admin@pse.mineduc.edu.gt",
        "admin",
        passwordHash,
      ],
      type: "INSERT",
    }
  );

  console.log("[0005] Tabla users ampliada. Admin inicial: admin@pse.mineduc.edu.gt / usuario: admin");
}

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;

  // Revertir solo lo que esta migración agregó
  await sequelize.query(
    `DELETE FROM users WHERE email = 'admin@pse.mineduc.edu.gt' AND usuario = 'admin'`
  );

  // Eliminar índice único si existe
  const [idxRows] = await sequelize.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME   = 'users'
       AND INDEX_NAME   = 'uq_users_usuario'
     LIMIT 1`
  );
  if (idxRows.length) {
    await sequelize.query(`ALTER TABLE users DROP INDEX uq_users_usuario`);
  }

  const { dropColumnIfExists } = await import("./_helpers.js");
  await dropColumnIfExists(sequelize, "users", "actualizado_en");
  await dropColumnIfExists(sequelize, "users", "activo");
  await dropColumnIfExists(sequelize, "users", "usuario");

  await sequelize.query(
    `ALTER TABLE users MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'ADMIN'`
  );
}
