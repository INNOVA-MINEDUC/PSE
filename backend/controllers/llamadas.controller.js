export const getLlamadas = async (req, res) => {
  res.json({ success: true, message: "Ruta Centro de llamadas 1528 activa", data: [] });
};

export const getMetricasLlamadas = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, total_llamadas, periodo
       FROM metricas_llamadas ORDER BY id DESC LIMIT 1`
    );
    if (!row) return res.status(404).json({ success: false, error: "Sin datos registrados" });
    res.json({ success: true, data: row });
  } catch (err) {
    console.error("ERROR getMetricasLlamadas:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMetricasLlamadas = async (req, res) => {
  try {
    const { total_llamadas = 0, periodo = "" } = req.body;

    await req.db.query(
      `UPDATE metricas_llamadas
       SET total_llamadas = ?,
           periodo = ?
       ORDER BY id DESC LIMIT 1`,
      [total_llamadas, periodo]
    );

    res.json({ success: true, message: "Métricas de llamadas actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasLlamadas:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
