// ============================================================
// Runner de migraciones (Umzug + Sequelize)
//
// Tracking en tabla `SequelizeMeta`: cada migración corre UNA vez.
// Fail-fast: si una migración lanza error, el proceso sale con
// código 1 (aborta el deploy).
//
// Uso (CLI):
//   node migrate.js up          # aplica pendientes
//   node migrate.js down        # revierte la última
//   node migrate.js pending     # lista pendientes
//   node migrate.js executed    # lista aplicadas
//   node migrate.js create --name add-tabla.js
// ============================================================
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
  }
);

export const umzug = new Umzug({
  migrations: {
    glob: ["migrations/[0-9]*.js", { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "SequelizeMeta" }),
  logger: console,
});

// Ejecutar como CLI solo cuando se invoca directo (no al importar)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  umzug
    .runAsCLI()
    .then(() => sequelize.close())
    .catch((err) => {
      console.error("Migración falló:", err.message);
      process.exit(1);
    });
}
