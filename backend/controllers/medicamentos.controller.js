export const getMedicamentos = async (req, res) => {
  res.json({ success: true, message: "Ruta Suministro de medicamentos activa", data: [] });
};

export const getMetricasMedicamentos = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, unidades_entregadas, establecimientos_con_suministro,
              cobertura_nacional, periodo
       FROM metricas_medicamentos ORDER BY id DESC LIMIT 1`
    );
    if (!row) return res.status(404).json({ success: false, error: "Sin datos registrados" });
    res.json({ success: true, data: row });
  } catch (err) {
    console.error("ERROR getMetricasMedicamentos:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMetricasMedicamentos = async (req, res) => {
  try {
    const {
      unidades_entregadas = 0,
      establecimientos_con_suministro = 0,
      cobertura_nacional = 0,
      periodo = "",
    } = req.body;

    await req.db.query(
      `UPDATE metricas_medicamentos
       SET unidades_entregadas = ?,
           establecimientos_con_suministro = ?,
           cobertura_nacional = ?,
           periodo = ?
       ORDER BY id DESC LIMIT 1`,
      [unidades_entregadas, establecimientos_con_suministro, cobertura_nacional, periodo]
    );

    res.json({ success: true, message: "Métricas de medicamentos actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasMedicamentos:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
