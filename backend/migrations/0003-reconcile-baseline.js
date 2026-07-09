// ============================================================
// 0003 — Reconciliar columnas con el baseline
//
// Las BD de producción se crearon desde un esquema viejo al que
// le faltaban columnas (ej. `noticias.contenido`). 0001 no recrea
// tablas existentes y 0002 solo cubrió un subconjunto, por lo que
// quedó drift. Esta migración garantiza que TODA columna del
// baseline exista, añadiendo solo las que faltan (idempotente).
//
// En una BD sana → todas existen → no hace nada.
// Solo columnas nullable o con DEFAULT (seguras de añadir a tablas
// con datos). No toca PK ni columnas NOT NULL sin default.
// ============================================================
import { addColumnIfMissing } from "./_helpers.js";

// [tabla, columna, definición, AFTER]
const COLUMNS = [
  // users
  ["users", "full_name", "VARCHAR(255) NULL", "password_hash"],
  ["users", "role", "VARCHAR(50) NOT NULL DEFAULT 'ADMIN'", "full_name"],
  ["users", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", "role"],

  // noticias
  ["noticias", "descripcion_corta", "TEXT NULL", "titulo"],
  ["noticias", "contenido", "LONGTEXT NULL", "descripcion_corta"],
  ["noticias", "imagen_url", "TEXT NULL", "contenido"],
  ["noticias", "miniatura_url", "TEXT NULL", "imagen_url"],
  ["noticias", "hero_url", "TEXT NULL", "miniatura_url"],
  ["noticias", "autor", "VARCHAR(255) NULL", "hero_url"],
  ["noticias", "fecha_publicacion", "DATE NULL", "autor"],
  ["noticias", "modulo", "VARCHAR(100) NULL", "fecha_publicacion"],
  ["noticias", "activo", "TINYINT DEFAULT 1", "modulo"],
  ["noticias", "orden", "INT DEFAULT 0", "activo"],
  ["noticias", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", "orden"],

  // metricas_atencion
  ["metricas_atencion", "consultas_atendidas", "INT NULL", null],
  ["metricas_atencion", "estudiantes_atendidos", "INT NULL", null],
  ["metricas_atencion", "porcentaje_hombres", "INT NULL", null],
  ["metricas_atencion", "porcentaje_mujeres", "INT NULL", null],
  ["metricas_atencion", "periodo", "VARCHAR(100) NULL", null],
  ["metricas_atencion", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", null],

  // atencion_departamento
  ["atencion_departamento", "departamento", "VARCHAR(100) NULL", null],
  ["atencion_departamento", "consultas", "INT NULL", null],
  ["atencion_departamento", "estudiantes", "INT NULL", null],
  ["atencion_departamento", "establecimientos", "INT NULL", null],
  ["atencion_departamento", "periodo", "VARCHAR(100) NULL", null],

  // metricas_medicamentos
  ["metricas_medicamentos", "unidades_entregadas", "INT NULL", null],
  ["metricas_medicamentos", "establecimientos_con_suministro", "INT NULL", null],
  ["metricas_medicamentos", "cobertura_nacional", "INT NULL", null],
  ["metricas_medicamentos", "periodo", "VARCHAR(100) NULL", null],
  ["metricas_medicamentos", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", null],

  // medicamentos_departamento
  ["medicamentos_departamento", "departamento", "VARCHAR(100) NULL", null],
  ["medicamentos_departamento", "unidades", "INT NULL", null],
  ["medicamentos_departamento", "establecimientos", "INT NULL", null],
  ["medicamentos_departamento", "periodo", "VARCHAR(100) NULL", null],

  // metricas_llamadas
  ["metricas_llamadas", "total_llamadas", "INT NULL", null],
  ["metricas_llamadas", "casos_atendidos", "INT DEFAULT 0", "total_llamadas"],
  ["metricas_llamadas", "usuarios_beneficiados", "INT DEFAULT 0", "casos_atendidos"],
  ["metricas_llamadas", "periodo", "VARCHAR(100) NULL", null],
  ["metricas_llamadas", "video_url", "TEXT NULL", "periodo"],
  ["metricas_llamadas", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", null],

  // metricas_funerario
  ["metricas_funerario", "familias_beneficiadas", "INT NULL", null],
  ["metricas_funerario", "apoyos_otorgados", "INT DEFAULT 0", "familias_beneficiadas"],
  ["metricas_funerario", "cobertura", "VARCHAR(255) DEFAULT ''", "apoyos_otorgados"],
  ["metricas_funerario", "monto_total", "DECIMAL(12,2) NULL", null],
  ["metricas_funerario", "monto_por_estudiante", "DECIMAL(12,2) NULL", null],
  ["metricas_funerario", "casos_masculinos", "INT NULL", null],
  ["metricas_funerario", "casos_femeninos", "INT NULL", null],
  ["metricas_funerario", "periodo", "VARCHAR(100) NULL", null],
  ["metricas_funerario", "video_url", "TEXT NULL", "periodo"],
  ["metricas_funerario", "folleto_url", "TEXT NULL", "video_url"],
  ["metricas_funerario", "formulario_url", "TEXT NULL", "folleto_url"],
  ["metricas_funerario", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", null],

  // archivos
  ["archivos", "modulo", "VARCHAR(100) NULL", null],
  ["archivos", "tipo", "VARCHAR(50) NULL", null],
  ["archivos", "url", "TEXT NULL", null],
  ["archivos", "nombre", "VARCHAR(255) NULL", null],
  ["archivos", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", null],
];

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  for (const [table, column, definition, after] of COLUMNS) {
    const added = await addColumnIfMissing(sequelize, table, column, definition, after);
    if (added) console.log(`  + ${table}.${column}`);
  }
}

// Reconciliación no se revierte: las columnas pueden ya haber
// existido antes de esta migración. No-op intencional.
export async function down() {}
