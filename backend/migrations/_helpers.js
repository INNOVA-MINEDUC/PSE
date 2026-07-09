// Helpers compartidos para migraciones.
// Nombre con prefijo "_" → el glob de migrate.js (migrations/[0-9]*.js)
// NO lo toma como migración.

/**
 * Añade una columna solo si no existe. MySQL 8 no soporta
 * ADD COLUMN IF NOT EXISTS, por eso se consulta information_schema.
 */
export async function addColumnIfMissing(sequelize, table, column, definition, after) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  if (rows.length > 0) return false;
  const afterClause = after ? ` AFTER \`${after}\`` : "";
  await sequelize.query(
    `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}${afterClause}`
  );
  return true;
}

/** Elimina una columna solo si existe. */
export async function dropColumnIfExists(sequelize, table, column) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  if (rows.length === 0) return false;
  await sequelize.query(`ALTER TABLE \`${table}\` DROP COLUMN \`${column}\``);
  return true;
}
