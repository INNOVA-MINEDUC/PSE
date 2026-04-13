<template>
  <main class="admin-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-badge">PSE</div>
        <div>
          <p class="brand-title">Portal de Salud Escolar</p>
          <p class="brand-sub">Panel administrativo</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-label">General</p>

        <button class="nav-item active" type="button">
          <span class="nav-icon">▣</span>
          Dashboard
        </button>

        <p class="nav-label mt">Módulos</p>

        <button class="nav-item" type="button" @click="scrollToSection('mod-noticias')">
          <span class="nav-icon">◉</span>
          Noticias y promoción
        </button>

        <button class="nav-item" type="button" @click="scrollToSection('mod-atencion')">
          <span class="nav-icon">◉</span>
          Atención a enfermedades
        </button>

        <button class="nav-item" type="button" @click="scrollToSection('mod-medicamentos')">
          <span class="nav-icon">◉</span>
          Suministro de medicamentos
        </button>

        <button class="nav-item" type="button" @click="scrollToSection('mod-llamadas')">
          <span class="nav-icon">◉</span>
          Centro de llamadas 1528
        </button>

        <button class="nav-item" type="button" @click="scrollToSection('mod-funerario')">
          <span class="nav-icon">◉</span>
          Apoyo funerario
        </button>
      </nav>
    </aside>

    <section class="content">
      <header class="topbar">
        <div>
          <p class="eyebrow">Administración del sistema</p>
          <h1>Panel de administración PSE</h1>
          <p class="subtitle">
            Bienvenida,
            <strong>{{ fullName }}</strong>. Desde aquí se gestiona la información
            que alimenta el portal público.
          </p>
        </div>

        <div class="topbar-actions">
          <div class="user-box">
            <span class="user-label">Fecha</span>
            <strong>{{ currentDate }}</strong>
          </div>

          <div class="user-box">
            <span class="user-label">Rol</span>
            <strong>{{ roleText }}</strong>
          </div>

          <button class="logout-btn" @click="handleLogout">
            Cerrar sesión
          </button>
        </div>
      </header>

      <section class="hero-card">
        <div class="hero-left">
          <div class="avatar">{{ initials }}</div>

          <div>
            <p class="hero-label">Usuario activo</p>
            <h2>{{ fullName }}</h2>
            <p class="hero-email">{{ user?.correoElectronico || "Usuario autenticado" }}</p>
          </div>
        </div>

        <div class="hero-status">
          <span class="status-chip">Administrador PSE</span>
        </div>
      </section>

      <section class="kpi-grid">
        <article class="kpi-card">
          <p class="kpi-title">Noticias activas</p>
          <h3>08</h3>
          <span class="kpi-caption">Contenido visible en inicio</span>
        </article>

        <article class="kpi-card">
          <p class="kpi-title">Atenciones registradas</p>
          <h3>67,456</h3>
          <span class="kpi-caption">Consultas y estudiantes</span>
        </article>

        <article class="kpi-card">
          <p class="kpi-title">Medicamentos entregados</p>
          <h3>80,000</h3>
          <span class="kpi-caption">Unidades reportadas</span>
        </article>

        <article class="kpi-card">
          <p class="kpi-title">Llamadas recibidas</p>
          <h3>2,421</h3>
          <span class="kpi-caption">Datos del centro 1528</span>
        </article>

        <article class="kpi-card">
          <p class="kpi-title">Apoyos funerarios</p>
          <h3>329</h3>
          <span class="kpi-caption">Familias beneficiadas</span>
        </article>
      </section>

      <section class="section-block">
        <div class="section-head">
          <div>
            <h2>Accesos rápidos</h2>
            <p>Selecciona un módulo para editar la información principal.</p>
          </div>
        </div>

        <div class="quick-grid">
          <button class="quick-card" @click="scrollToSection('mod-noticias')">
            <h3>Noticias y promoción</h3>
            <p>Publicar noticias y actividades destacadas del inicio.</p>
          </button>

          <button class="quick-card" @click="scrollToSection('mod-atencion')">
            <h3>Atención a enfermedades</h3>
            <p>Actualizar consultas, estudiantes atendidos y distribución.</p>
          </button>

          <button class="quick-card" @click="scrollToSection('mod-medicamentos')">
            <h3>Suministro de medicamentos</h3>
            <p>Modificar unidades, establecimientos y período de referencia.</p>
          </button>

          <button class="quick-card" @click="scrollToSection('mod-llamadas')">
            <h3>Centro de llamadas 1528</h3>
            <p>Registrar y visualizar el total de llamadas del módulo.</p>
          </button>

          <button class="quick-card" @click="scrollToSection('mod-funerario')">
            <h3>Apoyo funerario</h3>
            <p>Gestionar familias beneficiadas y montos de apoyo económico.</p>
          </button>
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <div>
            <h2>Gestión de datos del portal</h2>
            <p>Formulario base del panel. Luego se conectará a base de datos.</p>
          </div>
        </div>

        <div class="form-grid">
          <article id="mod-noticias" class="module-card">
            <h3>Noticias y acciones de promoción</h3>

            <label>Fecha de la noticia</label>
            <input type="date" />

            <label>Título</label>
            <input type="text" placeholder="Jornada de vacunación en escuela rural" />

            <label>Descripción breve</label>
            <textarea rows="3" placeholder="Resumen corto que aparecerá sobre la imagen."></textarea>

            <label>Tipo de módulo</label>
            <input type="text" value="Promoción y prevención" />

            <label>URL de imagen</label>
            <input type="text" placeholder="https://..." />

            <button class="primary-btn">Guardar noticia</button>
          </article>

          <article id="mod-atencion" class="module-card">
            <h3>Atención a enfermedades</h3>

            <label>Consultas atendidas</label>
            <input type="number" value="67456" />

            <label>Estudiantes atendidos</label>
            <input type="number" value="222704" />

            <div class="split-grid">
              <div>
                <label>% Hombres</label>
                <input type="number" value="52" />
              </div>
              <div>
                <label>% Mujeres</label>
                <input type="number" value="48" />
              </div>
            </div>

            <button class="primary-btn">Guardar cifras</button>
          </article>

          <article id="mod-medicamentos" class="module-card">
            <h3>Suministro de medicamentos</h3>

            <label>Unidades entregadas</label>
            <input type="number" value="80000" />

            <label>Establecimientos con suministro</label>
            <input type="number" value="1350" />

            <label>Período de referencia</label>
            <input type="text" value="enero - julio 2025" />

            <button class="primary-btn">Guardar resumen</button>
          </article>

          <article id="mod-llamadas" class="module-card">
            <h3>Centro de llamadas 1528</h3>

            <label>Total de llamadas</label>
            <input type="number" value="2421" />

            <label>Período de referencia</label>
            <input type="text" value="Datos de ejemplo del prototipo" />

            <button class="primary-btn">Guardar llamadas</button>
          </article>

          <article id="mod-funerario" class="module-card">
            <h3>Apoyo económico funerario</h3>

            <label>Familias beneficiadas</label>
            <input type="number" value="329" />

            <label>Monto total entregado (Q)</label>
            <input type="number" value="2467000" />

            <label>Monto máximo por estudiante (Q)</label>
            <input type="number" value="7500" />

            <div class="split-grid">
              <div>
                <label>Casos masculinos</label>
                <input type="number" value="193" />
              </div>
              <div>
                <label>Casos femeninos</label>
                <input type="number" value="136" />
              </div>
            </div>

            <button class="primary-btn">Guardar apoyo</button>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { API_URL } from "@/env";

const router = useRouter();
const token = localStorage.getItem("token");
const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

const fetchCurrentUser = async () => {
  try {
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error obteniendo usuario:", data);
      return;
    }

    user.value = data.user;
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    console.error("Error cargando usuario actual:", error);
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const fullName = computed(() => {
  const nombres = user.value?.nombres || "Administrador";
  const apellidos = user.value?.apellidos || "PSE";
  return `${nombres} ${apellidos}`.trim();
});

const initials = computed(() => {
  const nombres = user.value?.nombres || "A";
  const apellidos = user.value?.apellidos || "P";
  return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
});

const roleText = computed(() => {
  if (!user.value?.roles?.length) return "Administrador";
  return user.value.roles.map((role) => role.nombre).join(", ");
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

onMounted(() => {
  fetchCurrentUser();
});
</script>

<style scoped>
.admin-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 290px 1fr;
  background: #eef2f7;
}

.sidebar {
  background: linear-gradient(180deg, #0b1d4a 0%, #10275f 100%);
  color: #fff;
  padding: 28px 20px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.14);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.brand-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.brand-sub {
  margin: 4px 0 0;
  font-size: 0.85rem;
  opacity: 0.78;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-label {
  margin: 10px 0 4px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
}

.mt {
  margin-top: 20px;
}

.nav-item {
  width: 100%;
  border: none;
  background: transparent;
  color: #fff;
  text-align: left;
  padding: 12px 14px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: 0.2s ease;
  font-size: 0.95rem;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.12);
}

.nav-icon {
  opacity: 0.85;
}

.content {
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #2563eb;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.topbar h1 {
  margin: 0;
  font-size: 2rem;
  color: #0f172a;
}

.subtitle {
  margin: 10px 0 0;
  color: #64748b;
  line-height: 1.5;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.user-box {
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  min-width: 140px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.user-label {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 4px;
}

.logout-btn {
  border: none;
  background: #dc2626;
  color: #fff;
  padding: 12px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
}

.hero-card {
  background: #fff;
  border-radius: 22px;
  padding: 22px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #2563eb;
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
}

.hero-label {
  margin: 0 0 6px;
  color: #94a3b8;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hero-card h2 {
  margin: 0;
  color: #0f172a;
  font-size: 1.15rem;
}

.hero-email {
  margin: 6px 0 0;
  color: #64748b;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 0.88rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 22px;
}

.kpi-card {
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
}

.kpi-title {
  margin: 0 0 10px;
  color: #64748b;
  font-size: 0.9rem;
}

.kpi-card h3 {
  margin: 0;
  font-size: 1.85rem;
  color: #0f172a;
}

.kpi-caption {
  display: inline-block;
  margin-top: 8px;
  color: #94a3b8;
  font-size: 0.78rem;
}

.section-block {
  background: transparent;
  margin-bottom: 24px;
}

.section-head {
  margin-bottom: 16px;
}

.section-head h2 {
  margin: 0 0 6px;
  color: #0f172a;
}

.section-head p {
  margin: 0;
  color: #64748b;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 8px;
}

.quick-card {
  border: none;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
  transition: transform 0.18s ease;
}

.quick-card:hover {
  transform: translateY(-2px);
}

.quick-card h3 {
  margin: 0 0 8px;
  color: #0f172a;
  font-size: 1rem;
}

.quick-card p {
  margin: 0;
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.45;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.module-card {
  background: #fff;
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-card h3 {
  margin: 0 0 4px;
  color: #0f172a;
  font-size: 1rem;
}

.module-card label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
}

.module-card input,
.module-card textarea {
  width: 100%;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
}

.module-card input:focus,
.module-card textarea:focus {
  border-color: #2563eb;
}

.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.primary-btn {
  margin-top: 6px;
  border: none;
  background: #2563eb;
  color: #fff;
  padding: 12px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  align-self: flex-start;
}

@media (max-width: 1400px) {
  .kpi-grid,
  .quick-grid,
  .form-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    height: auto;
  }
}

@media (max-width: 900px) {
  .kpi-grid,
  .quick-grid,
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .topbar,
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .content {
    padding: 18px;
  }

  .kpi-grid,
  .quick-grid,
  .form-grid,
  .split-grid {
    grid-template-columns: 1fr;
  }
}
</style>