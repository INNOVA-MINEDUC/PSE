USE pse_db;

-- TABLA NOTICIAS--
CREATE TABLE IF NOT EXISTS noticias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  descripcion_corta TEXT,
  imagen_url TEXT,
  fecha_publicacion DATE,
  modulo VARCHAR(100),
  activo TINYINT DEFAULT 1,
  orden INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- METRICAS ATENCION----
CREATE TABLE IF NOT EXISTS metricas_atencion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consultas_atendidas INT,
  estudiantes_atendidos INT,
  porcentaje_hombres INT,
  porcentaje_mujeres INT,
  periodo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  

-- ATENCION POR DEPARTAMENTO--
CREATE TABLE IF NOT EXISTS atencion_departamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  departamento VARCHAR(100),
  consultas INT,
  estudiantes INT,
  establecimientos INT,
  periodo VARCHAR(100)
);


-- METRICAS MEDICAMENTOS--
CREATE TABLE IF NOT EXISTS metricas_medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unidades_entregadas INT,
  establecimientos_con_suministro INT,
  cobertura_nacional INT,
  periodo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MEDICAMENTOS POR DEPARTAMENTO--
CREATE TABLE IF NOT EXISTS medicamentos_departamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  departamento VARCHAR(100),
  unidades INT,
  establecimientos INT,
  periodo VARCHAR(100)
);

-- METRICAS LLAMADAS--
CREATE TABLE IF NOT EXISTS metricas_llamadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_llamadas INT,
  periodo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- METRICAS FUNERARIO--
CREATE TABLE IF NOT EXISTS metricas_funerario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  familias_beneficiadas INT,
  monto_total DECIMAL(12,2),
  monto_por_estudiante DECIMAL(12,2),
  casos_masculinos INT,
  casos_femeninos INT,
  periodo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ARCHIVOS (PDF, VIDEO, IMAGEN)--
CREATE TABLE IF NOT EXISTS archivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modulo VARCHAR(100),
  tipo VARCHAR(50),
  url TEXT,
  nombre VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DATOS DE PRUEBA--

-- ATENCION---
INSERT INTO metricas_atencion
(consultas_atendidas, estudiantes_atendidos, porcentaje_hombres, porcentaje_mujeres, periodo)
VALUES
(674656, 222704, 52, 48, 'enero - julio 2025');

-- MEDICAMENTOS-
INSERT INTO metricas_medicamentos
(unidades_entregadas, establecimientos_con_suministro, cobertura_nacional, periodo)
VALUES
(80000, 1350, 340, 'enero - julio 2025');

-- LLAMADAS --
INSERT INTO metricas_llamadas
(total_llamadas, periodo)
VALUES
(2421, '2025');

-- FUNERARIO --
INSERT INTO metricas_funerario
(familias_beneficiadas, monto_total, monto_por_estudiante, casos_masculinos, casos_femeninos, periodo)
VALUES
(329, 2467000, 7500, 193, 136, '2025');

-- NOTICIA --
INSERT INTO noticias
(titulo, descripcion_corta, imagen_url, fecha_publicacion, modulo, activo, orden)
VALUES
('Jornada de salud escolar en zona rural',
 'Se realizaron actividades de prevención y atención médica.',
 '/uploads/noticias/demo.jpg',
 '2026-01-15',
 'promocion',
 1,
 1);