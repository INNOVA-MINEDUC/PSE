<!-- src/views/FunerariosView.vue -->
<template>
  <main class="module-page">
    <!-- Encabezado del módulo -->
    <section class="module-hero">
      <div class="module-hero-inner">
        <div class="module-hero-text">
          <p class="module-kicker">Módulo 5</p>
          <h1 class="module-title">Apoyo de servicios funerarios</h1>
          <p class="module-intro">
            El Programa de Salud Escolar brinda un aporte económico a las familias de
            estudiantes fallecidos del sistema educativo oficial, para apoyar con los
            gastos funerarios y acompañar el proceso de duelo.
          </p>
        </div>

        <div class="module-hero-box">
          <h2>Objetivo del módulo</h2>
          <ul>
            <li>Otorgar un apoyo económico oportuno a las familias de estudiantes fallecidos.</li>
            <li>Establecer un procedimiento claro y transparente para la gestión del aporte.</li>
            <li>Coordinar con las Direcciones Departamentales y centros educativos la atención de los casos.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FRANJA DE CIFRAS (la imagen que me enviaste, pero en HTML) -->
    <section class="stats-strip">
      <div class="stats-strip-inner">
        <div class="stats-title">
          Aportes económicos a familias de estudiantes fallecidos
        </div>

        <div class="stats-items">
          <div class="stat-item">
            <span class="stat-number">{{ stats.totalApoyos }}</span>
            <span class="stat-label">Casos atendidos</span>
          </div>

          <div class="stat-item">
            <span class="stat-number">{{ stats.masculinos }}</span>
            <span class="stat-label">Masculinos</span>
          </div>

          <div class="stat-item">
            <span class="stat-number stat-female">{{ stats.femeninos }}</span>
            <span class="stat-label">Femeninos</span>
          </div>

          <div class="stat-item">
            <span class="stat-number stat-amount">{{ stats.montoTotal }}</span>
            <span class="stat-label">Monto total</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido principal del módulo -->
    <section class="module-body">
      <div class="module-column">
        <h2>¿En qué consiste el apoyo?</h2>
        <p>
          El aporte económico está dirigido a madres, padres o encargados de estudiantes
          activos en el sistema educativo oficial que hayan fallecido. El apoyo
          se gestiona a través de los centros educativos y las Direcciones Departamentales
          de Educación.
        </p>

        <h3>Requisitos generales</h3>
        <ul class="module-list">
          <li>Formulario de solicitud debidamente llenado y firmado por la dirección del centro educativo.</li>
          <li>Copia del certificado de defunción del estudiante.</li>
          <li>Copia de documento de identificación de la persona beneficiaria.</li>
          <li>Constancia de que el estudiante estaba inscrito en el presente ciclo escolar.</li>
        </ul>

        <h3>Pasos del proceso</h3>
        <ol class="module-list ordered">
          <li>El centro educativo registra el caso y acompaña a la familia en la solicitud.</li>
          <li>La Dirección Departamental revisa y valida la documentación.</li>
          <li>Se autoriza el aporte económico y se notifica a la familia beneficiaria.</li>
        </ol>
      </div>

      <aside class="module-column module-aside">
        <h3>Materiales y descargas</h3>

        <div class="download-card">
          <p class="download-title">Infografía del apoyo funerario</p>
          <p class="download-text">
            Resumen visual del procedimiento y requisitos para acceder al apoyo.
          </p>
          <!-- Cambia el href cuando tengas el PDF real -->
          <a href="#" class="download-link">
            Descargar PDF
          </a>
        </div>

        <div class="download-card">
          <p class="download-title">Formulario de solicitud</p>
          <p class="download-text">
            Versión editable para las Direcciones Departamentales y centros educativos.
          </p>
          <a href="#" class="download-link">
            Descargar formulario
          </a>
        </div>
      </aside>
    </section>

    <!-- Video informativo -->
    <section class="module-video">
      <h2>Video informativo</h2>
      <p class="video-note">
        Aquí puedes insertar el video oficial del programa (YouTube o archivo propio).
      </p>

      <div class="video-wrapper">
        <!-- Ejemplo con iframe de YouTube (reemplaza el src cuando tengas el enlace real) -->
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Video informativo apoyo funerario"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </main>
</template>

<script setup>
const stats = {
  totalApoyos: 329,
  masculinos: 193,
  femeninos: 136,
  montoTotal: 'Q2,467,000',
}
</script>

<style scoped>
.module-page {
  background: #f5f5f7;
  min-height: calc(100vh - 56px);
  padding-bottom: 40px;
}

/* Hero del módulo */
.module-hero {
  padding: 32px 40px 24px;
}

.module-hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.4fr);
  gap: 32px;
}

.module-kicker {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #64748b;
  margin-bottom: 6px;
}

.module-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #0f172a;
}

.module-intro {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}

.module-hero-box {
  background: #e0efff;
  border-radius: 16px;
  padding: 18px 20px;
  font-size: 0.85rem;
  color: #1e293b;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}

.module-hero-box h2 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.module-hero-box ul {
  margin: 0;
  padding-left: 18px;
}

/* Franja de cifras */
.stats-strip {
  background: #2666b3;
  color: #ffffff;
  padding: 12px 0;
}

.stats-strip-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.stats-title {
  font-size: 0.95rem;
  font-weight: 600;
}

.stats-items {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 700;
}

.stat-female {
  color: #ffb3dc;
}

.stat-amount {
  color: #ffe082;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

/* Cuerpo del módulo */
.module-body {
  max-width: 1400px;
  margin: 28px auto 0;
  padding: 0 40px;
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1.2fr);
  gap: 32px;
}

.module-column {
  font-size: 0.9rem;
  color: #374151;
}

.module-column h2 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.module-column h3 {
  font-size: 1rem;
  margin-top: 18px;
  margin-bottom: 6px;
}

.module-list {
  margin: 0;
  padding-left: 18px;
  line-height: 1.5;
}

.module-list.ordered {
  list-style: decimal;
}

/* Aside */
.module-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.download-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
}

.download-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.download-text {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.download-link {
  font-size: 0.8rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

/* Video */
.module-video {
  max-width: 1400px;
  margin: 32px auto 0;
  padding: 0 40px;
}

.module-video h2 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.video-note {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
  background: #000;
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive */
@media (max-width: 960px) {
  .module-hero-inner,
  .module-body {
    grid-template-columns: minmax(0, 1fr);
  }

  .stats-strip-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
