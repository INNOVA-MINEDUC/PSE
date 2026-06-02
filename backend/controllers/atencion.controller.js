export const getAtencion = async (req, res) => {
  res.json({ success: true, message: "Ruta Atención a enfermedades activa", data: [] });
};

export const getMetricasAtencion = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, consultas_atendidas, estudiantes_atendidos,
              porcentaje_hombres, porcentaje_mujeres, periodo
       FROM metricas_atencion ORDER BY id DESC LIMIT 1`
    );
    if (!row) return res.status(404).json({ success: false, error: "Sin datos registrados" });
    res.json({ success: true, data: row });
  } catch (err) {
    console.error("ERROR getMetricasAtencion:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMetricasAtencion = async (req, res) => {
  try {
    const {
      consultas_atendidas = 0,
      estudiantes_atendidos = 0,
      porcentaje_hombres = 0,
      porcentaje_mujeres = 0,
      periodo = "",
    } = req.body;

    await req.db.query(
      `UPDATE metricas_atencion
       SET consultas_atendidas = ?,
           estudiantes_atendidos = ?,
           porcentaje_hombres = ?,
           porcentaje_mujeres = ?,
           periodo = ?
       ORDER BY id DESC LIMIT 1`,
      [consultas_atendidas, estudiantes_atendidos, porcentaje_hombres, porcentaje_mujeres, periodo]
    );

    res.json({ success: true, message: "Métricas de atención actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasAtencion:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
