export const getFunerario = async (req, res) => {
  res.json({ success: true, message: "Ruta Apoyo funerario activa", data: [] });
};

export const getMetricasFunerario = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, familias_beneficiadas, monto_total, monto_por_estudiante,
              casos_masculinos, casos_femeninos, periodo
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
      monto_total = 0,
      monto_por_estudiante = 0,
      casos_masculinos = 0,
      casos_femeninos = 0,
      periodo = "",
    } = req.body;

    await req.db.query(
      `UPDATE metricas_funerario
       SET familias_beneficiadas = ?,
           monto_total = ?,
           monto_por_estudiante = ?,
           casos_masculinos = ?,
           casos_femeninos = ?,
           periodo = ?
       ORDER BY id DESC LIMIT 1`,
      [familias_beneficiadas, monto_total, monto_por_estudiante, casos_masculinos, casos_femeninos, periodo]
    );

    res.json({ success: true, message: "Métricas de apoyo funerario actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasFunerario:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
