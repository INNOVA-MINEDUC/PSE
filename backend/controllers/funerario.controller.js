export const getFunerario = async (req, res) => {
  res.json({ success: true, message: "Ruta Apoyo funerario activa", data: [] });
};

export const getMetricasFunerario = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, familias_beneficiadas, apoyos_otorgados, cobertura,
              monto_total, monto_por_estudiante,
              casos_masculinos, casos_femeninos, periodo,
              video_url, folleto_url, formulario_url
       FROM metricas_funerario ORDER BY id DESC LIMIT 1`
    );
    if (!row) return res.status(404).json({ success: false, error: "Sin datos registrados" });
    res.json({ success: true, data: row });
  } catch (err) {
    console.error("ERROR getMetricasFunerario:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMetricasFunerario = async (req, res) => {
  try {
    const {
      familias_beneficiadas = 0,
      apoyos_otorgados = 0,
      cobertura = "",
      monto_total = 0,
      monto_por_estudiante = 0,
      casos_masculinos = 0,
      casos_femeninos = 0,
      periodo = "",
      video_url = "",
      folleto_url = "",
      formulario_url = "",
    } = req.body;

    await req.db.query(
      `UPDATE metricas_funerario
       SET familias_beneficiadas = ?,
           apoyos_otorgados = ?,
           cobertura = ?,
           monto_total = ?,
           monto_por_estudiante = ?,
           casos_masculinos = ?,
           casos_femeninos = ?,
           periodo = ?,
           video_url = ?,
           folleto_url = ?,
           formulario_url = ?
       ORDER BY id DESC LIMIT 1`,
      [familias_beneficiadas, apoyos_otorgados, cobertura, monto_total, monto_por_estudiante,
       casos_masculinos, casos_femeninos, periodo, video_url, folleto_url, formulario_url]
    );

    res.json({ success: true, message: "Métricas de apoyo funerario actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasFunerario:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
