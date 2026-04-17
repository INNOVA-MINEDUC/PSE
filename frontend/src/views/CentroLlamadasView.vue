<!-- src/views/CentroLlamadasView.vue -->
<template>
  <main class="llamadas-page">
    <!-- HERO OSCURO -->
    <section 
    class="llamadas-hero">
    
      <div class="hero-inner">
        <div>
          <p class="hero-kicker">MÓDULO 4</p>
          <h1 class="hero-title">Centro de llamadas 1528</h1>
          <p class="hero-text">
            El 1528 es la línea gratuita de orientación médica para estudiantes del sistema
            educativo nacional. A través de este centro se realizan consultas, referencias a
            servicios de salud y coordinación en casos de emergencia.
          </p>
        </div>

        <div class="hero-summary-card">
          <div class="summary-header">
            <div class="summary-icon">
              <span class="headset-icon">🎧</span>
            </div>
            <div>
              <p class="summary-label">Llamadas al 1528</p>
              <p class="summary-value">
                {{ stats.llamadas.toLocaleString('es-GT') }}
              </p>
            </div>
          </div>

          <p class="summary-note">
            Dato de ejemplo para el prototipo. En la versión final se alimentará con los
            registros reales del sistema de llamadas.
          </p>
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

    <!-- CUERPO CLARO -->
    <section class="llamadas-body">
      <div class="llamadas-inner">
        <!-- FILA 1: PASOS + UBICACIÓN/PERSONAL -->
        <div class="row row-top">
          <!-- Pasos para usar la línea -->
          <article class="card card-steps">
            <header class="card-header">
              <div class="avatar-wrapper avatar-big">
                <img :src="avatarOperadora" alt="Operadora 1528" />
              </div>
              <div>
                <h2 class="block-title">¿Cómo funciona la línea 1528?</h2>
                <p class="block-subtitle">
                  Sigue estos pasos cuando necesites orientación por enfermedad o accidente.
                </p>
              </div>
            </header>

            <div class="steps-grid">
              <div class="step-card" v-for="step in pasos" :key="step.numero">
                <div class="step-number">{{ step.numero }}</div>
                <h3 class="step-title">{{ step.titulo }}</h3>
                <p class="step-text">{{ step.descripcion }}</p>
              </div>
            </div>
          </article>

          <!-- Ubicación y personal -->
          <article class="card card-staff">
            <div class="card-header">
              <div>
                <h2 class="block-title">Centro de llamadas 1528</h2>
                <p class="block-subtitle">
                  Equipo médico y gestores de llamadas que atienden a las familias de todo el país.
                </p>
              </div>
              <div class="staff-avatars">
                <div class="avatar-wrapper avatar-big">
                  <img :src="avatarOperadora" alt="Operadora 1528" />
                </div>
                <div class="avatar-wrapper avatar-big">
                  <img :src="avatarOperador" alt="Gestor de llamadas 1528" />
                </div>
              </div>
            </div>

            <div class="staff-block">
              <h3>Personal designado</h3>
              <ul class="staff-list">
                <li>
                  <span class="staff-icon">👶</span>
                  <span>4 médicos pediatras.</span>
                </li>
                <li>
                  <span class="staff-icon">🩺</span>
                  <span>24 médicos generales.</span>
                </li>
                <li>
                  <span class="staff-icon">📞</span>
                  <span>16 gestores de llamadas.</span>
                </li>
                <li>
                  <span class="staff-icon">🧠</span>
                  <span>1 psicólogo.</span>
                </li>
              </ul>
              <p class="staff-note">
                El personal está organizado en turnos fijos y rotativos para garantizar la atención
                continua durante todo el día.
              </p>
            </div>

            <!-- Franja de ubicación alargada -->
            <div class="location-strip">
              <h3>Ubicación del Centro de llamadas</h3>
              <p>
                5ª avenida 13-27 zona 9, Guatemala, Guatemala.<br />
                Dirección del Sistema de Urgencias Médicas,<br />
                Ministerio de Salud Pública y Asistencia Social.
              </p>
            </div>
          </article>
        </div>

        <!-- FILA 2: VIDEO -->
        <div class="row row-video">
          <article class="card card-video">
            <div class="card-header space-between">
              <div>
                <h2 class="block-title">Video: ¿Cuándo llamar al 1528?</h2>
                <p class="block-subtitle">
                  Espacio para incorporar un video explicativo sobre el uso del centro de llamadas
                  y los casos en los que se recomienda llamar.
                </p>
              </div>
            </div>

            <div class="video-placeholder">
              <!-- Aquí luego pueden colocar un <iframe> real de YouTube o similar -->
              <div class="video-thumbnail">
                <span class="play-button">▶</span>
              </div>
              <p class="video-text">
                Área reservada para el video institucional del Programa de Salud Escolar sobre el
                funcionamiento del 1528.
              </p>
            </div>
          </article>
        </div>

        <!-- FILA 3: FLUJO + CASOS QUE SE ATIENDEN -->
        <div class="row row-bottom">
          <!-- Flujo básico de atención -->
          <article class="card">
            <h2 class="block-title">Flujo básico de atención</h2>
            <p class="block-subtitle">
              Recorrido que sigue cada llamada al 1528, desde el primer contacto hasta la referencia
              al servicio de salud.
            </p>

            <ol class="flow-list">
              <li>
                <span class="flow-badge">1</span>
                <div>
                  <h3>Llamada inicial</h3>
                  <p>
                    El padre, madre, tutor o personal educativo llama gratis al
                    <strong> 1528 </strong>
                    para solicitar orientación por enfermedad o accidente.
                  </p>
                </div>
              </li>
              <li>
                <span class="flow-badge">2</span>
                <div>
                  <h3>Evaluación médica</h3>
                  <p>
                    Un médico escucha el caso, realiza preguntas para identificar la gravedad e
                    indica las acciones inmediatas a seguir.
                  </p>
                </div>
              </li>
              <li>
                <span class="flow-badge">3</span>
                <div>
                  <h3>Referencia al servicio de salud</h3>
                  <p>
                    Se orienta a qué puesto, centro de salud, CAP u hospital acudir, según la
                    situación del estudiante.
                  </p>
                </div>
              </li>
              <li>
                <span class="flow-badge">4</span>
                <div>
                  <h3>Coordinación en emergencias</h3>
                  <p>
                    En casos de emergencia, el personal del 1528 coordina directamente con el
                    servicio de salud más cercano para agilizar la atención.
                  </p>
                </div>
              </li>
            </ol>
          </article>

          <!-- Casos que se atienden -->
          <article class="card">
            <h2 class="block-title">¿Qué tipo de casos se atienden?</h2>
            <p class="block-subtitle">
              La línea 1528 brinda orientación médica y referencias en distintos tipos de
              situaciones relacionadas con la salud de las y los estudiantes.
            </p>

            <ul class="cases-list">
              <li>
                <h3>Enfermedades agudas</h3>
                <p>
                  Síntomas como fiebre, dolor abdominal, problemas respiratorios, alergias y otros
                  malestares que requieren orientación médica.
                </p>
              </li>
              <li>
                <h3>Accidentes y golpes</h3>
                <p>
                  Caídas, golpes y otras lesiones ocurridas en la escuela, el hogar o en el camino,
                  para determinar el nivel de urgencia.
                </p>
              </li>
              <li>
                <h3>Emergencias</h3>
                <p>
                  Situaciones que ponen en riesgo la vida o integridad del estudiante, donde se
                  coordina directamente con el servicio de salud más cercano.
                </p>
              </li>
              <li>
                <h3>Dudas sobre a dónde acudir</h3>
                <p>
                  Orientación sobre el <strong>servicio de salud adecuado</strong> según el lugar de
                  residencia y la naturaleza del problema.
                </p>
              </li>
            </ul>

            <div class="callout">
              <p>
                <strong>Recomendación:</strong> Para una atención más ágil, se sugiere
                <strong> llamar primero al 1528</strong>. El personal médico orientará según el caso
                y el servicio de salud disponible.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import avatarOperadora from '@/assets/operadora-1528.png'
import avatarOperador from '@/assets/operador-1528.png'


const bannerCentros = '/Centro-1528/banner/llamadas-banner.jpg'
const logoFranja = '/Home/LOGOS/logo-franja.png'

const stats = {
  llamadas: 24221 // número de ejemplo, luego vendrá del backend
}

const pasos = [
  {
    numero: 1,
    titulo: 'Llama gratis al 1528',
    descripcion:
      'Marca desde cualquier teléfono para iniciar una consulta personalizada sobre la salud del estudiante.'
  },
  {
    numero: 2,
    titulo: 'Habla con el médico',
    descripcion:
      'Si el caso lo requiere, la llamada se traslada a un médico, quien realiza preguntas y evalúa la situación.'
  },
  {
    numero: 3,
    titulo: 'Recibe indicaciones y referencia',
    descripcion:
      'Se indica qué hacer, a qué servicio acudir y, en emergencias, se coordina con el servicio de salud más cercano.'
  }
]
</script>

<style scoped>
.llamadas-page {
  background: #020617;
  color: #f9fafb;
}

/* HERO */
.llamadas-hero {
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

/* Tarjeta resumen */
.hero-summary-card {
  min-width: 320px;
  max-width: 360px;
  background: radial-gradient(circle at top left, #1d4ed8, #020617);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.65);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.summary-icon {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.headset-icon {
  font-size: 1.6rem;
}

.summary-label {
  font-size: 0.8rem;
  color: #c7d2fe;
  margin-bottom: 2px;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.summary-note {
  font-size: 0.75rem;
  color: #c7d2fe;
}

/* BODY */
.llamadas-body {
  background: #f3f4f6; /* gris muy claro / casi blanco */
  padding: 0 0 48px;
}

.llamadas-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 48px 0;
}

.row {
  display: grid;
  gap: 20px;
  margin-bottom: 22px;
}

.row-top {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.4fr);
}

.row-video {
  grid-template-columns: minmax(0, 1fr);
}

.row-bottom {
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.3fr);
}

.card {
  background: #ffffff;
  color: #020617;
  border-radius: 18px;
  padding: 16px 18px 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.card-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.space-between {
  justify-content: space-between;
}

.block-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.block-subtitle {
  font-size: 0.78rem;
  color: #4b5563;
  margin-bottom: 6px;
}

/* Avatares */
.avatar-wrapper {
  border-radius: 999px;
  overflow: hidden;
  background: #e5f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-big {
  width: 110px;
  height: 110px;
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.staff-avatars {
  display: flex;
  gap: 10px;
}

/* Pasos */
.card-steps {
  padding-bottom: 20px;
}

.steps-grid {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.step-card {
  background: #eff6ff;
  border-radius: 14px;
  padding: 10px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-number {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 2px;
}

.step-title {
  font-size: 0.83rem;
  font-weight: 600;
}

.step-text {
  font-size: 0.76rem;
  color: #4b5563;
}

/* Personal y ubicación */
.card-staff h3 {
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.staff-block {
  font-size: 0.78rem;
  color: #4b5563;
  margin-top: 8px;
}

.staff-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 6px;
  display: grid;
  gap: 4px;
}

.staff-list li {
  display: flex;
  align-items: center;
  gap: 6px;
}

.staff-icon {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #e0ebff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.staff-note {
  font-size: 0.76rem;
  color: #6b7280;
  margin-top: 6px;
}

/* Franja de ubicación */
.location-strip {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #e0f2fe;
  border: 1px solid #bfdbfe;
  font-size: 0.78rem;
  color: #1f2937;
}

.location-strip h3 {
  font-size: 0.85rem;
  margin-bottom: 2px;
}

/* VIDEO */
.card-video {
  padding-bottom: 20px;
}

.video-placeholder {
  margin-top: 8px;
  display: grid;
  gap: 8px;
}

.video-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background: radial-gradient(circle at center, #1d4ed8, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.35);
}

.play-button {
  width: 70px;
  height: 70px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.video-text {
  font-size: 0.78rem;
  color: #4b5563;
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


/* FLUJO */
.flow-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: grid;
  gap: 8px;
  font-size: 0.78rem;
}

.flow-list li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px;
  align-items: flex-start;
}

.flow-badge {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-top: 2px;
}

.flow-list h3 {
  font-size: 0.83rem;
  margin-bottom: 2px;
}

/* Casos que se atienden */
.cases-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: grid;
  gap: 8px;
  font-size: 0.78rem;
}

.cases-list h3 {
  font-size: 0.83rem;
  margin-bottom: 2px;
}

.cases-list p {
  color: #4b5563;
}

.callout {
  margin-top: 12px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #eff6ff;
  font-size: 0.78rem;
  color: #1e3a8a;
}

/* Responsive */
@media (max-width: 1100px) {
  .hero-inner {
    flex-direction: column;
  }

  .llamadas-inner {
    padding-inline: 24px;
  }

  .row-top,
  .row-video,
  .row-bottom {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-summary-card {
    width: 100%;
    max-width: none;
  }

  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .llamadas-hero {
    padding-inline: 24px;
  }

  .steps-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
