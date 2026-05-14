<template>
  <footer class="pse-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <img :src="logoMineduc" alt="Ministerio de Educación" class="brand-logo" />
        <div>
          <h3>Programa de Salud Escolar</h3>
          <p>Portal institucional de servicios de salud escolar.</p>
        </div>
      </div>

      <div class="footer-grid">
        <div>
          <div class="footer-title">Programa de Salud Escolar</div>
          <div class="footer-list">
            <div class="footer-item">📍 <span>Ministerio de Educación de Guatemala</span></div>
            <div class="footer-item">🏛️ <span>Dirección General de Gestión de Calidad Educativa</span></div>
            <div class="footer-item">💻 <span>Subdirección de Innovación Educativa</span></div>
          </div>
        </div>

        <div>
          <div class="footer-title">Módulos del portal</div>
          <div class="footer-list">
            <RouterLink to="/" class="footer-link">Inicio</RouterLink>
            <RouterLink to="/promocion" class="footer-link">Promoción y prevención</RouterLink>
            <RouterLink to="/atencion" class="footer-link">Atención a enfermedades</RouterLink>
            <RouterLink to="/medicamentos" class="footer-link">Suministro de medicamentos</RouterLink>
            <RouterLink to="/llamadas" class="footer-link">Centro de llamadas 1528</RouterLink>
            <RouterLink to="/funerarios" class="footer-link">Apoyo funerario</RouterLink>
          </div>
        </div>

        <div>
          <div class="footer-title">Información institucional</div>
          <div class="footer-list">
            <div class="footer-item">📄 <span>Acuerdo Gubernativo 36-2024</span></div>
            <div class="footer-item">📄 <span>Acuerdo Ministerial 815-2024</span></div>
            <div class="footer-item">✉️ <span>saludescolar@mineduc.gob.gt</span></div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        © 2026 Ministerio de Educación de Guatemala. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const logoMineduc = '/Home/LOGOS/logo-franja.png'
</script>

<style scoped>
.pse-footer {
  background: linear-gradient(180deg, #062b4f 0%, #031a33 100%);
  color: #ffffff;
  margin-top: 0;
}

.pse-footer::before {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  background: #17c4e8;
}

.footer-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 42px 32px 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 34px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.brand-logo {
  width: 340px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 18px;
}

.footer-brand h3 {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
}

.footer-brand p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.78);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 54px;
}

.footer-title {
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
  color: #60d5f3;
}

.footer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.9rem;
  line-height: 1.45;
}

.footer-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: rgba(255, 255, 255, 0.86);
}

.footer-link {
  color: rgba(255, 255, 255, 0.86);
  text-decoration: none;
}

.footer-link:hover {
  color: #60d5f3;
}

.footer-bottom {
  margin-top: 36px;
  padding-top: 18px;
  text-align: right;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.68);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

@media (max-width: 900px) {
  .footer-brand {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    text-align: left;
  }
}
</style>