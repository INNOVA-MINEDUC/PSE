// ============================================================
// 0001 — Baseline: schema completo
//
// Idempotente (CREATE TABLE IF NOT EXISTS): seguro en BD nueva
// o ya existente. Sin USE / CREATE DATABASE: corre contra la BD
// indicada por DB_NAME (la conexión ya está apuntada ahí).
// ============================================================

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      email         VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      full_name     VARCHAR(255),
      role          VARCHAR(50)  NOT NULL DEFAULT 'ADMIN',
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS noticias (
      id                INT AUTO_INCREMENT PRIMARY KEY,
      titulo            VARCHAR(255),
      descripcion_corta TEXT,
      contenido         LONGTEXT NULL,
      imagen_url        TEXT,
      miniatura_url     TEXT NULL,
      hero_url          TEXT NULL,
      autor             VARCHAR(255) NULL,
      fecha_publicacion DATE,
      modulo            VARCHAR(100),
      activo            TINYINT DEFAULT 1,
      orden             INT DEFAULT 0,
      created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS metricas_atencion (
      id                    INT AUTO_INCREMENT PRIMARY KEY,
      consultas_atendidas   INT,
      estudiantes_atendidos INT,
      porcentaje_hombres    INT,
      porcentaje_mujeres    INT,
      periodo               VARCHAR(100),
      created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS atencion_departamento (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      departamento     VARCHAR(100),
      consultas        INT,
      estudiantes      INT,
      establecimientos INT,
      periodo          VARCHAR(100)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS metricas_medicamentos (
      id                              INT AUTO_INCREMENT PRIMARY KEY,
      unidades_entregadas             INT,
      establecimientos_con_suministro INT,
      cobertura_nacional              INT,
      periodo                         VARCHAR(100),
      created_at                      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS medicamentos_departamento (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      departamento     VARCHAR(100),
      unidades         INT,
      establecimientos INT,
      periodo          VARCHAR(100)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS metricas_llamadas (
      id                    INT AUTO_INCREMENT PRIMARY KEY,
      total_llamadas        INT,
      casos_atendidos       INT DEFAULT 0,
      usuarios_beneficiados INT DEFAULT 0,
      periodo               VARCHAR(100),
      video_url             TEXT NULL,
      created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS metricas_funerario (
      id                    INT AUTO_INCREMENT PRIMARY KEY,
      familias_beneficiadas INT,
      apoyos_otorgados      INT DEFAULT 0,
      cobertura             VARCHAR(255) DEFAULT '',
      monto_total           DECIMAL(12,2),
      monto_por_estudiante  DECIMAL(12,2),
      casos_masculinos      INT,
      casos_femeninos       INT,
      periodo               VARCHAR(100),
      video_url             TEXT NULL,
      folleto_url           TEXT NULL,
      formulario_url        TEXT NULL,
      created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS archivos (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      modulo     VARCHAR(100),
      tipo       VARCHAR(50),
      url        TEXT,
      nombre     VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);
}

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  const tables = [
    "archivos",
    "metricas_funerario",
    "metricas_llamadas",
    "medicamentos_departamento",
    "metricas_medicamentos",
    "atencion_departamento",
    "metricas_atencion",
    "noticias",
    "users",
  ];
  for (const t of tables) {
    await sequelize.query(`DROP TABLE IF EXISTS \`${t}\`;`);
  }
}
