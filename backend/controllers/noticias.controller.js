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

export const getNoticiaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[noticia]] = await req.db.query(
      `
      SELECT *
      FROM noticias
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    if (!noticia) {
      return res.status(404).json({
        success: false,
        error: "Noticia no encontrada",
      });
    }

    res.json({ success: true, data: noticia });
  } catch (error) {
    console.error("ERROR getNoticiaById:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const {
      titulo,
      descripcion_corta = "",
      contenido = "",
      imagen_url = "",
      fecha_publicacion = null,
      modulo = "general",
      activo = 1,
      orden = 0,
    } = req.body;

    if (!titulo) {
      return res.status(400).json({
        success: false,
        error: "El título es requerido",
      });
    }

    await req.db.query(
      `
      INSERT INTO noticias
      (titulo, descripcion_corta, contenido, imagen_url, fecha_publicacion, modulo, activo, orden)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        titulo,
        descripcion_corta,
        contenido,
        imagen_url,
        fecha_publicacion,
        modulo,
        activo ? 1 : 0,
        Number(orden) || 0,
      ]
    );

    res.json({ success: true, message: "Noticia creada correctamente" });
  } catch (error) {
    console.error("ERROR createNoticia:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      titulo,
      descripcion_corta = "",
      contenido = "",
      imagen_url = "",
      fecha_publicacion = null,
      modulo = "general",
      activo = 1,
      orden = 0,
    } = req.body;

    if (!titulo) {
      return res.status(400).json({
        success: false,
        error: "El título es requerido",
      });
    }

    await req.db.query(
      `
      UPDATE noticias
      SET titulo = ?,
          descripcion_corta = ?,
          contenido = ?,
          imagen_url = ?,
          fecha_publicacion = ?,
          modulo = ?,
          activo = ?,
          orden = ?
      WHERE id = ?
      `,
      [
        titulo,
        descripcion_corta,
        contenido,
        imagen_url,
        fecha_publicacion,
        modulo,
        activo ? 1 : 0,
        Number(orden) || 0,
        id,
      ]
    );

    res.json({ success: true, message: "Noticia actualizada correctamente" });
  } catch (error) {
    console.error("ERROR updateNoticia:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;

    await req.db.query("DELETE FROM noticias WHERE id = ?", [id]);

    res.json({ success: true, message: "Noticia eliminada correctamente" });
  } catch (error) {
    console.error("ERROR deleteNoticia:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};