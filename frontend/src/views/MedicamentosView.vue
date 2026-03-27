<!-- src/views/MedicamentosView.vue --> 
<template>
  <main class="med-page">
    <!-- CABECERA OSCURA -->
    <section class="med-hero">
      <div class="hero-inner">
        <div>
          <p class="hero-kicker">MÓDULO 3</p>
          <h1 class="hero-title">Suministro de medicamentos</h1>
          <p class="hero-text">
            El PSE garantiza el acceso gratuito a medicamentos esenciales para el tratamiento de
            enfermedades en la población escolar, a través de los servicios del Ministerio de Salud
            Pública y Asistencia Social (MSPAS).
          </p>
        </div>

        <div class="hero-summary-card">
          <h2>En cifras (ejemplo)</h2>
          <ul>
            <li class="hero-metric">
              <div class="hero-metric-icon">💊</div>
              <div class="hero-metric-text">
                <span class="label">Unidades de medicamento entregadas</span>
                <span class="value">{{ resumen.unidades.toLocaleString('es-GT') }}</span>
              </div>
            </li>
            <li class="hero-metric">
              <div class="hero-metric-icon">🏥</div>
              <div class="hero-metric-text">
                <span class="label">Establecimientos que recibieron suministro</span>
                <span class="value">{{ resumen.establecimientos.toLocaleString('es-GT') }}</span>
              </div>
            </li>
            <li class="hero-metric">
              <div class="hero-metric-icon">📅</div>
              <div class="hero-metric-text">
                <span class="label">Periodo de referencia</span>
                <span class="value">{{ resumen.periodo }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CUERPO CLARO -->
    <section class="med-body">
      <div class="med-inner">
        <!-- KPIs -->
        <div class="row row-kpis">
          <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
            <div class="kpi-header">
              <div class="kpi-icon">{{ kpi.icon }}</div>
              <div class="kpi-text">
                <p class="kpi-label">{{ kpi.label }}</p>
                <p class="kpi-value">{{ kpi.value }}</p>
              </div>
            </div>
            <p class="kpi-note">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- ¿DÓNDE SE ENTREGAN LOS MEDICAMENTOS? -->
        <div class="row row-info">
          <div class="card card-info">
            <h2 class="block-title">¿Dónde se entregan los medicamentos?</h2>
            <p class="block-subtitle">
              Los medicamentos del PSE se distribuyen a través de la red pública de servicios de
              salud del MSPAS.
            </p>

            <p>
              Los estudiantes pueden recibir medicamentos de forma gratuita en los servicios de
              salud públicos, sin necesidad de presentar constancia de ser escolar. La red está
              presente en los 340 municipios del país, lo que permite una cobertura nacional y
              referencias entre servicios según la necesidad de cada caso.
            </p>

            <div class="services-grid">
              <div class="service-block">
                <h3>Hospitales</h3>
                <p>
                  Se suministran medicamentos para pacientes que requieren hospitalización, de
                  acuerdo con el diagnóstico médico y el plan de tratamiento.
                </p>
              </div>

              <div class="service-block">
                <h3>
                  Puestos de salud, Centros de Salud y Centros de Atención Permanente (CAP)
                </h3>
                <p>
                  Se entregan medicamentos para tratamiento ambulatorio, es decir, para
                  enfermedades que pueden ser tratadas en casa sin necesidad de ingreso
                  hospitalario.
                </p>
              </div>

              <div class="service-pill-bar">
                <span>Todos los medicamentos se entregan de forma gratuita</span>
                <span class="pill-tag">Red pública de atención MSPAS</span>
              </div>
            </div>
          </div>
        </div>

        <!-- MAPA + MEDICAMENTOS RECURRENTES -->
        <div class="row row-map">
          <div class="card card-map">
            <h2 class="block-title">Mapa de distribución de medicamentos</h2>
            <p class="block-subtitle">
              Distribución de los establecimientos que reciben medicamentos del Programa de Salud
              Escolar (ejemplo de prototipo).
            </p>

            <div class="map-wrapper">
              <GuateMap />
            </div>
          </div>

          <div class="card card-meds">
            <h2 class="block-title">Medicamentos recurrentes</h2>
            <p class="block-subtitle">
              Principales medicamentos utilizados para el tratamiento de enfermedades frecuentes en
              la población escolar.
            </p>

            <table class="simple-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Medicamento</th>
                  <th class="text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(med, idx) in medicamentosRecurrentes"
                  :key="med.nombre"
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ med.nombre }}</td>
                  <td class="text-right">
                    {{ med.cantidad.toLocaleString('es-GT') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TABLA: SUMINISTRO POR TIPO DE SERVICIO -->
        <div class="row row-bottom">
          <div class="card">
            <h2 class="block-title">Suministro por tipo de servicio</h2>
            <p class="block-subtitle">
              Ejemplo de cómo se puede resumir el suministro de medicamentos por nivel de atención.
              Más adelante estos datos pueden conectarse a la base de datos del sistema.
            </p>

            <table class="simple-table">
              <thead>
                <tr>
                  <th>Tipo de servicio</th>
                  <th class="text-right">Establecimientos</th>
                  <th class="text-right">Recetas atendidas</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="serv in suministroPorServicio"
                  :key="serv.tipo"
                >
                  <td>{{ serv.tipo }}</td>
                  <td class="text-right">
                    {{ serv.establecimientos.toLocaleString('es-GT') }}
                  </td>
                  <td class="text-right">
                    {{ serv.recetas.toLocaleString('es-GT') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import GuateMap from '@/components/GuateMap.vue'

const resumen = {
  unidades: 800000, // número de ejemplo
  establecimientos: 1350,
  periodo: 'enero – julio 2025'
}

const kpis = [
  {
    label: 'Unidades entregadas',
    value: resumen.unidades.toLocaleString('es-GT'),
    note: 'Total de unidades de medicamentos distribuidas en el periodo seleccionado.',
    icon: '💊'
  },
  {
    label: 'Establecimientos con suministro',
    value: resumen.establecimientos.toLocaleString('es-GT'),
    note: 'Incluye hospitales, centros y puestos de salud que reciben medicamentos del PSE.',
    icon: '🏥'
  },
  {
    label: 'Cobertura nacional',
    value: '340 municipios',
    note: 'La red de servicios de salud públicos está presente en todo el país.',
    icon: '🗺️'
  }
]

const medicamentosRecurrentes = [
  { nombre: 'Acetaminofen (paracetamol)', cantidad: 197562 },
  { nombre: 'Clorfeniramina Maleato', cantidad: 112040 },
  { nombre: 'Amoxicilina', cantidad: 72841 },
  { nombre: 'Sulfato de Zinc', cantidad: 72772 },
  { nombre: 'Ambroxol', cantidad: 62344 },
  { nombre: 'Acetaminofén', cantidad: 55470 },
  { nombre: 'Sales de Rehidratación Oral', cantidad: 49264 },
  { nombre: 'Metronidazol', cantidad: 32062 },
  { nombre: 'Albendazol', cantidad: 31174 },
  { nombre: 'Trimetroprima–Sulfametoxazol', cantidad: 22328 }
]

const suministroPorServicio = [
  { tipo: 'Hospitales', establecimientos: 95, recetas: 185000 },
  { tipo: 'Centros de Salud', establecimientos: 420, recetas: 310000 },
  { tipo: 'Puestos de Salud', establecimientos: 620, recetas: 220000 },
  { tipo: 'Centros de Atención Permanente (CAP)', establecimientos: 215, recetas: 85000 }
]
</script>

<style scoped>
.med-page {
  background: #020617;
  color: #f9fafb;
}

/* CABECERA */
.med-hero {
  background: #020617;
  padding: 28px 48px 32px;
}

.hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  align-items: flex-start;
  justify-content: space-between;
}

.hero-kicker {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a5b4fc;
  margin-bottom: 6px;
}

.hero-title {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-text {
  font-size: 0.9rem;
  color: #e5e7eb;
  max-width: 720px;
  line-height: 1.5;
}

/* Tarjeta de cifras */
.hero-summary-card {
  min-width: 320px;
  max-width: 380px;
  background: radial-gradient(circle at top left, #1d4ed8, #020617);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.65);
}

.hero-summary-card h2 {
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.hero-summary-card ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.hero-metric {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hero-metric-icon {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.hero-metric-text .label {
  font-size: 0.75rem;
  color: #c7d2fe;
  display: block;
}

.hero-metric-text .value {
  font-size: 1.1rem;
  font-weight: 700;
}

/* CUERPO CLARO (cambiado a blanco/gris como los otros módulos) */
.med-body {
  background: #f3f4f6;   /* antes: #0b1120 */
  padding: 0 0 48px;
}

.med-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 48px 0;
}

/* FILAS GENERALES */
.row {
  display: grid;
  gap: 18px;
  margin-bottom: 22px;
}

/* KPIs */
.row-kpis {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kpi-card {
  background: #f9fafb;
  color: #020617;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.35);
}

.kpi-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.kpi-icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #e0ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.kpi-label {
  font-size: 0.8rem;
  color: #6b7280;
}

.kpi-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 2px;
}

.kpi-note {
  font-size: 0.72rem;
  color: #9ca3af;
  margin-top: 6px;
}

/* INFO: DÓNDE SE ENTREGAN */
.row-info {
  grid-template-columns: minmax(0, 1fr);
}

.card {
  background: #f9fafb;
  color: #020617;
  border-radius: 18px;
  padding: 16px 18px 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.3);
}

.block-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.block-subtitle {
  font-size: 0.78rem;
  color: #4b5563;
  margin-bottom: 10px;
}

.card-info p {
  font-size: 0.82rem;
  color: #111827;
  margin-bottom: 8px;
}

.services-grid {
  display: grid;
  gap: 10px;
  margin-top: 4px;
}

.service-block h3 {
  font-size: 0.85rem;
  margin-bottom: 2px;
}

.service-block p {
  font-size: 0.8rem;
  color: #374151;
}

.service-pill-bar {
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 999px;
  background: #e0ecff;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  font-size: 0.78rem;
  font-weight: 500;
}

.pill-tag {
  background: #1d4ed8;
  color: #f9fafb;
  padding: 2px 8px;
  border-radius: 999px;
}

/* MAPA + MEDS */
.row-map {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr);
}

.map-wrapper {
  margin-top: 8px;
  background: white;
  border-radius: 14px;
  padding: 8px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.map-wrapper > * {
  width: 100%;
  height: 100%;
  max-width: 100%;
}

/* TABLAS */
.simple-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 0.78rem;
}

.simple-table thead {
  background: #e5e7eb;
}

.simple-table th,
.simple-table td {
  padding: 6px 8px;
}

.simple-table tbody tr:nth-child(odd) {
  background: #f9fafb;
}

.simple-table tbody tr:nth-child(even) {
  background: #eef2ff;
}

.simple-table th {
  font-weight: 600;
}

.text-right {
  text-align: right;
}

/* FILA FINAL */
.row-bottom {
  grid-template-columns: minmax(0, 1fr);
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .hero-inner {
    flex-direction: column;
  }

  .med-inner {
    padding-inline: 24px;
  }

  .row-kpis {
    grid-template-columns: minmax(0, 1fr);
  }

  .row-map {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .med-hero {
    padding-inline: 24px;
  }
}
</style>
