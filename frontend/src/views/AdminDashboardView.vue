<template>
  <main class="admin-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-badge">PSE</div>
        <div>
          <p class="brand-name">Portal Salud Escolar</p>
          <p class="brand-sub">Panel administrativo</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-label">General</p>

        <button
          class="nav-item"
          :class="{ active: activeModule === 'dashboard' }"
          @click="go('dashboard')"
        >
          <span class="nav-sq"></span>
          Dashboard
        </button>

        <p class="nav-label mt">Módulos</p>

        <button
          v-for="m in modules"
          :key="m.key"
          class="nav-item"
          :class="{ active: activeModule === m.key }"
          @click="go(m.key)"
        >
          <span class="nav-dot" :class="{ active: activeModule === m.key }"></span>
          {{ m.label }}
        </button>
      </nav>
    </aside>

    <div class="main">
      <header class="topbar">
        <div>
          <p class="eyebrow">Administración del sistema</p>
          <h1>{{ currentTitle }}</h1>
        </div>

        <div class="topbar-right">
          <div class="info-pill">
            <span class="pill-label">Fecha</span>
            <strong>{{ currentDate }}</strong>
          </div>

          <div class="info-pill">
            <span class="pill-label">Rol</span>
            <strong>{{ roleText }}</strong>
          </div>

          <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
        </div>
      </header>

      <div class="content">
        <template v-if="activeModule === 'dashboard'">
          <section class="hero-card">
            <div class="hero-left">
              <div class="avatar">{{ initials }}</div>
              <div>
                <p class="hero-role-label">Usuario activo</p>
                <p class="hero-name">{{ fullName }}</p>
                <p class="hero-email">
                  {{ user?.correoElectronico || "Usuario autenticado" }}
                </p>
              </div>
            </div>

            <span class="chip">Administrador PSE</span>
          </section>

          <section class="dashboard-card">
            <div class="section-heading">
              <div>
                <p class="section-title">Resumen del sistema</p>
                <p class="section-sub">Indicadores conectados a la base de datos.</p>
              </div>
            </div>

            <div class="kpi-row">
              <article
                v-for="kpi in kpiCards"
                :key="kpi.key"
                class="kpi"
                @click="go(kpi.key)"
              >
                <div class="kpi-top">
                  <span class="kpi-icon" :style="{ background: kpi.softColor }">
                    {{ kpi.icon }}
                  </span>
                </div>

                <p class="kpi-label">{{ kpi.label }}</p>
                <h3 class="kpi-val">{{ loadingKpis ? "…" : formatNum(kpi.value) }}</h3>

                <p class="kpi-cap">
                  <span class="kpi-dot-color" :style="{ background: kpi.color }"></span>
                  {{ kpi.caption }}
                </p>
              </article>
            </div>
          </section>

          <section class="dashboard-card">
            <div class="section-heading">
              <div>
                <p class="section-title">Accesos rápidos</p>
                <p class="section-sub">Selecciona un módulo para administrarlo.</p>
              </div>
            </div>

            <div class="quick-row">
              <button
                v-for="m in modules"
                :key="m.key"
                class="quick-card"
                @click="go(m.key)"
              >
                <span class="quick-icon">{{ m.icon }}</span>
                <h3>{{ m.label }}</h3>
                <p>{{ m.desc }}</p>
              </button>
            </div>
          </section>
        </template>

        <template v-if="activeModule === 'noticias'">
          <section class="dashboard-card">
            <div class="mod-header">
              <div>
                <p class="section-title">Noticias y acciones de promoción</p>
                <p class="section-sub">
                  Las noticias activas alimentarán el inicio y el módulo de promoción.
                </p>
              </div>

              <button class="add-btn" @click="openModal(null)">+ Nueva noticia</button>
            </div>

            <div class="table-wrap" v-if="!loadingNoticias">
              <div class="tab-row">
                <button
                  v-for="t in ['Todas', 'Activas', 'Inactivas']"
                  :key="t"
                  class="tab"
                  :class="{ active: noticiaTab === t }"
                  @click="noticiaTab = t"
                >
                  {{ t }}
                  <span class="tab-count">{{ tabCount(t) }}</span>
                </button>
              </div>

              <table class="data-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Módulo</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="n in noticiasFiltradas" :key="n.id">
                    <td>
                      <img
                        v-if="n.imagen_url"
                        :src="resolveUrl(n.imagen_url)"
                        class="thumb"
                        alt=""
                      />
                      <div v-else class="thumb-empty"></div>
                    </td>

                    <td class="td-title">{{ n.titulo }}</td>

                    <td>
                      <span class="badge blue">{{ getModuloLabel(n.modulo) }}</span>
                    </td>

                    <td class="td-muted">
                      {{ n.fecha_publicacion ? fmtDate(n.fecha_publicacion) : "—" }}
                    </td>

                    <td>
                      <span class="badge" :class="Number(n.activo) ? 'green' : 'gray'">
                        {{ Number(n.activo) ? "Activa" : "Inactiva" }}
                      </span>
                    </td>

                    <td>
                      <div class="td-actions">
                        <button class="act-btn" @click="openModal(n)">Editar</button>
                        <button class="act-btn danger" @click="deleteNoticia(n.id)">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="!noticiasFiltradas.length">
                    <td colspan="6" class="empty-row">No hay noticias registradas.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-else class="loading-state">Cargando noticias…</div>
          </section>

          <div class="modal-overlay" v-if="modal.open" @click.self="modal.open = false">
            <div class="modal-card">
              <h3>{{ modal.data.id ? "Editar noticia" : "Nueva noticia" }}</h3>

              <div class="field">
                <label>Título</label>
                <input v-model="modal.data.titulo" type="text" />
              </div>

              <div class="field">
                <label>Descripción breve</label>
                <textarea v-model="modal.data.descripcion_corta" rows="3"></textarea>
              </div>

              <div class="field">
                <label>Módulo</label>
                <select v-model="modal.data.modulo">
                  <option value="promocion">Promoción y prevención</option>
                  <option value="atencion">Atención a enfermedades</option>
                  <option value="medicamentos">Suministro de medicamentos</option>
                  <option value="llamadas">Centro de llamadas 1528</option>
                  <option value="funerario">Apoyo funerario</option>
                </select>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Fecha</label>
                  <input v-model="modal.data.fecha_publicacion" type="date" />
                </div>

                <div class="field">
                  <label>Orden</label>
                  <input v-model.number="modal.data.orden" type="number" min="0" />
                </div>

                <div class="field">
                  <label>Estado</label>
                  <select v-model.number="modal.data.activo">
                    <option :value="1">Activa</option>
                    <option :value="0">Inactiva</option>
                  </select>
                </div>
              </div>


              <div class="field">
                <label>Imagen</label>
                <input type="file" accept="image/*" @change="onImageChange" />
                <div v-if="modal.data.imagen_url" style="margin-top:8px;">
                  <img :src="resolveUrl(modal.data.imagen_url)" alt="Imagen subida" style="max-width:120px;max-height:80px;border-radius:6px;" />
                </div>
                <input
                  v-model="modal.data.imagen_url"
                  type="text"
                  placeholder="/uploads/noticias/demo.jpg o https://..."
                  style="margin-top:8px;"
                />
              </div>

              <p v-if="modal.error" class="form-error">{{ modal.error }}</p>

              <div class="modal-actions">
                <button class="secondary-btn" @click="modal.open = false">Cancelar</button>
                <button class="add-btn" :disabled="savingNoticia" @click="saveNoticia">
                  {{ savingNoticia ? "Guardando…" : "Guardar" }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeModule === 'atencion'">
          <section class="dashboard-card form-card">
            <p class="section-title">Atención a enfermedades</p>
            <p class="section-sub">Vista inicial conectada a indicadores generales.</p>

            <div class="field-row">
              <div class="field">
                <label>Consultas atendidas</label>
                <input :value="formatNum(rawKpis.atenciones)" readonly />
              </div>

              <div class="field">
                <label>Estudiantes atendidos</label>
                <input :value="formatNum(rawKpis.estudiantes)" readonly />
              </div>
            </div>

            <p class="form-hint">
              La edición avanzada por departamento y mapa queda para la siguiente fase.
            </p>
          </section>
        </template>

        <template v-if="activeModule === 'medicamentos'">
          <section class="dashboard-card form-card">
            <p class="section-title">Suministro de medicamentos</p>
            <p class="section-sub">Vista inicial conectada a indicadores generales.</p>

            <div class="field">
              <label>Medicamentos entregados</label>
              <input :value="formatNum(rawKpis.medicamentos)" readonly />
            </div>

            <p class="form-hint">
              La edición avanzada por departamento queda para la siguiente fase.
            </p>
          </section>
        </template>

        <template v-if="activeModule === 'llamadas'">
          <section class="dashboard-card form-card">
            <p class="section-title">Centro de llamadas 1528</p>
            <p class="section-sub">Vista inicial conectada a indicadores generales.</p>

            <div class="field">
              <label>Llamadas registradas</label>
              <input :value="formatNum(rawKpis.llamadas)" readonly />
            </div>

            <div class="field">
              <label>URL de video institucional</label>
              <input placeholder="Pendiente de conectar en fase siguiente" readonly />
            </div>
          </section>
        </template>

        <template v-if="activeModule === 'funerario'">
          <section class="dashboard-card form-card">
            <p class="section-title">Apoyo funerario</p>
            <p class="section-sub">Vista inicial conectada a indicadores generales.</p>

            <div class="field">
              <label>Familias beneficiadas</label>
              <input :value="formatNum(rawKpis.funerario)" readonly />
            </div>

            <div class="field">
              <label>Documentos PDF</label>
              <input placeholder="Carga de documentos pendiente para fase siguiente" readonly />
            </div>
          </section>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// Subida de imagen para noticias
const onImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("imagen", file);
  try {
    const res = await fetch(`${API_URL}/api/admin/noticias/upload`, {
      method: "POST",
      body: formData,
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });
    const data = await res.json();
    if (data.success && data.url) {
      modal.value.data.imagen_url = data.url;
      modal.value.error = "";
    } else {
      modal.value.error = data.error || "Error al subir la imagen.";
    }
  } catch (err) {
    modal.value.error = "Error de red al subir la imagen.";
  }
};
import { useRouter } from "vue-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const router = useRouter();

const token = localStorage.getItem("token");
const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
const activeModule = ref("dashboard");

const modules = [
  {
    key: "noticias",
    label: "Noticias y promoción",
    icon: "📰",
    desc: "Gestionar noticias visibles en el portal.",
    color: "#2563eb",
  },
  {
    key: "atencion",
    label: "Atención a enfermedades",
    icon: "🏥",
    desc: "Consultar métricas de atenciones.",
    color: "#16a34a",
  },
  {
    key: "medicamentos",
    label: "Suministro de medicamentos",
    icon: "💊",
    desc: "Consultar unidades entregadas.",
    color: "#d97706",
  },
  {
    key: "llamadas",
    label: "Centro de llamadas 1528",
    icon: "📞",
    desc: "Consultar datos del centro 1528.",
    color: "#7c3aed",
  },
  {
    key: "funerario",
    label: "Apoyo funerario",
    icon: "🤝",
    desc: "Consultar apoyos registrados.",
    color: "#db2777",
  },
];

const pageTitles = {
  dashboard: "Panel de administración PSE",
  noticias: "Noticias y promoción",
  atencion: "Atención a enfermedades",
  medicamentos: "Suministro de medicamentos",
  llamadas: "Centro de llamadas 1528",
  funerario: "Apoyo funerario",
};

const currentTitle = computed(() => pageTitles[activeModule.value] || "Panel PSE");

const go = (key) => {
  activeModule.value = key;
};

const authHeaders = computed(() => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : "",
}));

const resolveUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
};

const formatNum = (n) => Number(n || 0).toLocaleString("es-GT");

const fmtDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getModuloLabel = (modulo) => {
  const labels = {
    promocion: "Promoción y prevención",
    atencion: "Atención",
    medicamentos: "Medicamentos",
    llamadas: "Llamadas 1528",
    funerario: "Funerario",
  };

  return labels[modulo] || modulo || "General";
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

const currentDate = computed(() =>
  new Date().toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const fetchUser = async () => {
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: authHeaders.value,
    });

    const data = await res.json();

    if (data.success) {
      user.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (error) {
    console.error("Error cargando usuario:", error);
  }
};

const loadingKpis = ref(true);
const rawKpis = ref({
  noticias_activas: 0,
  atenciones: 0,
  estudiantes: 0,
  medicamentos: 0,
  llamadas: 0,
  funerario: 0,
});

const kpiCards = computed(() => [
  {
    key: "noticias",
    label: "Noticias activas",
    value: rawKpis.value.noticias_activas,
    caption: "Visible en inicio",
    color: "#2563eb",
    softColor: "#dbeafe",
    icon: "📰",
  },
  {
    key: "atencion",
    label: "Atenciones",
    value: rawKpis.value.atenciones,
    caption: "Consultas registradas",
    color: "#16a34a",
    softColor: "#dcfce7",
    icon: "🏥",
  },
  {
    key: "medicamentos",
    label: "Medicamentos",
    value: rawKpis.value.medicamentos,
    caption: "Unidades entregadas",
    color: "#d97706",
    softColor: "#fef3c7",
    icon: "💊",
  },
  {
    key: "llamadas",
    label: "Llamadas",
    value: rawKpis.value.llamadas,
    caption: "Centro 1528",
    color: "#7c3aed",
    softColor: "#ede9fe",
    icon: "📞",
  },
  {
    key: "funerario",
    label: "Apoyos funerarios",
    value: rawKpis.value.funerario,
    caption: "Familias beneficiadas",
    color: "#db2777",
    softColor: "#fce7f3",
    icon: "🤝",
  },
]);

const fetchKpis = async () => {
  loadingKpis.value = true;

  try {
    const res = await fetch(`${API_URL}/api/kpis`);
    const data = await res.json();

    if (data.success) {
      rawKpis.value = data.data;
    }
  } catch (error) {
    console.error("Error cargando KPIs:", error);
  } finally {
    loadingKpis.value = false;
  }
};

const noticias = ref([]);
const loadingNoticias = ref(false);
const savingNoticia = ref(false);
const noticiaTab = ref("Todas");

const modal = ref({
  open: false,
  data: {},
  error: "",
});

const noticiasFiltradas = computed(() => {
  if (noticiaTab.value === "Activas") {
    return noticias.value.filter((n) => Number(n.activo));
  }

  if (noticiaTab.value === "Inactivas") {
    return noticias.value.filter((n) => !Number(n.activo));
  }

  return noticias.value;
});

const tabCount = (tab) => {
  if (tab === "Todas") return noticias.value.length;
  if (tab === "Activas") return noticias.value.filter((n) => Number(n.activo)).length;
  return noticias.value.filter((n) => !Number(n.activo)).length;
};

const fetchNoticias = async () => {
  loadingNoticias.value = true;

  try {
    const res = await fetch(`${API_URL}/api/noticias`);
    const data = await res.json();

    if (data.success) {
      noticias.value = data.data;
    }
  } catch (error) {
    console.error("Error cargando noticias:", error);
  } finally {
    loadingNoticias.value = false;
  }
};

const openModal = (noticia) => {
  modal.value = {
    open: true,
    error: "",
    data: noticia
      ? {
          ...noticia,
          fecha_publicacion: noticia.fecha_publicacion
            ? String(noticia.fecha_publicacion).slice(0, 10)
            : new Date().toISOString().slice(0, 10),
          activo: Number(noticia.activo ?? 1),
          orden: Number(noticia.orden ?? 0),
        }
      : {
          titulo: "",
          descripcion_corta: "",
          imagen_url: "",
          fecha_publicacion: new Date().toISOString().slice(0, 10),
          modulo: "promocion",
          activo: 1,
          orden: 0,
        },
  };
};

const saveNoticia = async () => {
  const noticia = modal.value.data;

  if (!noticia.titulo) {
    modal.value.error = "El título es requerido.";
    return;
  }

  savingNoticia.value = true;
  modal.value.error = "";

  try {
    const isEdit = Boolean(noticia.id);
    const url = isEdit
      ? `${API_URL}/api/admin/noticias/${noticia.id}`
      : `${API_URL}/api/admin/noticias`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: authHeaders.value,
      body: JSON.stringify(noticia),
    });

    const data = await res.json();

    if (!data.success) {
      modal.value.error = data.error || "Error al guardar la noticia.";
      return;
    }

    modal.value.open = false;
    await fetchNoticias();
    await fetchKpis();
  } catch (error) {
    console.error("Error guardando noticia:", error);
    modal.value.error = "Error de red al guardar.";
  } finally {
    savingNoticia.value = false;
  }
};

const deleteNoticia = async (id) => {
  if (!confirm("¿Eliminar esta noticia?")) return;

  try {
    const res = await fetch(`${API_URL}/api/admin/noticias/${id}`, {
      method: "DELETE",
      headers: authHeaders.value,
    });

    const data = await res.json();

    if (data.success) {
      await fetchNoticias();
      await fetchKpis();
    }
  } catch (error) {
    console.error("Error eliminando noticia:", error);
  }
};

watch(activeModule, (module) => {
  if (module === "noticias") fetchNoticias();
});

onMounted(() => {
  fetchUser();
  fetchKpis();
  fetchNoticias();
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.admin-shell {
  display: grid;
  grid-template-columns: 270px 1fr;
  min-height: 100vh;
  font-family: "Montserrat", "Segoe UI", system-ui, sans-serif;
  background: #edf3f8;
}

.sidebar {
  background:
    radial-gradient(circle at top left, rgba(23, 196, 232, 0.18), transparent 38%),
    linear-gradient(180deg, #071a40 0%, #0e2a5c 100%);
  color: #fff;
  padding: 28px 22px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 18px 0 40px rgba(15, 23, 42, 0.16);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 14px;
}

.brand-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #17c4e8, #ffffff);
  color: #071a40;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 16px;
  box-shadow: 0 18px 28px rgba(23, 196, 232, 0.18);
}

.brand-name {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
}

.brand-sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.66);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-label {
  margin: 16px 0 6px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  color: rgba(255, 255, 255, 0.46);
  padding-left: 12px;
  font-weight: 700;
}

.nav-label.mt {
  margin-top: 22px;
}

.nav-item {
  width: 100%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  text-align: left;
  padding: 14px 14px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  gap: 11px;
  align-items: center;
  font-size: 14px;
  transition: 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(2px);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-weight: 800;
  box-shadow: inset 4px 0 0 #17c4e8;
}

.nav-sq {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.54);
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.42);
}

.nav-dot.active {
  background: #17c4e8;
  box-shadow: 0 0 0 5px rgba(23, 196, 232, 0.14);
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(23, 196, 232, 0.1), transparent 30%),
    #edf3f8;
}

.topbar {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 24px 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.045);
}

.eyebrow {
  margin: 0 0 7px;
  font-size: 12px;
  font-weight: 900;
  color: #0ea5c6;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.topbar h1 {
  margin: 0;
  font-size: 27px;
  font-weight: 900;
  color: #0f172a;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.info-pill {
  background: #fff;
  border: 1px solid #dfe8f3;
  border-radius: 14px;
  padding: 11px 16px;
  font-size: 13px;
  color: #0f172a;
  min-width: 145px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.055);
}

.pill-label {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  margin-bottom: 3px;
}

.logout-btn {
  background: #fff1f2;
  border: 1px solid #fca5a5;
  border-radius: 999px;
  padding: 12px 19px;
  font-size: 13px;
  font-weight: 900;
  color: #dc2626;
  cursor: pointer;
  box-shadow: 0 12px 22px rgba(220, 38, 38, 0.08);
}

.logout-btn:hover {
  background: #fee2e2;
}

.content {
  padding: 34px 38px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}

.hero-card,
.dashboard-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dfe8f3;
  border-radius: 28px;
  box-shadow:
    0 24px 50px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.hero-card {
  padding: 30px 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 22px;
  background: linear-gradient(135deg, #2563eb, #17c4e8);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 22px;
  box-shadow: 0 16px 28px rgba(37, 99, 235, 0.24);
}

.hero-role-label {
  margin: 0 0 5px;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-name {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #0f172a;
}

.hero-email {
  margin: 5px 0 0;
  font-size: 14px;
  color: #64748b;
}

.chip {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 11px 18px;
  font-size: 13px;
  font-weight: 900;
  color: #1d4ed8;
}

.dashboard-card {
  padding: 28px;
}

.section-heading {
  margin-bottom: 18px;
}

.section-title {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
}

.section-sub {
  margin: 0;
  font-size: 15px;
  color: #64748b;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.kpi {
  background: #fff;
  border: 1px solid #e1e9f3;
  border-radius: 24px;
  padding: 24px;
  cursor: pointer;
  min-height: 168px;
  transition: 0.22s ease;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.055);
}

.kpi:hover {
  transform: translateY(-5px);
  border-color: #b8ddff;
  box-shadow: 0 24px 42px rgba(15, 23, 42, 0.12);
}

.kpi-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}

.kpi-icon {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 22px;
}

.kpi-label {
  margin: 0 0 8px;
  font-size: 14px;
  color: #64748b;
  font-weight: 800;
}

.kpi-val {
  margin: 0;
  font-size: 36px;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.kpi-cap {
  margin: 10px 0 0;
  font-size: 12px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
}

.kpi-dot-color {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.quick-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.quick-card {
  background: #fff;
  border: 1px solid #e1e9f3;
  border-radius: 24px;
  padding: 24px;
  text-align: left;
  cursor: pointer;
  min-height: 150px;
  transition: 0.2s ease;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.055);
}

.quick-card:hover {
  transform: translateY(-5px);
  border-color: #b8ddff;
  box-shadow: 0 24px 42px rgba(15, 23, 42, 0.11);
}

.quick-icon {
  font-size: 27px;
  margin-bottom: 13px;
  display: block;
}

.quick-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 900;
  color: #0f172a;
}

.quick-card p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.mod-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 20px;
}

.table-wrap {
  background: #fff;
  border: 1px solid #e1e9f3;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.06);
}

.tab-row {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 20px;
  background: #f8fafc;
}

.tab {
  padding: 16px 18px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
}

.tab.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  font-weight: 900;
}

.tab-count {
  display: inline-flex;
  min-width: 24px;
  height: 20px;
  border-radius: 999px;
  background: #e2e8f0;
  font-size: 11px;
  color: #64748b;
  padding: 0 7px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background: #f8fafc;
}

.data-table th {
  padding: 15px 18px;
  text-align: left;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 900;
  text-transform: uppercase;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 16px 18px;
  color: #0f172a;
  border-bottom: 1px solid #f1f5f9;
}

.td-title {
  font-weight: 800;
  max-width: 320px;
}

.td-muted {
  color: #64748b;
}

.td-actions {
  display: flex;
  gap: 8px;
}

.thumb,
.thumb-empty {
  width: 72px;
  height: 50px;
  border-radius: 12px;
}

.thumb {
  object-fit: cover;
  display: block;
}

.thumb-empty {
  background: #f1f5f9;
}

.empty-row {
  text-align: center;
  color: #94a3b8;
  padding: 40px 14px !important;
}

.badge {
  display: inline-flex;
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
}

.badge.blue {
  background: #eff6ff;
  color: #1d4ed8;
}

.badge.green {
  background: #f0fdf4;
  color: #15803d;
}

.badge.gray {
  background: #f1f5f9;
  color: #64748b;
}

.add-btn {
  border: none;
  background: linear-gradient(135deg, #2563eb, #17c4e8);
  color: #fff;
  padding: 13px 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(37, 99, 235, 0.18);
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 18px 30px rgba(37, 99, 235, 0.24);
}

.add-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.secondary-btn {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
}

.act-btn {
  border: 1px solid #dbeafe;
  background: #eff6ff;
  border-radius: 999px;
  padding: 8px 13px;
  font-size: 12px;
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 900;
}

.act-btn.danger {
  color: #dc2626;
  border-color: #fecaca;
  background: #fff1f2;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.36);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(6px);
}

.modal-card {
  background: #fff;
  border-radius: 26px;
  padding: 30px;
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 40px 80px rgba(15, 23, 42, 0.24);
}

.modal-card h3 {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 900;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.form-error {
  margin: 0;
  font-size: 13px;
  color: #dc2626;
  font-weight: 800;
}

.form-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-hint {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

.field,
.modal-card .field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field label {
  font-size: 13px;
  font-weight: 900;
  color: #64748b;
}

.field input,
.field select,
.field textarea {
  border: 1px solid #dbe3ef;
  border-radius: 14px;
  padding: 13px 14px;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  outline: none;
  width: 100%;
  font-family: inherit;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #17c4e8;
  box-shadow: 0 0 0 4px rgba(23, 196, 232, 0.12);
}

.field-row {
  display: flex;
  gap: 12px;
}

.field-row .field {
  flex: 1;
}

.loading-state {
  padding: 56px;
  text-align: center;
  color: #94a3b8;
  font-size: 15px;
  background: #fff;
  border-radius: 22px;
}

@media (max-width: 1400px) {
  .kpi-row,
  .quick-row {
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
  .kpi-row,
  .quick-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .topbar,
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .field-row {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .content {
    padding: 18px;
  }

  .kpi-row,
  .quick-row {
    grid-template-columns: 1fr;
  }
}
</style>