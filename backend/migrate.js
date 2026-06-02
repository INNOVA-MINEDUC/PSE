import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const migrations = [
  // metricas_llamadas
  `ALTER TABLE metricas_llamadas ADD COLUMN casos_atendidos INT DEFAULT 0 AFTER total_llamadas`,
  `ALTER TABLE metricas_llamadas ADD COLUMN usuarios_beneficiados INT DEFAULT 0 AFTER casos_atendidos`,
  `ALTER TABLE metricas_llamadas ADD COLUMN video_url TEXT NULL AFTER periodo`,

  // metricas_funerario
  `ALTER TABLE metricas_funerario ADD COLUMN apoyos_otorgados INT DEFAULT 0 AFTER familias_beneficiadas`,
  `ALTER TABLE metricas_funerario ADD COLUMN cobertura VARCHAR(255) DEFAULT '' AFTER apoyos_otorgados`,
  `ALTER TABLE metricas_funerario ADD COLUMN video_url TEXT NULL AFTER periodo`,
  `ALTER TABLE metricas_funerario ADD COLUMN folleto_url TEXT NULL AFTER video_url`,
  `ALTER TABLE metricas_funerario ADD COLUMN formulario_url TEXT NULL AFTER folleto_url`,

  // noticias (campos existentes por si acaso)
  `ALTER TABLE noticias ADD COLUMN miniatura_url TEXT NULL AFTER imagen_url`,
  `ALTER TABLE noticias ADD COLUMN hero_url TEXT NULL AFTER miniatura_url`,
  `ALTER TABLE noticias ADD COLUMN autor VARCHAR(255) NULL AFTER hero_url`,
];

async function run() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Conectado a la BD. Ejecutando migraciones...\n");

  for (const sql of migrations) {
    try {
      await db.query(sql);
      const col = sql.match(/ADD COLUMN (\w+)/)?.[1] ?? sql;
      console.log(`  ✓ ${col}`);
    } catch (err) {
      if (err.code === "ER_DUP_FIELDNAME") {
        const col = sql.match(/ADD COLUMN (\w+)/)?.[1] ?? "columna";
        console.log(`  — ${col} (ya existe, omitida)`);
      } else {
        console.error(`  ✗ ERROR: ${err.message}`);
      }
    }
  }

  await db.end();
  console.log("\nMigraciones completadas.");
}

run().catch((err) => {
  console.error("Error de conexión:", err.message);
  process.exit(1);
});
