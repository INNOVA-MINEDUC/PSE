export const getNoticias = async (req, res) => {
  try {
    const [rows] = await req.db.query(`
      SELECT *
      FROM noticias
      ORDER BY orden ASC, fecha_publicacion DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const {
      titulo,
      descripcion_corta,
      imagen_url,
      fecha_publicacion,
      modulo,
      activo = 1,
      orden = 0,
    } = req.body;

    await req.db.query(
      `
      INSERT INTO noticias
      (titulo, descripcion_corta, imagen_url, fecha_publicacion, modulo, activo, orden)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [titulo, descripcion_corta, imagen_url, fecha_publicacion, modulo, activo, orden]
    );

    res.json({ success: true, message: "Noticia creada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcion_corta,
      imagen_url,
      fecha_publicacion,
      modulo,
      activo,
      orden,
    } = req.body;

    await req.db.query(
      `
      UPDATE noticias
      SET titulo = ?, descripcion_corta = ?, imagen_url = ?, fecha_publicacion = ?,
          modulo = ?, activo = ?, orden = ?
      WHERE id = ?
      `,
      [titulo, descripcion_corta, imagen_url, fecha_publicacion, modulo, activo, orden, id]
    );

    res.json({ success: true, message: "Noticia actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;

    await req.db.query("DELETE FROM noticias WHERE id = ?", [id]);

    res.json({ success: true, message: "Noticia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};