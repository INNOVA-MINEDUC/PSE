-- ============================================================
-- PSE DB — Migración incremental (BD ya existente)
-- Usar cuando la BD fue creada con migration.sql original.
-- Seguro de re-ejecutar: IF NOT EXISTS / IF NOT EXISTS evitan
-- errores si las columnas o tablas ya existen.
-- Requiere MySQL 8.0.3+ o MariaDB 10.3+ para ADD COLUMN IF NOT EXISTS.
-- Si el servidor es más antiguo, usar migrate.js en su lugar.
-- ============================================================

USE pse_db;

-- TABLA users (no estaba en migration.sql original)
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(255),
  role          VARCHAR(50)  NOT NULL DEFAULT 'ADMIN',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- noticias: columnas añadidas tras el schema inicial
ALTER TABLE noticias ADD COLUMN IF NOT EXISTS miniatura_url TEXT NULL        AFTER imagen_url;
ALTER TABLE noticias ADD COLUMN IF NOT EXISTS hero_url      TEXT NULL        AFTER miniatura_url;
ALTER TABLE noticias ADD COLUMN IF NOT EXISTS autor         VARCHAR(255) NULL AFTER hero_url;

-- metricas_llamadas: columnas añadidas tras el schema inicial
ALTER TABLE metricas_llamadas ADD COLUMN IF NOT EXISTS casos_atendidos       INT DEFAULT 0 AFTER total_llamadas;
ALTER TABLE metricas_llamadas ADD COLUMN IF NOT EXISTS usuarios_beneficiados INT DEFAULT 0 AFTER casos_atendidos;
ALTER TABLE metricas_llamadas ADD COLUMN IF NOT EXISTS video_url             TEXT NULL     AFTER periodo;

-- metricas_funerario: columnas añadidas tras el schema inicial
ALTER TABLE metricas_funerario ADD COLUMN IF NOT EXISTS apoyos_otorgados INT DEFAULT 0          AFTER familias_beneficiadas;
ALTER TABLE metricas_funerario ADD COLUMN IF NOT EXISTS cobertura        VARCHAR(255) DEFAULT '' AFTER apoyos_otorgados;
ALTER TABLE metricas_funerario ADD COLUMN IF NOT EXISTS video_url        TEXT NULL              AFTER periodo;
ALTER TABLE metricas_funerario ADD COLUMN IF NOT EXISTS folleto_url      TEXT NULL              AFTER video_url;
ALTER TABLE metricas_funerario ADD COLUMN IF NOT EXISTS formulario_url   TEXT NULL              AFTER folleto_url;
