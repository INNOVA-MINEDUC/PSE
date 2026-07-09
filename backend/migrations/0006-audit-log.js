// ============================================================
// 0006 — Tabla de auditoría / bitácora del sistema PSE
//
// Registra acciones administrativas: autenticación, usuarios,
// noticias y métricas. Una sola tabla cubre todos los módulos.
//
// Idempotente: verifica si la tabla ya existe antes de crearla.
// No modifica migraciones anteriores (0001–0005).
// ============================================================

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;

  const [tables] = await sequelize.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'audit_log'
     LIMIT 1`
  );

  if (tables.length > 0) {
    console.log("[0006] Tabla audit_log ya existe. Se omite la creación.");
    return;
  }

  await sequelize.query(`
    CREATE TABLE audit_log (
      id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      usuario_id     INT          NULL,
      usuario_nombre VARCHAR(255) NULL,
      usuario_email  VARCHAR(255) NULL,
      accion         VARCHAR(80)  NOT NULL,
      modulo         VARCHAR(50)  NOT NULL,
      entidad_id     INT          NULL,
      descripcion    VARCHAR(500) NULL,
      valores_ant    JSON         NULL,
      valores_nuevo  JSON         NULL,
      ip_origen      VARCHAR(45)  NULL,
      created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

      INDEX idx_modulo   (modulo),
      INDEX idx_accion   (accion),
      INDEX idx_usuario  (usuario_id),
      INDEX idx_fecha    (created_at),
      INDEX idx_entidad  (modulo, entidad_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log("[0006] Tabla audit_log creada correctamente.");
}

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  await sequelize.query(`DROP TABLE IF EXISTS audit_log`);
  console.log("[0006] Tabla audit_log eliminada.");
}
