export const getKpis = async (req, res) => {
  try {
    const db = req.db;

    const [[atencion]] = await db.query(`
      SELECT consultas_atendidas, estudiantes_atendidos
      FROM metricas_atencion
      ORDER BY id DESC LIMIT 1
    `);

   
    const [[medicamentos]] = await db.query(`
      SELECT unidades_entregadas
      FROM metricas_medicamentos
      ORDER BY id DESC LIMIT 1
    `);

   
    const [[llamadas]] = await db.query(`
      SELECT total_llamadas
      FROM metricas_llamadas
      ORDER BY id DESC LIMIT 1
    `);

  
    const [[funerario]] = await db.query(`
      SELECT familias_beneficiadas
      FROM metricas_funerario
      ORDER BY id DESC LIMIT 1
    `);

   
    const [[noticias]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM noticias
      WHERE activo = 1
    `);

    res.json({
      success: true,
      data: {
        noticias_activas: noticias?.total || 0,
        atenciones: atencion?.consultas_atendidas || 0,
        estudiantes: atencion?.estudiantes_atendidos || 0,
        medicamentos: medicamentos?.unidades_entregadas || 0,
        llamadas: llamadas?.total_llamadas || 0,
        funerario: funerario?.familias_beneficiadas || 0
      }
    });

  } catch (error) {
    console.error("Error KPIs:", error);
    res.status(500).json({
      success: false,
      error: "Error obteniendo KPIs"
    });
  }
};