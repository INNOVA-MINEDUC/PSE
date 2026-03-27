// backend/scripts/seedAdmin.js
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

dotenv.config();

async function main() {
  const email = "admin@mineduc.edu.gt";
  const plainPassword = "admin123";
  const full_name = "Admin PSE";
  const role = "ADMIN";

  const password_hash = await bcrypt.hash(plainPassword, 10);

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      console.log("✅ Admin ya existe. No se insertó duplicado.");
      return;
    }

    await db.query(
      "INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
      [email, password_hash, full_name, role]
    );

    console.log("✅ Admin creado en BD:");
    console.log("   Email:", email);
    console.log("   Password:", plainPassword);
  } finally {
    await db.end();
  }
}

main().catch((err) => {
  console.error("❌ Error creando admin:", err);
  process.exit(1);
});