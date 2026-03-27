<template>
  <main class="page">
    <section class="hero">
      <div class="hero-content">
        <p class="hero-kicker">
          ACUERDO GUBERNATIVO 36-2024 Y ACUERDO MINISTERIAL 815-2024
        </p>

        <h1 class="hero-title">Portal de Salud PSE</h1>

        <p class="hero-desc">
          Plataforma del Ministerio de Educación para centralizar atenciones médicas,
          llamadas, suministro de medicamentos, promoción de la salud y apoyos
          funerarios para estudiantes del sistema educativo nacional.
        </p>
      </div>
    </section>

    <section class="logo-franja">
      <img
        class="logo-franja-img"
        :src="logoFranja"
        alt="Franja de logos institucionales"
      />
    </section>

    <section class="beneficios">
      <div class="section-shell">
        <div class="beneficios-wrapper">
          <h2 class="section-title beneficios-title">Beneficios del PSE</h2>

          <p class="section-text beneficios-text">
            El Portal de Salud PSE del Ministerio de Educación es una plataforma integral diseñada para
            garantizar el bienestar de los estudiantes del sistema educativo nacional, centralizando
            servicios médicos, apoyo preventivo y asistencia en momentos críticos.
          </p>

          <div class="modulos-area">
            <button class="slider-arrow slider-arrow-left" type="button">‹</button>

            <div class="modulos-grid">
              <article v-for="modulo in modulos" :key="modulo.id" class="modulo-card">
                <div class="modulo-image-wrap">
                  <img :src="modulo.imagen" :alt="modulo.titulo" class="modulo-image" />
                </div>

                <div class="modulo-overlay"></div>

                <div class="modulo-body">
                  <p class="modulo-id">MÓDULO {{ modulo.id }}</p>
                  <h3 class="modulo-title">{{ modulo.titulo }}</h3>
                  <p class="modulo-desc">{{ modulo.descripcion }}</p>
                  <button class="modulo-btn">Más información</button>
                </div>
              </article>
            </div>

            <button class="slider-arrow slider-arrow-right" type="button">›</button>
          </div>

          <div class="resultados-wrap">
            <div class="resultados-grid-top">
              <article
                v-for="(resultado, index) in resultadosTop"
                :key="'top-' + index"
                class="resultado-card"
              >
                <p class="resultado-tag">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultado.titulo }}</h3>
                <p class="resultado-meta">{{ resultado.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, itemIndex) in resultado.items"
                    :key="itemIndex"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">
                      {{ item.icono }}
                    </span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultado.footer }}</p>
              </article>
            </div>

            <div class="resultados-grid-bottom">
              <article class="resultado-card">
                <p class="resultado-tag">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultadoBottom1.titulo }}</h3>
                <p class="resultado-meta">{{ resultadoBottom1.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, index) in resultadoBottom1.items"
                    :key="index"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">
                      {{ item.icono }}
                    </span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultadoBottom1.footer }}</p>
              </article>

              <article class="resultado-card resultado-card-dark">
                <p class="resultado-tag resultado-tag-cyan">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultadoBottom2.titulo }}</h3>
                <p class="resultado-meta">{{ resultadoBottom2.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, index) in resultadoBottom2.items"
                    :key="index"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">
                      {{ item.icono }}
                    </span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultadoBottom2.footer }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const logoFranja = '/Home/LOGOS/logo-franja.png'

const modulos = [
  {
    id: 1,
    titulo: 'Promoción y Prevención',
    descripcion: 'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    imagen: '/Home/IMAGENES/noticia-jornada-salud.png'
  },
  {
    id: 2,
    titulo: 'Atención a enfermedades',
    descripcion: 'Registro de atenciones médicas y seguimiento de casos de las y los estudiantes.',
    imagen: '/Home/IMAGENES/noticia-virus.png'
  },
  {
    id: 3,
    titulo: 'Suministro de medicamentos',
    descripcion: 'Inventario y distribución de medicamentos del programa a los establecimientos.',
    imagen: '/Home/IMAGENES/mod-medicamentos.png'
  },
  {
    id: 4,
    titulo: 'Centro de llamadas 1528',
    descripcion: 'Llamadas recibidas, derivaciones y seguimiento de casos relacionados con PSE.',
    imagen: '/Home/IMAGENES/mod-llamadas.png'
  },
  {
    id: 5,
    titulo: 'Apoyo funerario',
    descripcion: 'Gestión y apoyo en casos funerarios para estudiantes del sistema educativo nacional.',
    imagen: '/Home/IMAGENES/noticia-vacunacion.png'
  }
]

const resultadosTop = [
  {
    titulo: 'Atención a enfermedades',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '🧑‍⚕️', label: 'Consultas atendidas:', valor: '674,656' },
      { icono: '👩', label: 'Estudiante con suministro:', valor: '222,704' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  },
  {
    titulo: 'Suministro de medicamentos',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '💊', label: 'Unidades entregadas:', valor: '674,656' },
      { icono: '🏥', label: 'Establecimientos con suministro:', valor: '222,704' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  },
  {
    titulo: 'Centro de llamadas 1528',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '🎧', label: 'Llamadas registradas:', valor: '24,221' },
      { icono: '📋', label: 'Casos atendidos:', valor: '329' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  }
]

const resultadoBottom1 = {
  titulo: 'Apoyo económico funerario',
  periodo: 'Periodo de referencia: enero – julio 2025',
  items: [
    { icono: '👨‍👩‍👧', label: 'Familias beneficiadas:', valor: '329' },
    { icono: '💰', label: 'Monto máximo por estudiante:', valor: 'Q7,500.00' }
  ],
  footer: 'Hombres 52% · Mujeres 48%'
}

const resultadoBottom2 = {
  titulo: 'Aportes a familias',
  periodo: 'Periodo de referencia: enero – julio 2025',
  items: [
    { icono: '👦', label: 'Masculinos:', valor: '193' },
    { icono: '👧', label: 'Femeninos:', valor: '136' }
  ],
  footer: 'Monto total entregado: Q2,467,000'
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

/* HERO */
.hero {
  position: relative;
  min-height: 680px;
  height: 74vh;
  max-height: 780px;
  background-image: url('/Home/RECURSOS/hero-min.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.hero-content {
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  padding: 0 72px;
}

.hero-kicker {
  margin: 0 0 18px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 224, 255, 0.6);
  max-width: 760px;
}

.hero-title {
  margin: 0 0 18px;
  font-size: clamp(56px, 5vw, 90px);
  line-height: 1;
  font-weight: 900;
  color: #ffffff;
  max-width: 760px;
}

.hero-desc {
  margin: 0;
  max-width: 620px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.94);
}

/* FRANJA */
.logo-franja {
  background: #ffffff;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  padding: 10px 56px 14px;
}

/* GENERALES */
.section-shell {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 28px;
}

.section-title {
  margin: 0 0 14px;
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 800;
  color: #10233f;
  text-align: center;
}

.section-text {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
  line-height: 1.7;
  color: #4b5c77;
}

/* BENEFICIOS */
.beneficios {
  padding: 12px 0 44px;
  background: #ffffff;
}

.beneficios-wrapper {
  background: #eaf0f4;
  border-radius: 24px;
  padding: 36px 34px 34px;
  max-width: 1580px;
  margin: 0 auto;
}

.beneficios-title {
  margin-bottom: 12px;
}

.beneficios-text {
  max-width: 820px;
  font-size: 14px;
  line-height: 1.6;
  color: #26496f;
  margin-bottom: 24px;
}

/* MODULOS */
.modulos-area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
}

.modulos-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(220px, 1fr));
  gap: 14px;
}

.slider-arrow {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #d4dce5;
  background: #ffffff;
  color: #7b8ea5;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(16, 35, 63, 0.08);
  flex-shrink: 0;
}

.modulo-card {
  position: relative;
  min-height: 260px;
  border-radius: 10px;
  overflow: hidden;
  background: #0a4675;
}

.modulo-image-wrap {
  position: absolute;
  inset: 0;
}

.modulo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.modulo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(7, 62, 105, 0.12) 0%,
    rgba(8, 63, 106, 0.62) 52%,
    rgba(6, 56, 95, 0.96) 100%
  );
}

.modulo-body {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 112px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}

.modulo-id {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 800;
  color: #17c4e8;
  text-transform: uppercase;
}

.modulo-title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.1;
  font-weight: 800;
  color: #ffffff;
}

.modulo-desc {
  margin: 0 0 12px;
  font-size: 11px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.92);
}

.modulo-btn {
  align-self: center;
  border: 1px solid rgba(23, 196, 232, 0.8);
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
}

/* RESULTADOS */
.resultados-wrap {
  margin-top: 18px;
}

.resultados-grid-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.resultados-grid-bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 470px));
  justify-content: center;
  gap: 18px;
  margin-top: 18px;
}

.resultado-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.08);
  min-height: 245px;
}

.resultado-card-dark {
  background: #034876;
}

.resultado-tag {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 11px;
  border-radius: 4px;
  background: #0a4675;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.resultado-tag-cyan {
  background: #18c6e8;
}

.resultado-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 800;
  color: #16365f;
}

.resultado-card-dark .resultado-title {
  color: #ffffff;
}

.resultado-meta {
  margin: 0 0 16px;
  font-size: 12px;
  color: #60728a;
}

.resultado-card-dark .resultado-meta {
  color: rgba(255, 255, 255, 0.84);
}

.resultado-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resultado-line {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.resultado-emoji {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(10, 70, 117, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.resultado-card-dark .resultado-emoji {
  background: rgba(255, 255, 255, 0.15);
}

.resultado-copy {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: baseline;
}

.resultado-label {
  margin: 0;
  font-size: 13px;
  color: #35577d;
}

.resultado-value {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: #16365f;
}

.resultado-card-dark .resultado-label,
.resultado-card-dark .resultado-value {
  color: #ffffff;
}

.resultado-footer {
  margin: 18px 0 0;
  padding-top: 12px;
  border-top: 1px solid #dbe3eb;
  font-size: 12px;
  color: #5f7188;
}

.resultado-card-dark .resultado-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.84);
}

/* RESPONSIVE */
@media (max-width: 1400px) {
  .modulos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .hero {
    min-height: 600px;
  }

  .hero-content {
    padding: 0 30px;
  }

  .hero-title {
    font-size: clamp(44px, 5vw, 66px);
  }

  .hero-desc {
    font-size: 16px;
  }

  .logo-franja-img {
    padding: 10px 30px 14px;
  }

  .modulos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .resultados-grid-top {
    grid-template-columns: 1fr;
  }

  .resultados-grid-bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .hero {
    min-height: 520px;
    height: auto;
    padding: 60px 0;
    background-position: 70% center;
  }

  .hero-content {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 420px;
    padding: 40px 0;
    background-position: 72% center;
  }

  .hero-content {
    padding: 0 16px;
  }

  .hero-kicker {
    font-size: 11px;
    line-height: 1.5;
  }

  .hero-title {
    font-size: 38px;
  }

  .hero-desc {
    font-size: 14px;
  }

  .logo-franja-img {
    padding: 10px 18px;
  }

  .section-shell {
    padding: 0 16px;
  }

  .beneficios-wrapper {
    padding: 24px 16px;
  }

  .slider-arrow {
    display: none;
  }

  .modulos-grid,
  .resultados-grid-top,
  .resultados-grid-bottom {
    grid-template-columns: 1fr;
  }

  .modulo-card {
    min-height: 230px;
  }
}
</style>