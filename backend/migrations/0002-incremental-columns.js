// ============================================================
// 0002 — Columnas incrementales
//
// Para BD ya existentes creadas antes de añadir estas columnas.
// MySQL 8 NO soporta `ADD COLUMN IF NOT EXISTS`, así que se
// verifica contra information_schema antes de cada ALTER.
// En BD nueva el baseline (0001) ya las creó → todas se omiten.
// ============================================================

import { addColumnIfMissing, dropColumnIfExists } from "./_helpers.js";

const COLUMNS = [
  ["noticias", "miniatura_url", "TEXT NULL", "imagen_url"],
  ["noticias", "hero_url", "TEXT NULL", "miniatura_url"],
  ["noticias", "autor", "VARCHAR(255) NULL", "hero_url"],
  ["metricas_llamadas", "casos_atendidos", "INT DEFAULT 0", "total_llamadas"],
  ["metricas_llamadas", "usuarios_beneficiados", "INT DEFAULT 0", "casos_atendidos"],
  ["metricas_llamadas", "video_url", "TEXT NULL", "periodo"],
  ["metricas_funerario", "apoyos_otorgados", "INT DEFAULT 0", "familias_beneficiadas"],
  ["metricas_funerario", "cobertura", "VARCHAR(255) DEFAULT ''", "apoyos_otorgados"],
  ["metricas_funerario", "video_url", "TEXT NULL", "periodo"],
  ["metricas_funerario", "folleto_url", "TEXT NULL", "video_url"],
  ["metricas_funerario", "formulario_url", "TEXT NULL", "folleto_url"],
];

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  for (const [table, column, definition, after] of COLUMNS) {
    await addColumnIfMissing(sequelize, table, column, definition, after);
  }
}

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  for (const [table, column] of [...COLUMNS].reverse()) {
    await dropColumnIfExists(sequelize, table, column);
  }
}
