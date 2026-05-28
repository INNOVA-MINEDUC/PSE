<template>
  <main class="med-page">
    <!-- HERO -->
    <section
      class="med-hero hero-banner-bg"
      :style="{ backgroundImage: `url(${bannerSuministros})` }"
    >
      <div class="hero-banner-overlay">
        <div class="hero-inner">
          <div>
            <p class="hero-kicker">MÓDULO 3</p>
            <h1 class="hero-title">
              Suministro de medicamentos en
              <span class="highlight">centros educativos</span>
            </h1>

            <p class="hero-text">
              El PSE garantiza el acceso gratuito a medicamentos esenciales para el tratamiento
              de enfermedades en la población escolar, a través de los servicios del Ministerio
              de Salud Pública y Asistencia Social (MSPAS).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FRANJA DE LOGOS -->
    <section class="logo-franja">
      <img
        :src="logoFranja"
        alt="Franja de logos institucionales"
        class="logo-franja-img"
        loading="lazy"
        decoding="async"
      />
    </section>

    <!-- CUERPO -->
    <section class="med-body">
      <div class="med-inner">
        <!-- RESULTADOS -->
        <section class="results-slider">
  <button class="results-arrow results-arrow-left" type="button">‹</button>

  <div class="results-track">
    <div class="result-card">
      <p class="result-tag">RESULTADOS</p>
      <h3>Unidades entregadas</h3>
      <p class="result-period">Periodo de referencia: {{ resumen.periodo }}</p>
      <div class="result-divider"></div>
      <ul class="result-list">
        <li>
          Total entregado:
          <strong>{{ resumen.unidades.toLocaleString('es-GT') }}</strong>
        </li>
        <li>
          Distribución de medicamentos en el periodo seleccionado.
        </li>
      </ul>
    </div>

    <div class="result-card active">
      <p class="result-tag">RESULTADOS</p>
      <h3>Establecimientos con suministro</h3>
      <p class="result-period">Periodo de referencia: {{ resumen.periodo }}</p>
      <div class="result-divider"></div>
      <ul class="result-list">
        <li>
          Total de establecimientos:
          <strong>{{ resumen.establecimientos.toLocaleString('es-GT') }}</strong>
        </li>
        <li>
          Incluye hospitales, centros y puestos de salud que reciben medicamentos del PSE.
        </li>
      </ul>
    </div>

    <div class="result-card">
      <p class="result-tag">RESULTADOS</p>
      <h3>Cobertura nacional</h3>
      <p class="result-period">Periodo de referencia: {{ resumen.periodo }}</p>
      <div class="result-divider"></div>
      <ul class="result-list">
        <li>
          Cobertura:
          <strong>{{ resumen.cobertura }} municipios</strong>
        </li>
        <li>
          La red de servicios de salud públicos está presente en todo el país.
        </li>
      </ul>
    </div>
  </div>

  <button class="results-arrow results-arrow-right" type="button">›</button>
</section>
        <!-- ¿DÓNDE SE ENTREGAN? -->
        <div class="row row-info">
          <div class="card card-info info-layout">
            <div class="info-copy">
              <h2 class="info-title">¿Dónde se entregan los medicamentos?</h2>

              <p class="info-main-text">
                Los medicamentos del PSE se distribuyen a través de la red pública de servicios de salud del MSPAS.
                Los estudiantes pueden recibir medicamentos de forma gratuita en los servicios de salud públicos,
                sin necesidad de presentar constancia de ser escolar. La red está presente en los 340 municipios
                del país, lo que permite una cobertura nacional y referencias entre servicios según la necesidad
                de cada caso. Todos los medicamentos se entregan de forma gratuita.
              </p>

              <div class="info-block">
                <h3>Hospitales:</h3>
                <p>
                  Se suministran medicamentos para pacientes que requieren hospitalización,
                  de acuerdo con el diagnóstico médico y el plan de tratamiento.
                </p>
              </div>

              <div class="info-block">
                <h3>Puestos de salud, Centros de Salud y Centros de Atención Permanente (CAP)</h3>
                <p>
                  Se entregan medicamentos para tratamiento ambulatorio, es decir, para enfermedades
                  que pueden ser tratadas en casa sin necesidad de ingreso hospitalario.
                </p>
              </div>

              <button class="mspas-btn" type="button">Red pública de atención MSPAS</button>
            </div>

            <div class="info-astro-box">
              <img
                src="/Suministros/banner/astronauta.jpg" 
                alt="Astronauta suministro"
                class="info-astro"
              />
            </div>
          </div>
        </div>

        <!-- MAPA + MEDICAMENTOS -->
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

        <!-- TABLA FINAL -->
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
    <AppFooter />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GuateMap from '@/components/GuateMap.vue'
import AppFooter from '@/components/AppFooter.vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const bannerSuministros = '/Suministros/banner/banner-suministros.webp'
const logoFranja = '/Home/LOGOS/logo-franja.webp'

const resumen = ref({
  unidades: 800000,
  establecimientos: 1350,
  cobertura: 340,
  periodo: 'enero – julio 2025'
})

onMounted(async () => {
  try {
    const res  = await fetch(`${API_URL}/api/medicamentos/metricas`)
    const data = await res.json()
    if (data.success && data.data) {
      resumen.value = {
        unidades:         data.data.unidades_entregadas              ?? resumen.value.unidades,
        establecimientos: data.data.establecimientos_con_suministro  ?? resumen.value.establecimientos,
        cobertura:        data.data.cobertura_nacional               ?? resumen.value.cobertura,
        periodo:          data.data.periodo                          || resumen.value.periodo
      }
    }
  } catch (err) {
    console.error('Error cargando métricas medicamentos:', err)
  }
})

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

/* HERO */
.med-hero {
  min-height: 590px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 0;
}

.hero-banner-bg {
  min-height: 590px;
}



.hero-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 44px 40px;
  width: 100%;
}

.hero-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #60d5f3;
  margin: 0 0 8px;
  font-weight: 700;
}

.hero-title {
  max-width: 720px;
  width: 100%;
  font-size: 45px;
  line-height: 1.06;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 14px;
}

.highlight {
  color: #ffffff;
  position: relative;
  display: inline-block;
  z-index: 1;
  padding: 5px 15px;
}

.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #15c9e8, #0bb6d6);
  z-index: -1;
  border-radius: 8px;
}

.hero-text {
  max-width: 700px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.94);
  margin: 0;
  text-align: justify;
}

/* FRANJA LOGOS */
.logo-franja {
  background: #ffffff;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 10px 56px 14px;
}

/* CUERPO */
.med-body {
  background: #f3f4f6;
  padding: 0 0 48px;
}

.med-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 48px 0;
}

/* RESULTADOS */
.results-slider {
  padding: 8px 0 26px;
  position: relative;
}

.results-track {
  max-width: 1200px;
  margin: 0 auto;
  background: #dfe8ee;
  border-radius: 24px;
  padding: 34px 58px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  align-items: center;
}

.result-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 20px 16px;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.12);
  min-height: 190px;
}

.result-card.active {
  background: #0a4f7e;
  color: #ffffff;
}

.result-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  background: #0a4f7e;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  margin: 0 0 12px;
}

.result-card.active .result-tag {
  background: #14c7e5;
  color: #08395d;
}

.result-card h3 {
  font-size: 1rem;
  line-height: 1.12;
  margin: 0 0 4px;
  font-weight: 800;
  color: #08395d;
}

.result-card.active h3 {
  color: #ffffff;
}

.result-period {
  font-size: 0.72rem;
  margin: 0 0 8px;
  color: #476785;
}

.result-card.active .result-period {
  color: rgba(255, 255, 255, 0.92);
}

.result-divider {
  height: 2px;
  background: #c9d8e6;
  margin: 8px 0 14px;
}

.result-card.active .result-divider {
  background: rgba(20, 199, 229, 0.7);
}

.result-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.result-list li {
  position: relative;
  padding-left: 26px;
  font-size: 0.86rem;
  color: #194a6f;
}

.result-list li::before {
  content: "";
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #0a4f7e;
  position: absolute;
  left: 0;
  top: 3px;
}

.result-card.active .result-list li {
  color: #ffffff;
}

.result-card.active .result-list li::before {
  background: #14c7e5;
}

.results-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: none;
  background: #ffffff;
  color: #6a7d94;
  font-size: 28px;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.15);
}

.results-arrow-left {
  left: 42px;
}

.results-arrow-right {
  right: 42px;
}

/* FILAS GENERALES */
.row {
  display: grid;
  gap: 18px;
  margin-bottom: 22px;
}

/* BLOQUE INFO */
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

.info-layout {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 26px;
  align-items: center;
  background: #dfe8ee;
  padding: 34px 34px 28px;
}

.info-title {
  font-size: 3rem;
  line-height: 0.95;
  font-weight: 900;
  color: #0a4f7e;
  margin: 0 0 18px;
  max-width: 560px;
}

.info-main-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #1d4f73;
  margin-bottom: 16px;
  font-weight: 600;
}

.info-block {
  margin-top: 18px;
}

.info-block h3 {
  font-size: 1rem;
  color: #0a4f7e;
  margin-bottom: 8px;
  font-weight: 800;
}

.info-block p {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #1d4f73;
  font-weight: 600;
}

.mspas-btn {
  margin-top: 26px;
  border: none;
  background: #14c7e5;
  color: #08395d;
  font-weight: 900;
  font-size: 1rem;
  padding: 14px 24px;
  border-radius: 12px;
}

.info-astro-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-astro {
  width: 100%;
  max-width: 420px;
  object-fit: contain;
}

/* TÍTULOS GENERALES */
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

/* MAPA + TABLA */
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
  .med-inner {
    padding-inline: 24px;
  }

  .results-track {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .info-layout {
    grid-template-columns: 1fr;
  }

  .row-map {
    grid-template-columns: minmax(0, 1fr);
  }

  .results-arrow {
    display: none;
  }

  .info-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 700px) {
  .med-hero {
    min-height: 360px;
    padding-inline: 0;
  }

  .hero-banner-bg {
    min-height: 360px;
  }

  .hero-inner {
    padding: 100px 24px 30px;
  }

  .hero-title {
    font-size: 34px;
  }

  .hero-text {
    font-size: 14px;
    max-width: 100%;
  }

  .logo-franja-img {
    padding: 8px 18px 12px;
  }
}
</style>