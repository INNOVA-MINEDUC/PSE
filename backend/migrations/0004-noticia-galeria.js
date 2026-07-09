// ============================================================
// 0004 — Tabla noticia_galeria
//
// Almacena las imágenes adicionales de cada noticia.
// ON DELETE CASCADE limpia las filas si se borra la noticia.
// ============================================================

/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS noticia_galeria (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      noticia_id INT NOT NULL,
      imagen_url TEXT NOT NULL,
      orden      INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (noticia_id) REFERENCES noticias(id) ON DELETE CASCADE
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  await sequelize.query(`DROP TABLE IF EXISTS noticia_galeria`);
}
