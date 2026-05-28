<template>
  <footer class="pse-footer">
    <div class="footer-container">

      <!-- MARCA -->
      <div class="footer-brand">
        <div class="brand-badge">PSE</div>
        <div class="brand-copy">
          <h3>Portal de Salud Escolar</h3>
          <p>Ministerio de Educación de Guatemala</p>
          <p class="brand-desc">
            Plataforma institucional para centralizar atenciones médicas, suministro de
            medicamentos, orientación telefónica y apoyos a estudiantes del sistema
            educativo nacional.
          </p>
        </div>
      </div>

      <!-- COLUMNAS -->
      <div class="footer-grid">

        <!-- COL 1: INFORMACIÓN INSTITUCIONAL -->
        <div>
          <p class="footer-col-title">Institución</p>
          <ul class="footer-list">
            <li>Ministerio de Educación de Guatemala</li>
            <li>Dirección General de Gestión de Calidad Educativa</li>
            <li>Subdirección de Innovación Educativa</li>
          </ul>
          <p class="footer-col-title mt">Marco legal</p>
          <ul class="footer-list">
            <li>Acuerdo Gubernativo 36-2024</li>
            <li>Acuerdo Ministerial 815-2024</li>
          </ul>
        </div>

        <!-- COL 2: MÓDULOS -->
        <div>
          <p class="footer-col-title">Módulos del portal</p>
          <nav class="footer-nav">
            <RouterLink to="/" class="footer-link">Inicio</RouterLink>
            <RouterLink to="/promocion" class="footer-link">Promoción y Prevención</RouterLink>
            <RouterLink to="/atencion" class="footer-link">Atención a Enfermedades</RouterLink>
            <RouterLink to="/medicamentos" class="footer-link">Suministro de Medicamentos</RouterLink>
            <RouterLink to="/llamadas" class="footer-link">Centro de Llamadas 1528</RouterLink>
            <RouterLink to="/funerarios" class="footer-link">Apoyo Funerario</RouterLink>
          </nav>
        </div>

        <!-- COL 3: CONTACTO Y LEGAL -->
        <div>
          <p class="footer-col-title">Contacto</p>
          <ul class="footer-list">
            <li>
              <span class="footer-label">Correo:</span>
              <a href="mailto:saludescolar@mineduc.gob.gt" class="footer-link-inline">
                saludescolar@mineduc.gob.gt
              </a>
            </li>
          </ul>
          <p class="footer-col-title mt">Información legal</p>
          <nav class="footer-nav">
            <a href="#" class="footer-link">Aviso de privacidad</a>
            <a href="#" class="footer-link">Términos de uso</a>
          </nav>
        </div>

      </div>

      <!-- PIE -->
      <div class="footer-bottom">
        © {{ year }} Ministerio de Educación de Guatemala – Portal de Salud Escolar
      </div>

    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<style scoped>
.pse-footer {
  background: linear-gradient(180deg, #062b4f 0%, #031a33 100%);
  color: #ffffff;
  font-family: 'Montserrat', 'Segoe UI', system-ui, sans-serif;
}

.pse-footer::before {
  content: "";
  display: block;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #17c4e8, #0ea5c6);
}

.footer-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 48px 32px 28px;
}

/* MARCA */
.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.brand-badge {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  background: #17c4e8;
  color: #031a33;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.02em;
}

.brand-copy h3 {
  margin: 0 0 4px;
  font-size: 1.2rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
}

.brand-copy > p:first-of-type {
  margin: 0 0 8px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #60d5f3;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.brand-desc {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.68);
  max-width: 520px;
}

/* GRID */
.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 36px;
}

.footer-col-title {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #60d5f3;
  margin: 0 0 14px;
}

.footer-col-title.mt {
  margin-top: 24px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer-link {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #60d5f3;
}

.footer-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.48);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 2px;
}

.footer-link-inline {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  word-break: break-all;
}

.footer-link-inline:hover {
  color: #60d5f3;
}

/* PIE */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 640px) {
  .footer-container {
    padding: 36px 20px 24px;
  }

  .footer-brand {
    flex-direction: column;
    gap: 14px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-bottom {
    text-align: left;
  }
}
</style>
