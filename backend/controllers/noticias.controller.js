import { logAudit } from "../utils/logAudit.js";
import { deleteFile, isBucketKey } from "../utils/storageService.js";

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
      `SELECT * FROM noticias WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!noticia) {
      return res.status(404).json({ success: false, error: "Noticia no encontrada" });
    }

    let galeria = [];
    try {
      const [rows] = await req.db.query(
        `SELECT id, imagen_url, orden FROM noticia_galeria WHERE noticia_id = ? ORDER BY orden ASC, id ASC`,
        [id]
      );
      galeria = rows;
    } catch (_) {
      // tabla aún no existe (migración pendiente) → galería vacía
    }

    res.json({ success: true, data: { ...noticia, galeria } });
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
      miniatura_url = "",
      hero_url = "",
      autor = "",
      fecha_publicacion = null,
      modulo = "general",
      activo = 1,
      orden = 0,
    } = req.body;

    if (!titulo) {
      return res.status(400).json({ success: false, error: "El título es requerido" });
    }

    const [result] = await req.db.query(
      `INSERT INTO noticias
       (titulo, descripcion_corta, contenido, imagen_url, miniatura_url, hero_url, autor, fecha_publicacion, modulo, activo, orden)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descripcion_corta,
        contenido,
        imagen_url,
        miniatura_url,
        hero_url,
        autor,
        fecha_publicacion,
        modulo,
        activo ? 1 : 0,
        Number(orden) || 0,
      ]
    );

    await logAudit(req, {
      accion:      "NOTICIA_CREADA",
      modulo:      "noticias",
      entidad_id:  result.insertId,
      descripcion: `Noticia creada: "${titulo}" (módulo: ${modulo})`,
      valores_nuevo: { titulo, modulo, activo: activo ? 1 : 0, orden: Number(orden) || 0, autor },
    });

    res.json({ success: true, id: result.insertId, message: "Noticia creada correctamente" });
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
      miniatura_url = "",
      hero_url = "",
      autor = "",
      fecha_publicacion = null,
      modulo = "general",
      activo = 1,
      orden = 0,
    } = req.body;

    if (!titulo) {
      return res.status(400).json({ success: false, error: "El título es requerido" });
    }

    const [[anterior]] = await req.db.query(
      `SELECT titulo, modulo, activo, orden, autor, fecha_publicacion FROM noticias WHERE id = ? LIMIT 1`,
      [id]
    );

    await req.db.query(
      `UPDATE noticias
       SET titulo = ?,
           descripcion_corta = ?,
           contenido = ?,
           imagen_url = ?,
           miniatura_url = ?,
           hero_url = ?,
           autor = ?,
           fecha_publicacion = ?,
           modulo = ?,
           activo = ?,
           orden = ?
       WHERE id = ?`,
      [
        titulo,
        descripcion_corta,
        contenido,
        imagen_url,
        miniatura_url,
        hero_url,
        autor,
        fecha_publicacion,
        modulo,
        activo ? 1 : 0,
        Number(orden) || 0,
        id,
      ]
    );

    await logAudit(req, {
      accion:      "NOTICIA_ACTUALIZADA",
      modulo:      "noticias",
      entidad_id:  Number(id),
      descripcion: `Noticia ${id} actualizada: "${titulo}"`,
      valores_ant:  anterior ?? null,
      valores_nuevo: { titulo, modulo, activo: activo ? 1 : 0, orden: Number(orden) || 0, autor, fecha_publicacion },
    });

    res.json({ success: true, message: "Noticia actualizada correctamente" });
  } catch (error) {
    console.error("ERROR updateNoticia:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;

    const [[previa]] = await req.db.query(
      `SELECT titulo, modulo, activo, imagen_url, miniatura_url, hero_url FROM noticias WHERE id = ? LIMIT 1`,
      [id]
    );

    const [galeria] = await req.db.query(
      "SELECT imagen_url FROM noticia_galeria WHERE noticia_id = ?",
      [id]
    );

    await req.db.query("DELETE FROM noticias WHERE id = ?", [id]);

    const keysAEliminar = [
      previa?.imagen_url,
      previa?.miniatura_url,
      previa?.hero_url,
      ...galeria.map((g) => g.imagen_url),
    ].filter(isBucketKey);

    for (const key of keysAEliminar) {
      try {
        await deleteFile(key);
      } catch (err) {
        console.error("ERROR eliminando archivo en storage:", err.message);
      }
    }

    await logAudit(req, {
      accion:      "NOTICIA_ELIMINADA",
      modulo:      "noticias",
      entidad_id:  Number(id),
      descripcion: previa
        ? `Noticia eliminada: "${previa.titulo}" (módulo: ${previa.modulo})`
        : `Noticia ${id} eliminada`,
      valores_ant: previa ?? null,
    });

    res.json({ success: true, message: "Noticia eliminada correctamente" });
  } catch (error) {
    console.error("ERROR deleteNoticia:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ── GALERÍA ───────────────────────────────────────────────────────────

export const addGaleriaImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file || !req.storageFile) {
      return res.status(400).json({ success: false, error: "No se subió ninguna imagen" });
    }

    const [[noticia]] = await req.db.query(
      "SELECT id FROM noticias WHERE id = ? LIMIT 1",
      [id]
    );
    if (!noticia) {
      return res.status(404).json({ success: false, error: "Noticia no encontrada" });
    }

    const [[{ maxOrden }]] = await req.db.query(
      "SELECT COALESCE(MAX(orden), -1) AS maxOrden FROM noticia_galeria WHERE noticia_id = ?",
      [id]
    );

    const url = req.storageFile.key;

    const [result] = await req.db.query(
      "INSERT INTO noticia_galeria (noticia_id, imagen_url, orden) VALUES (?, ?, ?)",
      [id, url, maxOrden + 1]
    );

    await logAudit(req, {
      accion:      "IMAGEN_NOTICIA_SUBIDA",
      modulo:      "noticias",
      entidad_id:  Number(id),
      descripcion: `Imagen agregada a galería de noticia ${id}: ${url}`,
    });

    res.json({ success: true, id: result.insertId, url });
  } catch (error) {
    console.error("ERROR addGaleriaImage:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addGaleriaImagesBatch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.storageResults) {
      return res.status(400).json({ success: false, error: "No se subió ninguna imagen" });
    }

    const [[noticia]] = await req.db.query(
      "SELECT id FROM noticias WHERE id = ? LIMIT 1",
      [id]
    );
    if (!noticia) {
      return res.status(404).json({ success: false, error: "Noticia no encontrada" });
    }

    const { uploaded, failed } = req.storageResults;

    const [[{ maxOrden }]] = await req.db.query(
      "SELECT COALESCE(MAX(orden), -1) AS maxOrden FROM noticia_galeria WHERE noticia_id = ?",
      [id]
    );

    const insertados = [];
    let orden = maxOrden + 1;
    for (const archivo of uploaded) {
      const [result] = await req.db.query(
        "INSERT INTO noticia_galeria (noticia_id, imagen_url, orden) VALUES (?, ?, ?)",
        [id, archivo.key, orden]
      );
      insertados.push({ id: result.insertId, url: archivo.key });
      orden += 1;
    }

    await logAudit(req, {
      accion:      "IMAGEN_NOTICIA_SUBIDA",
      modulo:      "noticias",
      entidad_id:  Number(id),
      descripcion: `${insertados.length} imagen(es) agregadas a galería de noticia ${id}`,
    });

    res.json({ success: true, uploaded: insertados, failed: failed || [] });
  } catch (error) {
    console.error("ERROR addGaleriaImagesBatch:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteGaleriaImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;

    const [[imagen]] = await req.db.query(
      "SELECT imagen_url FROM noticia_galeria WHERE id = ? LIMIT 1",
      [imgId]
    );

    await req.db.query("DELETE FROM noticia_galeria WHERE id = ?", [imgId]);

    if (imagen && isBucketKey(imagen.imagen_url)) {
      try {
        await deleteFile(imagen.imagen_url);
      } catch (err) {
        console.error("ERROR eliminando imagen en storage:", err.message);
      }
    }

    await logAudit(req, {
      accion:      "IMAGEN_NOTICIA_ELIMINADA",
      modulo:      "noticias",
      entidad_id:  Number(imgId),
      descripcion: `Imagen ${imgId} eliminada de galería de noticia ${id}`,
    });

    res.json({ success: true, message: "Imagen eliminada de la galería" });
  } catch (error) {
    console.error("ERROR deleteGaleriaImage:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
