// ============================================================
// 0005 — Ampliación de tabla users: autenticación propia PSE
//
// Agrega las columnas faltantes para reemplazar ASISTO:
//   usuario        VARCHAR(50) UNIQUE  — nombre de inicio de sesión
//   activo         TINYINT(1)          — estado del usuario
//   actualizado_en DATETIME            — timestamp de última edición
//
// Seed de administrador inicial:
//   - Si ya existe un usuario con role='admin' → no hace nada.
//   - Si no existe admin y ADMIN_INITIAL_PASSWORD está definida
//     → crea el usuario administrador con esa contraseña.
//   - Si no existe admin y ADMIN_INITIAL_PASSWORD NO está definida
//     → muestra un warning y continúa sin fallar.
//
// Idempotente: addColumnIfMissing + verificación previa de admin.
// No modifica migraciones anteriores (0001–0004).
// ============================================================

import bcrypt from "bcrypt";
import { addColumnIfMissing } from "./_helpers.js";

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;

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

  console.log("[0005] Tabla users ampliada correctamente.");

  // ── Seed: usuario administrador inicial ───────────────────
  const [adminRows] = await sequelize.query(
    `SELECT 1
     FROM users
     WHERE usuario  = 'admin'
       AND email    = 'admin@pse.mineduc.edu.gt'
       AND role     = 'admin' COLLATE utf8mb4_bin
       AND activo   = 1
     LIMIT 1`
  );

  if (adminRows.length) {
    console.log("[0005] Ya existe un usuario con role='admin'. Se omite la creación del admin inicial.");
    return;
  }

  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!adminPassword) {
    console.warn(
      "[0005] WARNING: No se encontró un administrador ni la variable ADMIN_INITIAL_PASSWORD.\n" +
      "         No se creó el usuario administrador inicial.\n" +
      "         Define ADMIN_INITIAL_PASSWORD en tu archivo .env y vuelve a ejecutar\n" +
      "         el script de seed: node scripts/seedAdmin.js"
    );
    return;
  }

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

  console.log("[0005] Admin inicial creado: admin@pse.mineduc.edu.gt / usuario: admin");
}

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;

  // Revertir solo lo que esta migración pudo haber insertado
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
