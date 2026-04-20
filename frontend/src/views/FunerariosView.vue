<!-- src/views/FunerariosView.vue -->
<template>
  <main class="funerario-page">
    <!-- HERO -->
    <section
      class="funerario-hero"
      :style="{ backgroundImage: `url(${bannerFunerario})` }"
    >
      <div class="hero-overlay">
        <div class="hero-inner">
          <div class="hero-content">
            <p class="hero-kicker">MÓDULO 5</p>

            <h1 class="hero-title">Apoyo Funerario</h1>

            <p class="hero-text">
              En caso de fallecimiento de un estudiante inscrito en el sistema educativo
              público, el Programa de Salud Escolar (PSE) contempla un aporte económico
              de hasta <strong>Q7,500.00</strong> para apoyar a la familia en los gastos
              funerarios. Este apoyo busca acompañar y aliviar, en lo posible, a las
              familias en momentos difíciles.
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
      />
    </section>

    <!-- CONTENIDO -->
    <section class="funerario-body">
      <div class="funerario-inner">
        <!-- PASOS -->
        <section class="section-card section-steps">
          <div class="section-head centered">
            <h2 class="section-title">Pasos para que recibas el aporte económico</h2>
            <p class="section-subtitle">
              Proceso orientativo basado en la infografía institucional. En la versión
              final se conectará con los formularios y flujos del sistema.
            </p>
          </div>

          <div class="steps-grid">
            <article class="step-card" v-for="paso in pasos" :key="paso.numero">
              <div class="step-number">{{ paso.numero }}</div>
              <h3 class="step-title">{{ paso.titulo }}</h3>
              <p class="step-text">{{ paso.descripcion }}</p>
              <img :src="paso.imagen" :alt="paso.titulo" class="step-image" />
            </article>
          </div>
        </section>

        <!-- VIDEO -->
        <section class="section-card video-section">
          <div class="video-box">
            <span class="play-button">▶</span>
          </div>

          <div class="video-caption">
            <h2 class="section-title">Video informativo</h2>
            <p class="section-subtitle">
              Video institucional que explique el apoyo funerario del PSE.
            </p>

            <div class="download-actions">
              <a
                class="btn-download btn-outline"
                href="/docs/pse-apoyo-funerario-folleto.pdf"
                target="_blank"
                rel="noopener"
              >
                Descarga folleto PDF
              </a>

              <a
                class="btn-download btn-filled"
                href="/docs/pse-apoyo-funerario-formulario.pdf"
                target="_blank"
                rel="noopener"
              >
                Descarga formulario
              </a>
            </div>
          </div>
        </section>

        <!-- FLUJO -->
        <section class="split-section flow-section">
          <div class="split-image-box">
            <img
              :src="imgFlujo"
              alt="Flujo básico de atención"
              class="split-image"
            />
          </div>

          <div class="split-text-box">
            <h2 class="section-title left">Flujo básico de atención</h2>

            <ol class="flow-list">
              <li>
                El estudiante debe estar inscrito en el Sistema de Registros Educativos (SIRE).
              </li>
              <li>
                Presentar certificado de defunción del estudiante.
              </li>
              <li>
                Presentar DPI y NIT del padre, madre, tutor o encargado
                (o documento que lo acredite).
              </li>
              <li>
                Seguir las indicaciones de la Dirección Departamental de Educación para
                completar el trámite.
              </li>
            </ol>
          </div>
        </section>

        <!-- RESUMEN -->
        <section class="section-card resumen-card">
          <div class="resumen-content">
            <div class="resumen-text">
              <h2 class="section-title left">Resumen del programa</h2>

              <ul class="summary-list">
                <li>
                  El aporte económico puede ser de hasta <strong>Q7,500.00</strong> por estudiante.
                </li>
                <li>
                  La familia elige la funeraria de su conveniencia, de acuerdo con las
                  indicaciones del programa.
                </li>
                <li>
                  El apoyo se otorga para contribuir a los gastos funerarios derivados del
                  fallecimiento del estudiante.
                </li>
                <li>
                  El PSE coordina con las Direcciones Departamentales para verificar la
                  información y acompañar a la familia durante el proceso.
                </li>
              </ul>
            </div>

            <div class="resumen-image-box">
              <img
                :src="imgResumen"
                alt="Resumen del programa"
                class="resumen-image"
              />
            </div>
          </div>
        </section>

        <!-- MÉTRICAS -->
        <section class="metrics-section">
          <div class="section-head centered metrics-head">
            <h2 class="section-title">
              Aportes económicos a familias de estudiantes fallecidos
            </h2>
          </div>

          <div class="metrics-grid">
            <article class="metric-card">
              <div class="metric-icon-wrap">
                <img
                  :src="imgMetricas"
                  alt="Casos atendidos"
                  class="metric-icon-img"
                />
              </div>
              <p class="metric-value">{{ datosFunerarios.totalCasos }}</p>
              <p class="metric-label">Casos atendidos</p>
            </article>

            <article class="metric-card metric-card-highlight">
              <div class="metric-emoji">👨</div>
              <p class="metric-value">{{ datosFunerarios.masculinos }}</p>
              <p class="metric-label">Masculinos</p>
            </article>

            <article class="metric-card">
              <div class="metric-emoji">👩</div>
              <p class="metric-value">{{ datosFunerarios.femeninos }}</p>
              <p class="metric-label">Femeninos</p>
            </article>

            <article class="metric-card">
              <div class="metric-emoji">Q</div>
              <p class="metric-value amount">
                {{ formatoMoneda(datosFunerarios.montoTotal) }}
              </p>
              <p class="metric-label">Monto total entregado</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
const bannerFunerario = '/Funerario/funerario-banner.png'
const logoFranja = '/Home/LOGOS/logo-franja.png'

const imgFlujo = '/Funerario/funerario-flujo-atencion.png'
const imgResumen = '/Funerario/funerario-resumen-programa.png'
const imgMetricas = '/Funerario/funerario-metrica-casos.png'

const pasos = [
  {
    numero: 1,
    titulo: 'Llama gratis al 1528 o acude a la Dirección Departamental',
    descripcion:
      'Marca sin costo al 1528 o acércate a la Dirección Departamental para recibir orientación inicial sobre el proceso.',
    imagen: '/Funerario/funerario-paso-1.png'
  },
  {
    numero: 2,
    titulo: 'Presenta los documentos requeridos',
    descripcion:
      'Presenta el certificado de defunción del estudiante, DPI y NIT del padre, madre, tutor o encargado, según corresponda.',
    imagen: '/Funerario/funerario-paso-2.png'
  },
  {
    numero: 3,
    titulo: 'Elige la funeraria y recibe el apoyo económico',
    descripcion:
      'La familia elige la funeraria de su conveniencia. El aporte económico puede ser de hasta Q7,500.00 por estudiante.',
    imagen: '/Funerario/funerario-paso-3.png'
  }
]

const datosFunerarios = {
  totalCasos: 329,
  masculinos: 193,
  femeninos: 136,
  montoTotal: 2467000
}

const formatoMoneda = (valor) => {
  return `Q${valor.toLocaleString('es-GT')}`
}
</script>

<style scoped>
.funerario-page {
  background: #f3f5f7;
}

/* HERO */
.funerario-hero {
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 52, 92, 0.92),
    rgba(0, 52, 92, 0.72),
    rgba(0, 52, 92, 0.18)
  );
  display: flex;
  align-items: center;
}

.hero-inner {
  max-width: 1320px;
  margin: 0 auto;
  width: 100%;
  padding: 130px 36px 60px;
}

.hero-content {
  max-width: 650px;
}

.hero-kicker {
  display: inline-block;
  background: #20c9e8;
  color: #00345c;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 16px;
}

.hero-title {
  color: #ffffff;
  font-size: 3.15rem;
  line-height: 0.98;
  font-weight: 900;
  margin: 0 0 18px;
}

.hero-text {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  line-height: 1.55;
  margin: 0;
  max-width: 620px;
  text-align: left;
}

/* FRANJA */
.logo-franja {
  background: #ffffff;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 12px 32px 14px;
}

/* BODY */
.funerario-body {
  padding: 22px 0 50px;
}

.funerario-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  gap: 24px;
}

/* HEADINGS */
.section-head.centered {
  text-align: center;
  margin-bottom: 18px;
}

.section-title {
  color: #0b4168;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 900;
  margin: 0 0 8px;
}

.section-title.left {
  text-align: left;
}

.section-subtitle {
  color: #5b6470;
  font-size: 0.95rem;
  line-height: 1.45;
  margin: 0;
  text-align: center;
}

.video-caption .section-subtitle,
.split-text-box .section-subtitle,
.resumen-text .section-subtitle {
  text-align: left;
}

/* CARD BASE */
.section-card {
  background: #eef2f4;
  border-radius: 18px;
  padding: 18px 20px 20px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

/* PASOS */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.step-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 18px 14px 14px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  text-align: center;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #0b4168;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 0.85rem;
  font-weight: 800;
}

.step-title {
  color: #0b4168;
  font-size: 0.98rem;
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 8px;
}

.step-text {
  color: #56606c;
  font-size: 0.88rem;
  line-height: 1.4;
  margin: 0 0 14px;
  min-height: 86px;
}

.step-image {
  width: 100%;
  height: 155px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

/* VIDEO */
.video-section {
  background: #eef2f4;
  padding: 0;
  overflow: hidden;
}

.video-box {
  width: 100%;
  min-height: 220px;
  background: #003e68;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 88px;
  height: 88px;
  border-radius: 999px;
  background: #ffffff;
  color: #003e68;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.video-caption {
  padding: 16px 18px 20px;
  text-align: center;
}

.download-actions {
  margin-top: 14px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 210px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-outline {
  border: 1.5px solid #0b4168;
  color: #0b4168;
  background: #ffffff;
}

.btn-outline:hover {
  background: #0b4168;
  color: #ffffff;
}

.btn-filled {
  border: 1.5px solid #20c9e8;
  color: #00345c;
  background: #20c9e8;
}

.btn-filled:hover {
  filter: brightness(0.95);
}

/* SPLIT */
.split-section {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 28px;
  align-items: center;
}

.split-image-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.split-image {
  width: 100%;
  border-radius: 12px;
  display: block;
  object-fit: cover;
}

.split-text-box {
  padding-top: 4px;
}

/* FLOW */
.flow-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
  counter-reset: flujo;
}

.flow-list li {
  counter-increment: flujo;
  position: relative;
  padding-left: 38px;
  color: #39424e;
  font-size: 0.9rem;
  line-height: 1.5;
}

.flow-list li::before {
  content: counter(flujo);
  position: absolute;
  left: 0;
  top: 2px;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #0b4168;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
}

/* RESUMEN */
.resumen-card {
  background: #dfe8ed;
}

.resumen-content {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 24px;
  align-items: center;
}

.summary-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.summary-list li {
  position: relative;
  padding-left: 34px;
  color: #39424e;
  font-size: 0.9rem;
  line-height: 1.5;
}

.summary-list li::before {
  content: '•';
  position: absolute;
  left: 10px;
  top: 0;
  color: #0b4168;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 900;
}

.resumen-image {
  width: 100%;
  max-width: 360px;
  display: block;
  margin-left: auto;
  border-radius: 12px;
  object-fit: cover;
}

/* METRICAS */
.metrics-section {
  padding-top: 2px;
}

.metrics-head {
  margin-bottom: 14px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.metric-card {
  background: #ffffff;
  border: 1.4px solid #154d75;
  border-radius: 12px;
  padding: 16px 14px;
  min-height: 160px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.metric-card-highlight {
  background: #20c9e8;
  border-color: #20c9e8;
  color: #ffffff;
}

.metric-icon-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.metric-icon-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.metric-emoji {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: #0b4168;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 1.35rem;
  font-weight: 800;
}

.metric-card-highlight .metric-emoji {
  background: rgba(255, 255, 255, 0.24);
}

.metric-value {
  color: #0b4168;
  font-size: 2rem;
  line-height: 1;
  font-weight: 900;
  margin: 0 0 8px;
}

.metric-card-highlight .metric-value,
.metric-card-highlight .metric-label {
  color: #ffffff;
}

.metric-label {
  color: #39424e;
  font-size: 0.92rem;
  line-height: 1.35;
  margin: 0;
}

.metric-value.amount {
  font-size: 1.55rem;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .steps-grid,
  .split-section,
  .resumen-content,
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .resumen-image {
    margin: 0 auto;
  }

  .metric-card {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 110px 20px 44px;
  }

  .funerario-inner {
    padding: 0 16px;
  }

  .logo-franja-img {
    padding: 10px 16px 14px;
  }

  .hero-title {
    font-size: 2.35rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .step-text {
    min-height: auto;
  }

  .video-box {
    min-height: 180px;
  }

  .btn-download {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-text {
    font-size: 0.94rem;
  }

  .section-card {
    padding: 16px;
  }

  .video-section {
    padding: 0;
  }

  .play-button {
    width: 74px;
    height: 74px;
    font-size: 1.7rem;
  }

  .metric-value {
    font-size: 1.7rem;
  }

  .metric-value.amount {
    font-size: 1.3rem;
  }
}
</style>