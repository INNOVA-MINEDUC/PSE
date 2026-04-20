<!-- src/views/CentroLlamadasView.vue -->
<template>
  <main class="llamadas-page">
    <!-- HERO -->
    <section
      class="llamadas-hero"
      :style="{ backgroundImage: `url(${bannerCentros})` }"
    >
      <div class="hero-banner-overlay">
        <div class="hero-inner">
          <div class="hero-content">
            <p class="hero-kicker">MÓDULO 4</p>

            <h1 class="hero-title">
              Centro de <br />
              llamadas 1528
            </h1>

            <p class="hero-text">
              El 1528 es la línea gratuita de orientación médica para estudiantes del
              sistema educativo nacional. A través de este centro se realizan consultas,
              referencias a servicios de salud y coordinación en casos de emergencia.
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
    <section class="llamadas-body">
      <div class="llamadas-inner">
        <!-- ¿CÓMO FUNCIONA? -->
        <section class="section-card section-steps">
          <div class="section-head centered">
            <h2 class="section-title">¿Cómo funciona la línea 1528?</h2>
            <p class="section-subtitle">
              Sigue estos pasos cuando necesites orientación por enfermedad o accidente.
            </p>
          </div>

          <div class="steps-grid">
            <article class="step-card" v-for="step in pasos" :key="step.numero">
              <div class="step-number">{{ step.numero }}</div>
              <h3 class="step-title">{{ step.titulo }}</h3>
              <p class="step-text">{{ step.descripcion }}</p>
              <img :src="step.imagen" :alt="step.titulo" class="step-image" />
            </article>
          </div>
        </section>

        <!-- VIDEO -->
        <section class="section-card video-section">
          <div class="video-box">
            <span class="play-button">▶</span>
          </div>

          <div class="section-head centered video-caption">
            <h2 class="section-title">¿Cuándo llamar al 1528?</h2>
            <p class="section-subtitle">
              Video institucional del Programa de Salud Escolar sobre el funcionamiento del 1528.
            </p>
          </div>
        </section>

        <!-- PERSONAL -->
        <section class="section-personal">
          <div class="section-head centered">
            <h2 class="section-title">Personal designado</h2>
            <p class="section-subtitle">
              El personal está organizado en turnos fijos y rotativos para garantizar la atención
              continua durante todo el día.
            </p>
          </div>

          <div class="staff-grid">
            <article class="staff-card" v-for="item in personal" :key="item.titulo">
              <div class="staff-icon-wrap">
                <img :src="item.icono" :alt="item.titulo" class="staff-icon-img" />
              </div>

              <h3 class="staff-title">{{ item.cantidad }}</h3>
              <p class="staff-text">{{ item.descripcion }}</p>
            </article>
          </div>
        </section>

        <!-- TIPOS DE CASOS -->
        <section class="section-card split-card cases-card">
          <div class="split-text">
            <h2 class="section-title left">¿Qué tipo de casos se atienden?</h2>
            <p class="section-subtitle left">
              La línea 1528 brinda orientación médica y referencias en distintos tipos de
              situaciones relacionadas con la salud de las y los estudiantes.
            </p>

            <ul class="info-list">
              <li>
                <strong>1) Enfermedades agudas:</strong>
                Síntomas como fiebre, dolor abdominal, problemas respiratorios,
                alergias y otros malestares que requieren orientación médica.
              </li>
              <li>
                <strong>2) Accidentes y golpes:</strong>
                Caídas, golpes y otras lesiones ocurridas en la escuela, el hogar o en el
                camino, para determinar el nivel de urgencia.
              </li>
              <li>
                <strong>3) Emergencias:</strong>
                Situaciones que ponen en riesgo la vida o integridad del estudiante,
                donde se coordina directamente con el servicio de salud más cercano.
              </li>
              <li>
                <strong>4) Dudas sobre a dónde acudir:</strong>
                Orientación sobre el servicio de salud adecuado según el lugar de
                residencia y la naturaleza del problema.
              </li>
            </ul>
          </div>

          <div class="split-image-box">
            <img :src="imgCasos" alt="Tipos de casos" class="split-image" />
          </div>
        </section>

        <!-- FLUJO BÁSICO -->
        <section class="split-flow">
          <div class="flow-image-box">
            <img :src="imgFlujo" alt="Flujo básico de atención" class="flow-image" />
          </div>

          <div class="flow-text-box">
            <h2 class="section-title left">Flujo básico de atención</h2>

            <ul class="info-list flow-list">
              <li>
                <strong>1) Llamada inicial:</strong>
                El padre, madre, tutor o personal educativo llama gratis al 1528 para
                solicitar orientación por enfermedad o accidente.
              </li>
              <li>
                <strong>2) Evaluación médica:</strong>
                Un médico escucha el caso, realiza preguntas para identificar la gravedad
                e indica las acciones inmediatas a seguir.
              </li>
              <li>
                <strong>3) Referencia al servicio de salud:</strong>
                Se orienta a qué puesto, centro de salud, CAP u hospital acudir, según
                la situación del estudiante.
              </li>
              <li>
                <strong>4) Coordinación en emergencias:</strong>
                En casos de emergencia, el personal del 1528 coordina directamente con
                el servicio de salud más cercano para agilizar la atención.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
const bannerCentros = '/Centro-1528/banner/llamadas-banner.jpg'
const logoFranja = '/Home/LOGOS/logo-franja.png'

const imgCasos = '/Centro-1528/Tipos-casos.jpg'
const imgFlujo = '/Centro-1528/llamadas-flujo.jpg'

const pasos = [
  {
    numero: 1,
    titulo: 'Llama gratis al 1528',
    descripcion:
      'Marca desde cualquier teléfono para iniciar una consulta personalizada sobre la salud del estudiante.',
    imagen: '/Centro-1528/lamadas-funciona-1.jpg'
  },
  {
    numero: 2,
    titulo: 'Habla con el médico',
    descripcion:
      'Si el caso lo requiere, la llamada se traslada a un médico, quien realiza preguntas y evalúa la situación.',
    imagen: '/Centro-1528/llamadas-funciona-2.jpg'
  },
  {
    numero: 3,
    titulo: 'Recibe indicaciones y referencia',
    descripcion:
      'Se indica qué hacer, a qué servicio acudir y, en emergencias, se coordina con el servicio de salud más cercano.',
    imagen: '/Centro-1528/llamadas-funciona-3.jpg'
  }
]

const personal = [
  {
    titulo: 'Pediatras',
    cantidad: '4 médicos pediatras.',
    descripcion:
      'Médicos profesionales especializados en brindarte la mejor atención.',
    icono: '/Centro-1528/llamadas-icono-pediatra.jpg'
  },
  {
    titulo: 'Médicos generales',
    cantidad: '24 médicos generales.',
    descripcion:
      'El personal está organizado en turnos fijos y rotativos para garantizar la atención continua durante todo el día.',
    icono: '/Centro-1528/llamadas-icono-medicos.jpg'
  },
  {
    titulo: 'Gestores',
    cantidad: '16 gestores de llamadas.',
    descripcion:
      'Equipo médico y gestores de llamadas que atienden a las familias de todo el país.',
    icono: '/Centro-1528/llamadas-icono-gestores.jpg'
  },
  {
    titulo: 'Psicólogo',
    cantidad: '1 psicólogo.',
    descripcion:
      'Descubre qué es el apoyo psicológico, cómo puede ayudarte a gestionar tu bienestar mental y emocional.',
    icono: '/Centro-1528/llamadas-personal-pediatras.jpg'
  }
]
</script>

<style scoped>
.llamadas-page {
  background: #f3f5f7;
}

/* HERO */
.llamadas-hero {
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.hero-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 52, 92, 0.92),
    rgba(0, 52, 92, 0.72),
    rgba(0, 52, 92, 0.15)
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
  font-size: 3.2rem;
  line-height: 0.95;
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
.llamadas-body {
  padding: 22px 0 50px;
}

.llamadas-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  gap: 24px;
}

/* TITULOS GENERALES */
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

.section-title.left,
.section-subtitle.left {
  text-align: left;
}

.section-subtitle {
  color: #5b6470;
  font-size: 0.95rem;
  line-height: 1.45;
  margin: 0;
}

/* TARJETA BASE */
.section-card {
  background: #eef2f4;
  border-radius: 18px;
  padding: 18px 20px 20px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

/* PASOS */
.section-steps {
  background: #eef2f4;
}

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
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 8px;
}

.step-text {
  color: #56606c;
  font-size: 0.88rem;
  line-height: 1.4;
  margin: 0 0 14px;
  min-height: 74px;
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
  padding: 14px 18px 18px;
  margin-bottom: 0;
}

/* PERSONAL */
.section-personal {
  padding: 2px 0 0;
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.staff-card {
  background: #ffffff;
  border: 1.4px solid #154d75;
  border-radius: 12px;
  padding: 16px 14px;
  min-height: 180px;
}

.staff-icon-wrap {
  margin-bottom: 10px;
}

.staff-icon-img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  display: block;
}

.staff-title {
  color: #0b4168;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 800;
  margin: 0 0 8px;
}

.staff-text {
  color: #5b6470;
  font-size: 0.86rem;
  line-height: 1.42;
  margin: 0;
}

/* SPLIT CARD */
.split-card {
  display: grid;
  grid-template-columns: 1.2fr 0.95fr;
  gap: 22px;
  align-items: center;
}

.info-list {
  margin: 14px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 10px;
  color: #39424e;
  font-size: 0.9rem;
  line-height: 1.5;
}

.info-list li::marker {
  color: #0b4168;
}

.split-image-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.split-image {
  width: 100%;
  max-width: 420px;
  border-radius: 14px;
  display: block;
  object-fit: cover;
}

/* FLUJO */
.split-flow {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 28px;
  align-items: start;
}

.flow-image-box {
  background: transparent;
}

.flow-image {
  width: 100%;
  border-radius: 10px;
  display: block;
  object-fit: cover;
}

.flow-text-box {
  padding-top: 6px;
}

.flow-list {
  padding-left: 18px;
  margin-top: 8px;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .steps-grid,
  .staff-grid,
  .split-card,
  .split-flow {
    grid-template-columns: 1fr;
  }

  .staff-card {
    min-height: auto;
  }

  .split-image {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 110px 20px 44px;
  }

  .llamadas-inner {
    padding: 0 16px;
  }

  .logo-franja-img {
    padding: 10px 16px 14px;
  }

  .hero-title {
    font-size: 2.45rem;
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
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.1rem;
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
}
</style>