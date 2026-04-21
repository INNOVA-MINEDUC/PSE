<template>
  <main class="funerario-page">
    <!-- HERO -->
    <section
      class="module-hero"
      :style="{ backgroundImage: `url(${bannerFunerario})` }"
    >
   <div class="hero-banner-overlay">
        <div class="hero-inner">
          <div>
            <p class="hero-kicker">MÓDULO 4</p>
            <h1 class="hero-title">
              Apoyo
              <span class="highlight">Funerario</span>
            </h1>
            <p class="hero-text">
               En caso de fallecimiento de un estudiante inscrito en el sistema
              educativo público, el Programa de Salud Escolar (PSE) contempla un
              aporte económico de hasta <strong>Q7,500.00</strong> para apoyar a
              la familia en los gastos funerarios. Este apoyo busca acompañar y
              aliviar, en lo posible, a las familias en momentos difíciles.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FRANJA DE LOGOS -->
    <section class="logo-strip">
      <div class="module-container">
        <img
          :src="logoFranja"
          alt="Logos institucionales del Programa de Salud Escolar"
          class="logo-strip-image"
        />
      </div>
    </section>

    <!-- CONTENIDO -->
    <section class="module-content">
      <div class="module-container content-stack">
        <!-- PASOS -->
        <section class="block-card steps-section">
          <div class="section-heading centered">
            <h2 class="section-title">Pasos para que recibas el aporte económico</h2>
          </div>

          <div class="steps-grid">
            <article class="step-card" v-for="paso in pasos" :key="paso.numero">
              <div class="step-number">{{ paso.numero }}</div>
              <h3 class="step-title">{{ paso.titulo }}</h3>
              <p class="step-description">{{ paso.descripcion }}</p>

              <div class="step-image-wrap">
                <img :src="paso.imagen" :alt="paso.titulo" class="step-image" />
              </div>
            </article>
          </div>
        </section>

        <!-- VIDEO -->
        <section class="block-card video-section">
          <div class="video-placeholder">
            <button class="play-button" type="button" aria-label="Reproducir video">
              ▶
            </button>
          </div>

          <div class="video-content">
            <h2 class="section-title">Video informativo</h2>
            <p class="section-subtitle">
              Video institucional que explique el apoyo funerario del PSE.
            </p>

            <div class="action-buttons">
              <a
                href="/docs/pse-apoyo-funerario-folleto.pdf"
                target="_blank"
                rel="noopener"
                class="btn btn-outline"
              >
                Descarga folleto PDF
              </a>

              <a
                href="/docs/pse-apoyo-funerario-formulario.pdf"
                target="_blank"
                rel="noopener"
                class="btn btn-primary"
              >
                Descarga formulario
              </a>
            </div>
          </div>
        </section>

        <!-- FLUJO -->
        <section class="split-card">
          <div class="split-media">
            <img
              :src="imgFlujo"
              alt="Flujo básico de atención del apoyo funerario"
              class="split-image"
            />
          </div>

          <div class="split-content">
            <h2 class="section-title align-left">Flujo básico de atención</h2>

            <ol class="number-list">
              <li>
                El estudiante debe estar inscrito en el Sistema de Registros
                Educativos (SIRE).
              </li>
              <li>
                Presentar certificado de defunción del estudiante.
              </li>
              <li>
                Presentar DPI y NIT del padre, madre, tutor o encargado
                (o documento que lo acredite).
              </li>
              <li>
                Seguir las indicaciones de la Dirección Departamental de Educación
                para completar el trámite.
              </li>
            </ol>
          </div>
        </section>

        <!-- RESUMEN -->
        <section class="block-card summary-section">
          <div class="summary-grid">
            <div class="summary-copy">
              <h2 class="section-title align-left">Resumen del programa</h2>

              <ul class="summary-list">
                <li>
                  El aporte económico puede ser de hasta
                  <strong>Q7,500.00</strong> por estudiante.
                </li>
                <li>
                  La familia elige la funeraria de su conveniencia, de acuerdo con
                  las indicaciones del programa.
                </li>
                <li>
                  El apoyo se otorga para contribuir a los gastos funerarios
                  derivados del fallecimiento del estudiante.
                </li>
                <li>
                  El PSE coordina con las Direcciones Departamentales para verificar
                  la información y acompañar a la familia durante el proceso.
                </li>
              </ul>
            </div>

            <div class="summary-media">
              <img
                :src="imgResumen"
                alt="Resumen visual del programa de apoyo funerario"
                class="summary-image"
              />
            </div>
          </div>
        </section>

        <!-- MÉTRICAS -->
        <section class="metrics-section">
          <div class="section-heading centered metrics-heading">
            <h2 class="section-title">
              Aportes económicos a familias de estudiantes fallecidos
            </h2>
          </div>

          <div class="metrics-grid">
            <article class="metric-card">
              <div class="metric-icon metric-icon-image">
                <img
                  :src="imgMetricas"
                  alt="Ícono de casos atendidos"
                  class="metric-image"
                />
              </div>
              <h3 class="metric-value">{{ datosFunerarios.totalCasos }}</h3>
              <p class="metric-label">Casos atendidos</p>
            </article>

            <article class="metric-card metric-card-accent">
              <div class="metric-icon">👨</div>
              <h3 class="metric-value">{{ datosFunerarios.masculinos }}</h3>
              <p class="metric-label">Masculinos</p>
            </article>

            <article class="metric-card">
              <div class="metric-icon">👩</div>
              <h3 class="metric-value">{{ datosFunerarios.femeninos }}</h3>
              <p class="metric-label">Femeninos</p>
            </article>

            <article class="metric-card">
              <div class="metric-icon">Q</div>
              <h3 class="metric-value metric-value-amount">
                {{ formatoMoneda(datosFunerarios.montoTotal) }}
              </h3>
              <p class="metric-label">Monto total entregado</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
const bannerFunerario = '/Funerario/banner/funerario-banner.png'
const logoFranja = '/Home/LOGOS/logo-franja.png'

const imgFlujo = '/Funerario/funerario-flujo-atencion.png'
const imgResumen = '/Funerario/funerario-metrica-casos.png'
const imgMetricas = '/Funerario/funerario-metrica-casos.png'

const pasos = [
  {
    numero: 1,
    titulo: 'Llama gratis al 1528 o acude a la Dirección Departamental',
    descripcion:
      'Marca sin costo al 1528 o acércate a la Dirección Departamental para recibir orientación inicial sobre el proceso.',
    imagen: '/Funerario/funerario-paso-2.png'
  },
  {
    numero: 2,
    titulo: 'Presenta los documentos requeridos',
    descripcion:
      'Certificado de defunción del estudiante. Fotocopia de DPI y NIT del padre, madre, tutor o encargado (según aplique).',
    imagen: '/Funerario/funerario-paso-3.png'
  },
  {
    numero: 3,
    titulo: 'Elige la funeraria y recibe el apoyo económico',
    descripcion:
      'Como padre, madre, tutor o encargado, eliges la funeraria de tu conveniencia. El aporte económico para gastos funerarios puede ser de hasta Q7,500.00 por estudiante.',
    imagen: '/Funerario/funerario-paso-1.png'
  }
]

const datosFunerarios = {
  totalCasos: 329,
  masculinos: 193,
  femeninos: 136,
  montoTotal: 2467000
}

const formatoMoneda = (valor) => `Q${valor.toLocaleString('es-GT')}`
</script>

<style scoped>
.funerario-page {
  background: #f4f6f8;
  min-height: 100vh;
}

.module-container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
}

/* HERO */
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
  max-width: 900px;
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


/* FRANJA */
.logo-strip {
  background: #ffffff;
  border-bottom: 1px solid rgba(10, 55, 90, 0.06);
}

.logo-strip-image {
  display: block;
  width: 100%;
  padding: 12px 0 14px;
}

/* BODY */
.module-content {
  padding: 24px 0 56px;
}

.content-stack {
  display: grid;
  gap: 24px;
}

/* TITULOS */
.section-heading.centered {
  text-align: center;
  margin-bottom: 18px;
}

.section-title {
  margin: 0 0 8px;
  color: #0b4168;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 900;
}

.section-title.align-left {
  text-align: left;
}

.section-subtitle {
  margin: 0;
  color: #5d6873;
  font-size: 0.95rem;
  line-height: 1.5;
}

.centered .section-subtitle,
.video-content .section-subtitle {
  text-align: center;
}

/* CARD BASE */
.block-card,
.split-card {
  background: #eef2f4;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

/* PASOS */
.steps-section {
  padding: 20px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.step-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 14px 0;
  text-align: center;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.step-number {
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #0b4168;
  color: #ffffff;
  font-size: 1.45rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  margin: 0 0 12px;
  color: #0b4168;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 900;
  min-height: 76px;
}

.step-description {
  margin: 0 0 18px;
  color: #55616d;
  font-size: 0.95rem;
  line-height: 1.45;
  min-height: 110px;
  padding: 0 6px;
}

.step-image-wrap {
  margin-top: auto;
  width: 100%;
  height: 270px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.step-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

/* VIDEO */
.video-section {
  overflow: hidden;
  padding: 0;
}

.video-placeholder {
  width: 100%;
  height: 600px;
  background: #003f69;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px 18px 0 0;
}

.play-button {
  width: 92px;
  height: 92px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  color: #003f69;
  font-size: 2rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
}

.video-content {
  padding: 18px 20px 22px;
  text-align: center;
}

.action-buttons {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 210px;
  padding: 11px 20px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
}

.btn-outline {
  border: 1.5px solid #0b4168;
  background: #ffffff;
  color: #0b4168;
}

.btn-outline:hover {
  background: #0b4168;
  color: #ffffff;
}

.btn-primary {
  border: 1.5px solid #19c7e8;
  background: #19c7e8;
  color: #00345c;
}

.btn-primary:hover {
  filter: brightness(0.96);
}

/* SPLIT */
.split-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 28px;
  padding: 22px;
  align-items: center;
}

.split-image {
  width: 100%;
  display: block;
  object-fit: cover;
  border-radius: 14px;
}

.number-list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
  counter-reset: item;
}

.number-list li {
  counter-increment: item;
  position: relative;
  padding-left: 38px;
  color: #394550;
  font-size: 0.92rem;
  line-height: 1.5;
}

.number-list li::before {
  content: counter(item);
  position: absolute;
  left: 0;
  top: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #0b4168;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* RESUMEN */
.summary-section {
  padding: 22px;
  background: #dfe8ed;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr;
  gap: 24px;
  align-items: center;
}

.summary-list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.summary-list li {
  position: relative;
  padding-left: 32px;
  color: #394550;
  font-size: 0.92rem;
  line-height: 1.55;
}

.summary-list li::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 9px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #0b4168;
}

.summary-image {
  width: 100%;
  max-width: 360px;
  margin-left: auto;
  display: block;
  border-radius: 14px;
  object-fit: cover;
}

/* METRICAS */
.metrics-heading {
  margin-bottom: 14px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.metric-card {
  background: #ffffff;
  border: 1.5px solid #154d75;
  border-radius: 14px;
  min-height: 160px;
  padding: 18px 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.metric-card-accent {
  background: #19c7e8;
  border-color: #19c7e8;
}

.metric-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #0b4168;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  font-size: 1.4rem;
  font-weight: 800;
}

.metric-icon-image {
  background: transparent;
}

.metric-image {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.metric-value {
  margin: 0 0 8px;
  color: #0b4168;
  font-size: 2rem;
  line-height: 1;
  font-weight: 900;
}

.metric-value-amount {
  font-size: 1.55rem;
}

.metric-label {
  margin: 0;
  color: #394550;
  font-size: 0.92rem;
  line-height: 1.35;
  font-weight: 600;
}

.metric-card-accent .metric-icon {
  background: rgba(255, 255, 255, 0.25);
}

.metric-card-accent .metric-value,
.metric-card-accent .metric-label {
  color: #ffffff;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .steps-grid,
  .metrics-grid,
  .summary-grid,
  .split-card {
    grid-template-columns: 1fr;
  }

  .summary-image {
    margin: 0 auto;
  }

  .metric-card {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .module-container {
    padding: 0 16px;
  }

  .module-hero,
  .hero-container {
    min-height: 430px;
  }

  .hero-copy {
    padding: 96px 0 44px;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .step-title,
  .step-description {
    min-height: auto;
  }

  .step-image-wrap {
    height: 220px;
  }

  .video-placeholder {
    min-height: 190px;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.94rem;
  }

  .steps-section,
  .summary-section,
  .split-card {
    padding: 16px;
  }

  .play-button {
    width: 76px;
    height: 76px;
    font-size: 1.7rem;
  }

  .metric-value {
    font-size: 1.7rem;
  }

  .metric-value-amount {
    font-size: 1.3rem;
  }
}
</style>