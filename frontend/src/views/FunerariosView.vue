<!-- src/views/FunerariosView.vue -->
<template>
  <main class="fun-page">
    <!-- CABECERA CLARA -->
    <section class="fun-hero">
      <div class="hero-inner">
        <div>
          <p class="hero-kicker">MÓDULO 5</p>
          <h1 class="hero-title">Apoyo de servicios funerarios</h1>
          <p class="hero-text">
            En caso de fallecimiento de un estudiante inscrito en el sistema educativo público,
            el Programa de Salud Escolar (PSE) contempla un aporte económico de hasta
            <strong>Q7,500.00</strong> para apoyar a la familia en los gastos funerarios.
            Este apoyo busca acompañar y aliviar, en lo posible, a las familias en momentos difíciles.
          </p>
        </div>

        <div class="hero-summary-card">
          <div class="hero-summary-row">
            <div class="hero-icon-circle">
              <span>👨‍👩‍👧‍👦</span>
            </div>
            <div>
              <p class="hero-summary-label">Familias beneficiadas</p>
              <p class="hero-summary-value">
                {{ datosFunerarios.totalCasos.toLocaleString('es-GT') }}
              </p>
            </div>
          </div>
          <div class="hero-summary-row">
            <div class="hero-icon-circle">
              <span>💰</span>
            </div>
            <div>
              <p class="hero-summary-label">Monto total entregado (ejemplo)</p>
              <p class="hero-summary-value">
                {{ `Q${datosFunerarios.montoTotal.toLocaleString('es-GT')}` }}
              </p>
            </div>
          </div>
          <div class="hero-summary-row">
            <div class="hero-icon-circle">
              <span>⚖️</span>
            </div>
            <div>
              <p class="hero-summary-label">Monto máximo por estudiante</p>
              <p class="hero-summary-value">Q7,500.00</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CUERPO BLANCO -->
    <section class="fun-body">
      <div class="fun-inner">
        <!-- FRANJA AZUL TIPO INFOGRAFÍA -->
        <section class="band-stats">
          <div class="band-title">
            Aportes económicos a familias de estudiantes fallecidos (datos de ejemplo)
          </div>

          <div class="band-content">
            <div class="band-item">
              <div class="band-icon-circle band-icon-main">
                <span>📊</span>
              </div>
              <div>
                <p class="band-label">Casos atendidos</p>
                <p class="band-value">
                  {{ datosFunerarios.totalCasos.toLocaleString('es-GT') }}
                </p>
              </div>
            </div>

            <div class="band-item band-gender">
              <div class="gender-block">
                <div class="band-icon-circle gender-male">
                  <span>👦</span>
                </div>
                <div>
                  <p class="band-label">Masculinos</p>
                  <p class="band-value-small">
                    {{ datosFunerarios.masculinos.toLocaleString('es-GT') }}
                  </p>
                </div>
              </div>

              <div class="gender-block">
                <div class="band-icon-circle gender-female">
                  <span>👧</span>
                </div>
                <div>
                  <p class="band-label">Femeninos</p>
                  <p class="band-value-small">
                    {{ datosFunerarios.femeninos.toLocaleString('es-GT') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="band-item band-amount">
              <div class="band-icon-circle band-icon-money">
                <span>💵</span>
              </div>
              <div>
                <p class="band-label">Monto total entregado</p>
                <p class="band-value">
                  {{ `Q${datosFunerarios.montoTotal.toLocaleString('es-GT')}` }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- PASOS + VIDEO -->
        <div class="row row-top">
          <!-- PASOS -->
          <div class="card card-steps">
            <h2 class="block-title">Pasos para que recibas el aporte económico</h2>
            <p class="block-subtitle">
              Proceso orientativo basado en la infografía institucional. En la versión final
              se conectará con los formularios y flujos del sistema.
            </p>

            <ol class="steps-list">
              <!-- PASO 1 -->
              <li>
                <div class="step-icon">
                  <span>☎️</span>
                </div>
                <div class="step-content">
                  <div class="step-header">
                    <span class="step-number">1</span>
                    <h3>Llama gratis al 1528 o acude a la Dirección Departamental</h3>
                  </div>
                  <p>
                    Llama sin costo al <strong>1528</strong> para iniciar la consulta,
                    o preséntate al área de información de la
                    <strong>Dirección Departamental de Educación</strong>, donde te indicarán
                    a dónde debes dirigirte para continuar el trámite.
                  </p>
                </div>
              </li>

              <!-- PASO 2 -->
              <li>
                <div class="step-icon">
                  <span>📄</span>
                </div>
                <div class="step-content">
                  <div class="step-header">
                    <span class="step-number">2</span>
                    <h3>Reúne los documentos que debes presentar</h3>
                  </div>
                  <ul class="step-list-inner">
                    <li>Certificado de defunción del estudiante.</li>
                    <li>
                      Fotocopia de DPI y NIT del padre, madre, tutor o encargado (según aplique).
                    </li>
                    <li>
                      Si eres tutor, presentar un documento que te acredite como tal.
                    </li>
                    <li>
                      Si no cuentas con NIT, en la Dirección Departamental de Educación te
                      apoyarán con el trámite.
                    </li>
                  </ul>
                </div>
              </li>

              <!-- PASO 3 -->
              <li>
                <div class="step-icon">
                  <span>⚰️</span>
                </div>
                <div class="step-content">
                  <div class="step-header">
                    <span class="step-number">3</span>
                    <h3>Elige la funeraria y recibe el apoyo económico</h3>
                  </div>
                  <p>
                    Como padre, madre, tutor o encargado, eliges la funeraria de tu conveniencia.
                    El aporte económico para gastos funerarios puede ser de hasta
                    <strong>Q7,500.00</strong> por estudiante. Las personas encargadas deben
                    estar inscritas en el Sistema de Registros Educativos (SIRE).
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <!-- VIDEO + DESCARGAS -->
          <div class="card card-video">
            <h2 class="block-title">Video informativo</h2>
            <p class="block-subtitle">
              Espacio para incrustar un video institucional que explique el apoyo funerario del PSE.
            </p>

            <div class="video-placeholder">
              <!-- Reemplazar por iframe real cuando tengas el video -->
              <!--
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ID_DEL_VIDEO"
                title="Apoyo funerario PSE"
                frameborder="0"
                allowfullscreen
              ></iframe>
              -->
              <div class="video-icon-circle">
                <span>▶</span>
              </div>
              <p class="video-text">
                Aquí podrás ver un video con los pasos y requisitos para solicitar el apoyo económico.
              </p>
            </div>

            <div class="download-actions">
              <!-- Cambia las rutas por tus PDFs reales (colócalos en /public/docs) -->
              <a
                class="btn-outline"
                href="/docs/pse-apoyo-funerario-folleto.pdf"
                target="_blank"
                rel="noopener"
              >
                Descargar folleto PDF
              </a>
              <a
                class="btn-outline"
                href="/docs/pse-apoyo-funerario-formulario.pdf"
                target="_blank"
                rel="noopener"
              >
                Descargar formulario
              </a>
            </div>
          </div>
        </div>

        <!-- REQUISITOS + RESUMEN DEL PROGRAMA -->
        <div class="row row-bottom">
          <div class="card">
            <h2 class="block-title">Requisitos principales</h2>
            <ul class="req-list">
              <li>El estudiante debe estar inscrito en el Sistema de Registros Educativos (SIRE).</li>
              <li>Presentar certificado de defunción del estudiante.</li>
              <li>
                Presentar DPI y NIT del padre, madre, tutor o encargado (o documento que lo acredite).
              </li>
              <li>
                Seguir las indicaciones de la Dirección Departamental de Educación para completar el
                trámite.
              </li>
            </ul>
          </div>

          <div class="card">
            <h2 class="block-title">Resumen del programa</h2>
            <ul class="fact-list">
              <li>El aporte económico puede ser de hasta <strong>Q7,500.00</strong> por estudiante.</li>
              <li>
                La familia elige la funeraria de su conveniencia, de acuerdo con las indicaciones del
                programa.
              </li>
              <li>
                El apoyo se otorga para contribuir a los gastos funerarios derivados del fallecimiento
                del estudiante.
              </li>
              <li>
                El PSE coordina con las Direcciones Departamentales para verificar la información y
                acompañar a la familia durante el proceso.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const datosFunerarios = {
  totalCasos: 329,
  masculinos: 193,
  femeninos: 136,
  montoTotal: 2467000, // Q2,467,000 de ejemplo
}
</script>

<style scoped>
.fun-page {
  background: #f3f4f6;
  color: #020617;
}

/* CABECERA CLARA */
.fun-hero {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 24px 48px 24px;
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
  color: #2563eb;
  margin-bottom: 6px;
}

.hero-title {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-text {
  font-size: 0.9rem;
  color: #374151;
  max-width: 720px;
  line-height: 1.5;
}

/* Tarjeta resumen a la derecha */
.hero-summary-card {
  min-width: 320px;
  max-width: 380px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 18px;
  padding: 18px 20px;
  color: #f9fafb;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.35);
}

.hero-summary-row {
  display: flex;
  gap: 10px;
  align-items: center;
  + .hero-summary-row {
    margin-top: 10px;
  }
}

.hero-icon-circle {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.hero-summary-label {
  font-size: 0.78rem;
  opacity: 0.9;
}

.hero-summary-value {
  font-size: 1.1rem;
  font-weight: 700;
}

/* CUERPO BLANCO / TARJETAS */
.fun-body {
  background: #f3f4f6;
  padding: 0 0 48px;
}

.fun-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 48px 0;
}

/* FRANJA AZUL */
.band-stats {
  background: #1d4ed8;
  color: #f9fafb;
  border-radius: 18px;
  padding: 14px 24px 16px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.45);
  margin-bottom: 24px;
}

.band-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.band-content {
  display: grid;
  grid-template-columns: 1.2fr 1.4fr 1.3fr;
  gap: 18px;
  align-items: center;
}

.band-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.band-icon-circle {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.band-icon-main {
  background: rgba(15, 23, 42, 0.25);
}

.band-icon-money {
  background: rgba(22, 163, 74, 0.2);
}

.gender-male {
  background: rgba(59, 130, 246, 0.25);
}

.gender-female {
  background: rgba(236, 72, 153, 0.25);
}

.band-label {
  font-size: 0.8rem;
  opacity: 0.94;
}

.band-value {
  font-size: 1.2rem;
  font-weight: 700;
}

.band-value-small {
  font-size: 1rem;
  font-weight: 700;
}

.band-gender {
  justify-content: space-between;
}

.gender-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* FILAS Y TARJETAS GENERALES */
.row {
  display: grid;
  gap: 18px;
  margin-bottom: 22px;
}

.row-top {
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.1fr);
}

.row-bottom {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.card {
  background: #ffffff;
  color: #020617;
  border-radius: 18px;
  padding: 16px 18px 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.block-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.block-subtitle {
  font-size: 0.78rem;
  color: #6b7280;
  margin-bottom: 10px;
}

/* PASOS */
.steps-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: grid;
  gap: 12px;
}

.steps-list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #e0ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3px;
}

.step-number {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #2563eb;
  color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.step-header h3 {
  font-size: 0.86rem;
}

.steps-list p {
  font-size: 0.78rem;
  color: #4b5563;
}

.step-list-inner {
  margin: 4px 0 0;
  padding-left: 18px;
  font-size: 0.78rem;
  color: #4b5563;
}

.step-list-inner li + li {
  margin-top: 2px;
}

/* VIDEO */
.card-video {
  display: flex;
  flex-direction: column;
}

.video-placeholder {
  margin-top: 10px;
  border-radius: 16px;
  border: 1px dashed #cbd5f5;
  background: linear-gradient(135deg, #e0f2fe, #eef2ff);
  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
}

.video-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9fafb;
  font-size: 1.7rem;
}

.video-text {
  font-size: 0.8rem;
  text-align: center;
  color: #1f2937;
  max-width: 260px;
}

/* BOTONES DESCARGA */
.download-actions {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-outline {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #2563eb;
  font-size: 0.8rem;
  text-decoration: none;
  color: #2563eb;
  background: #eef2ff;
  transition: background 0.15s ease, color 0.15s ease;
}

.btn-outline:hover {
  background: #2563eb;
  color: #f9fafb;
}

/* LISTAS FINALES */
.req-list,
.fact-list {
  font-size: 0.8rem;
  color: #374151;
  padding-left: 18px;
  margin-top: 8px;
}

.req-list li + li,
.fact-list li + li {
  margin-top: 4px;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .hero-inner {
    flex-direction: column;
  }

  .hero-summary-card {
    width: 100%;
    max-width: none;
  }

  .fun-inner {
    padding-inline: 24px;
  }

  .band-content {
    grid-template-columns: minmax(0, 1fr);
  }

  .row-top,
  .row-bottom {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .fun-hero {
    padding-inline: 24px;
  }
}
</style>
