<template>
  <main class="atencion-page">
    <!-- HERO -->
    <section
      class="atencion-hero hero-banner-bg"
      :style="{ backgroundImage: `url(${bannerAtencion})` }"
    >
      <div class="hero-banner-overlay">
        <div class="hero-inner">
          <div>
            <p class="hero-kicker">MÓDULO 2</p>
            <h1 class="hero-title">
              Atención a enfermedades y consultas médicas en
              <span class="highlight">centros educativos</span>
            </h1>
            <p class="hero-text">
              El PSE registra las atenciones médicas brindadas a estudiantes del sistema educativo
              nacional, permitiendo identificar los principales motivos de consulta y fortalecer
              las acciones de prevención y coordinación con los servicios de salud.
            </p>
          </div>
        </div>
      </div>
    </section>

     <!-- FRANJA LOGOS -->
    <section class="logo-franja">
      <img
        class="logo-franja-img"
        :src="logoFranja"
        alt="Franja de logos institucionales"
      />
    </section>
    
    <!-- CUERPO CLARO -->
    <section class="atencion-body">
      <div class="atencion-inner">
        <!-- SECCIÓN TIPO INFOGRAFÍA -->
        <div class="stats-section">
          <div class="stats-grid">
            <!-- BLOQUE AZUL GRANDE -->
            <article class="card big-stats-card">
              <div class="big-stats-header">
                <div class="big-icon doctor">👨‍⚕️</div>
                <div>
                  <p class="big-label">Consultas atendidas</p>
                  <p class="big-value">
                    {{ resumen.consultas.toLocaleString('es-GT') }}
                  </p>
                </div>
              </div>

              <div class="big-stats-header">
                <div class="big-icon student">🎒</div>
                <div>
                  <p class="big-label">Estudiantes atendidos</p>
                  <p class="big-value">
                    {{ resumen.estudiantes.toLocaleString('es-GT') }}
                  </p>
                </div>
              </div>

              <div class="gender-row">
                <div class="gender-item">
                  <span class="gender-dot male"></span>
                  <span>Hombres</span>
                  <strong>{{ resumen.porcentajeHombres }}%</strong>
                </div>
                <div class="gender-item">
                  <span class="gender-dot female"></span>
                  <span>Mujeres</span>
                  <strong>{{ resumen.porcentajeMujeres }}%</strong>
                </div>
              </div>
            </article>

            <!-- BLOQUE MORBILIDADES -->
            <article class="card morbilidades-card">
              <h2 class="block-title">Morbilidades atendidas</h2>
              <p class="block-subtitle">
                Distribución de las principales causas de consulta registradas en el módulo
                (valores de ejemplo para el prototipo).
              </p>

              <ul class="morbilidades-list">
                <li v-for="m in morbilidades" :key="m.nombre">
                  <div class="m-left">
                    <span class="morbilidad-icon">{{ m.icono }}</span>
                    <span class="morbilidad-name">{{ m.nombre }}</span>
                  </div>
                  <div class="m-right">
                    {{ m.valor.toLocaleString('es-GT') }}
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </div>

        <!-- MAPA + DIAGNÓSTICOS -->
        <div class="row row-map">
          <article class="card card-map">
            <h2 class="block-title">Mapa de Guatemala</h2>
            <p class="block-subtitle">
              Distribución de atenciones registradas en los establecimientos del Programa de Salud
              Escolar. En el desarrollo posterior se podrá filtrar por tipo de atención y periodo.
            </p>

            <div class="map-wrapper">
              <GuateMap />
            </div>
          </article>

          <article class="card card-dx">
            <h2 class="block-title">Diagnósticos recurrentes</h2>
            <p class="block-subtitle">
              Principales diagnósticos que se repiten con mayor frecuencia en las consultas
              (datos de ejemplo para ilustrar el prototipo).
            </p>

            <table class="simple-table">
              <thead>
                <tr>
                  <th style="width: 40px;">#</th>
                  <th>Diagnóstico</th>
                  <th class="text-right">Consultas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dx, index) in diagnosticos" :key="dx.nombre">
                  <td>{{ index + 1 }}</td>
                  <td>{{ dx.nombre }}</td>
                  <td class="text-right">
                    {{ dx.consultas.toLocaleString('es-GT') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>

        <!-- TABLAS INFERIORES -->
        
        <div class="row row-bottom">
          <article class="card">
            <h2 class="block-title">Resumen de atenciones por departamento</h2>
            <p class="block-subtitle">
              Vista de ejemplo con algunos departamentos. Más adelante se podrá conectar esta
              tabla a la base de datos para mostrar los registros reales del sistema.
            </p>

            <table class="simple-table">
              <thead>
                <tr>
                  <th>Departamento</th>
                  <th class="text-right">Establecimientos</th>
                  <th class="text-right">Consultas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dep in atencionesPorDepartamento" :key="dep.nombre">
                  <td>{{ dep.nombre }}</td>
                  <td class="text-right">
                    {{ dep.establecimientos.toLocaleString('es-GT') }}
                  </td>
                  <td class="text-right">
                    {{ dep.consultas.toLocaleString('es-GT') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </article>

          <article class="card">
            <h2 class="block-title">Tipos de atenciones</h2>
            <p class="block-subtitle">
              Categorías de ejemplo que se pueden utilizar para clasificar las atenciones médicas
              en el módulo.
            </p>

            <ul class="type-list">
              <li v-for="tipo in tiposAtencion" :key="tipo.nombre">
                <h3>{{ tipo.nombre }}</h3>
                <p>{{ tipo.descripcion }}</p>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import GuateMap from '@/components/GuateMap.vue'

const bannerAtencion = '/Atencion/banner/banner-atencion.jpg'
const logoFranja = '/Home/LOGOS/logo-franja.png'

const resumen = {
  consultas: 674656,
  estudiantes: 222704,
  porcentajeHombres: 52,
  porcentajeMujeres: 48
}

const morbilidades = [
  {
    nombre: 'Infecciones respiratorias',
    valor: 223892,
    icono: '🫁'
  },
  {
    nombre: 'Enfermedades gastrointestinales',
    valor: 69763,
    icono: '🍽️'
  },
  {
    nombre: 'Accidentes y traumatismos',
    valor: 33934,
    icono: '🚑'
  },
  {
    nombre: 'Otras causas',
    valor: 245035,
    icono: '✨'
  }
]

const diagnosticos = [
  { nombre: 'Rinofaringitis aguda (resfriado común)', consultas: 116934 },
  { nombre: 'Control de salud de rutina del niño', consultas: 46162 },
  { nombre: 'Amigdalitis aguda, no especificada', consultas: 43643 },
  { nombre: 'Diarrea y gastroenteritis de presunto origen infeccioso', consultas: 26970 },
  { nombre: 'Alergia no especificada', consultas: 17986 },
  { nombre: 'Amebiasis, no especificada', consultas: 17235 },
  { nombre: 'Retardo del desarrollo debido a desnutrición proteico-calórica', consultas: 15265 },
  { nombre: 'Parasitosis intestinal, sin otra especificación', consultas: 14542 },
  { nombre: 'Infección aguda de vías respiratorias superiores', consultas: 11542 },
  { nombre: 'Bronquitis aguda, no especificada', consultas: 11475 }
]

const atencionesPorDepartamento = [
  { nombre: 'Guatemala', establecimientos: 250, consultas: 420310 },
  { nombre: 'Quetzaltenango', establecimientos: 120, consultas: 163200 },
  { nombre: 'Alta Verapaz', establecimientos: 140, consultas: 152890 },
  { nombre: 'Escuintla', establecimientos: 95, consultas: 98850 },
  { nombre: 'Huehuetenango', establecimientos: 110, consultas: 113740 }
]

const tiposAtencion = [
  {
    nombre: 'Consulta general',
    descripcion: 'Atención médica básica para la valoración inicial de síntomas y padecimientos comunes.'
  },
  {
    nombre: 'Seguimiento clínico',
    descripcion: 'Control y monitoreo de casos previamente registrados para verificar evolución y tratamiento.'
  },
  {
    nombre: 'Referencia a servicios de salud',
    descripcion: 'Derivación de estudiantes a establecimientos de salud cuando el caso requiere atención especializada.'
  },
  {
    nombre: 'Orientación preventiva',
    descripcion: 'Acciones de consejería y promoción para reducir factores de riesgo en la comunidad estudiantil.'
  }
]
</script>

<style scoped>
.atencion-page {
  background: #020617;
  color: #f9fafb;
}

/* HERO */
.atencion-hero {
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
/* CUERPO CLARO */
.atencion-body {
  background: #e5e7eb;
  padding: 0 0 48px;
}

.atencion-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 48px 0;
}

/* CARDS GENERALES */
.card {
  background: #ffffff;
  color: #020617;
  border-radius: 18px;
  padding: 16px 18px 18px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
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

/* STATS */
.stats-section {
  margin-bottom: 22px;
}

.stats-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.1fr);
  gap: 18px;
}

.big-stats-card {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  color: #f9fafb;
}

.big-stats-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.big-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  background: rgba(15, 23, 42, 0.22);
}

.big-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.big-value {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.1;
}

.gender-row {
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid rgba(15, 23, 42, 0.25);
}

.gender-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
}

.gender-item strong {
  margin-left: 4px;
}

.gender-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.gender-dot.male {
  background: #60a5fa;
}

.gender-dot.female {
  background: #fb7185;
}

/* MORBILIDADES */
.morbilidades-card {
  display: flex;
  flex-direction: column;
}

.morbilidades-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: grid;
  gap: 8px;
}

.morbilidades-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 10px;
  background: #f3f4ff;
}

.m-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.morbilidad-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0ebff;
}

.morbilidad-name {
  font-size: 0.82rem;
  font-weight: 500;
}

.m-right {
  font-size: 0.9rem;
  font-weight: 600;
}

/* FILAS */
.row {
  display: grid;
  gap: 18px;
  margin-bottom: 22px;
}

/* MAPA + DX */
.row-map {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.1fr);
}

.map-wrapper {
  margin-top: 8px;
  background: #ffffff;
  border-radius: 14px;
  padding: 8px;
  height: 380px;
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

/* TABLAS INFERIORES */
.row-bottom {
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
}

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

/* TIPOS */
.type-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}

.type-list h3 {
  font-size: 0.85rem;
  margin-bottom: 2px;
}

.type-list p {
  font-size: 0.78rem;
  color: #4b5563;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .atencion-inner {
    padding-inline: 24px;
  }

  .stats-grid,
  .row-map,
  .row-bottom {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .atencion-hero {
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

  .logos-track {
    gap: 40px;
  }

  .logo-item {
    height: 65px;
  }
}
</style>