import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, "migrations");

// Errores ignorables para sentencias que no usan IF NOT EXISTS
const IGNORABLE = new Set([
  1007, // ER_DB_CREATE_EXISTS       — CREATE DATABASE IF NOT EXISTS
  1050, // ER_TABLE_EXISTS_ERROR     — CREATE TABLE IF NOT EXISTS
  1051, // ER_BAD_TABLE_ERROR        — DROP TABLE IF EXISTS
  1060, // ER_DUP_FIELDNAME          — ADD COLUMN duplicado
  1091, // ER_CANT_DROP_FIELD_OR_KEY — DROP COLUMN/KEY inexistente
]);

// Detecta: ALTER TABLE <tbl> ADD COLUMN IF NOT EXISTS <col> <resto>
const RE_ADD_COL = /^ALTER\s+TABLE\s+`?(\w+)`?\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+`?(\w+)`?\s+([\s\S]+)$/i;

function parseStatements(sql) {
  return sql
    .replace(/\/\*[\s\S]*?\*\//g, "")  // comentarios bloque
    .replace(/--[^\n]*/g, "")           // comentarios de línea
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^use\s+\S+$/i.test(s));
}

async function columnExists(db, dbName, table, column) {
  const [rows] = await db.query(
    `SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [dbName, table, column]
  );
  return rows.length > 0;
}

async function execStatement(db, dbName, stmt) {
  const match = stmt.match(RE_ADD_COL);

  if (match) {
    const [, table, column, colDef] = match;
    if (await columnExists(db, dbName, table, column)) {
      return "skipped";
    }
    // Ejecuta sin IF NOT EXISTS (MySQL 8 no lo soporta en ALTER TABLE)
    await db.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${colDef}`);
    return "ok";
  }

  // Sentencia normal
  try {
    await db.query(stmt);
    return "ok";
  } catch (err) {
    if (IGNORABLE.has(err.errno)) return "skipped";
    throw err;
  }
}

async function run() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log(`Conectado a ${process.env.DB_NAME}@${process.env.DB_HOST}\n`);

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No se encontraron archivos .sql en backend/migrations/");
    await db.end();
    return;
  }

  for (const file of files) {
    console.log(`▶  ${file}`);

    const content = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
    const statements = parseStatements(content);

    let ok = 0;
    let skipped = 0;

    for (const stmt of statements) {
      try {
        const result = await execStatement(db, process.env.DB_NAME, stmt);
        if (result === "ok") ok++;
        else skipped++;
      } catch (err) {
        console.error(`   ✗ ${err.message}`);
        console.error(`     ${stmt.slice(0, 120)}`);
      }
    }

    console.log(`   ✓ ${ok} ejecutados  —  ${skipped} ya existían\n`);
  }

  await db.end();
  console.log("Migraciones completadas.");
}

run().catch((err) => {
  console.error("Error de conexión:", err.message);
  process.exit(1);
});
