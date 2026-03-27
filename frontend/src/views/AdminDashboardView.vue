<template> 
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="badge">PSE</span>
        <div>
          <p class="sidebar-title">Panel PSE</p>
          <p class="sidebar-sub">Administración</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="sidebar-section">Módulos</p>
        <ul>
          <li><a href="#mod-noticias">Noticias y promoción</a></li>
          <li><a href="#mod-atencion">Atención a enfermedades</a></li>
          <li><a href="#mod-medicamentos">Suministro de medicamentos</a></li>
          <li><a href="#mod-llamadas">Centro de llamadas 1528</a></li>
          <li><a href="#mod-funerario">Apoyo funerario</a></li>
        </ul>
      </nav>

      <!-- Botón extra en sidebar (opcional) -->
      <button class="btn-logout" @click="handleLogout">
        Cerrar sesión
      </button>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="admin-main">
      <!-- HEADER -->
      <header class="admin-header">
        <div>
          <h1>Panel de administración PSE</h1>
          <p>
            Bienvenido,
            <strong>{{ user?.nombre || 'Administrador' }}</strong>.
            Desde aquí se actualiza la información que alimenta el portal
            público de Salud Escolar.
          </p>
        </div>
        <div class="header-info">
          <p class="header-label">Fecha</p>
          <p class="header-value">{{ today }}</p>
        </div>
      </header>

      <!-- TARJETA DATOS DE USUARIO MEJORADA -->
      <section class="user-card">
        <div class="user-card-main">
          <div class="user-avatar">
            {{ user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'A' }}
          </div>

          <div>
            <p class="user-label">Usuario activo</p>
            <p class="user-name">{{ user?.nombre || 'Administrador PSE' }}</p>
            <p class="user-email">{{ user?.email || 'admin@pse.mineduc.gt' }}</p>
          </div>
        </div>

        <div class="user-card-actions">
          <div class="user-role-block">
            <p class="user-label">Rol</p>
            <p class="user-tag">Administrador PSE</p>
          </div>

          <button class="btn-logout-inline" @click="handleLogout">
            Cerrar sesión
          </button>
        </div>
      </section>

      <!-- ACCESOS RÁPIDOS (tarjetas) -->
      <section class="quick-section">
        <h2>Accesos rápidos</h2>
        <p class="quick-sub">
          Selecciona un módulo para ir directamente al formulario.
        </p>

        <div class="quick-grid">
          <a href="#mod-noticias" class="quick-card">
            <h3>Noticias y promoción</h3>
            <p>Publicar noticias y actividades que se muestran en el inicio.</p>
          </a>

          <a href="#mod-atencion" class="quick-card">
            <h3>Atención a enfermedades</h3>
            <p>Actualizar las cifras de atenciones y estudiantes atendidos.</p>
          </a>

          <a href="#mod-medicamentos" class="quick-card">
            <h3>Suministro de medicamentos</h3>
            <p>Modificar el resumen de unidades, establecimientos y periodo.</p>
          </a>

          <a href="#mod-llamadas" class="quick-card">
            <h3>Centro de llamadas 1528</h3>
            <p>Registrar el total de llamadas que alimenta el módulo.</p>
          </a>

          <a href="#mod-funerario" class="quick-card">
            <h3>Apoyo funerario</h3>
            <p>Gestionar familias beneficiadas y montos de aporte económico.</p>
          </a>
        </div>
      </section>

      <!-- FORMULARIOS DE MÓDULOS -->
      <section class="form-section">
        <h2>Gestión de datos del portal</h2>
        <p class="form-sub">
          Estos formularios son un prototipo. En la versión final se conectarán
          con la base de datos del sistema PSE.
        </p>

        <div class="form-grid">
          <!-- NOTICIAS / PROMOCIÓN -->
          <section id="mod-noticias" class="form-card">
            <h3>Noticias y acciones de promoción</h3>
            <p class="form-hint">
              Esta información se muestra en el carrusel de noticias del inicio.
            </p>

            <form @submit.prevent="saveNoticias">
              <div class="field">
                <label>Fecha de la noticia</label>
                <input v-model="noticiaForm.fecha" type="date" required />
              </div>

              <div class="field">
                <label>Título</label>
                <input
                  v-model="noticiaForm.titulo"
                  type="text"
                  placeholder="Jornada de vacunación en escuela rural"
                  required
                />
              </div>

              <div class="field">
                <label>Descripción breve</label>
                <textarea
                  v-model="noticiaForm.descripcion"
                  rows="3"
                  placeholder="Resumen corto que aparecerá sobre la imagen."
                ></textarea>
              </div>

              <div class="field">
                <label>Tipo de módulo</label>
                <select v-model="noticiaForm.modulo">
                  <option>Promoción y prevención</option>
                  <option>Atención a enfermedades</option>
                  <option>Medicamentos</option>
                  <option>Apoyo funerario</option>
                </select>
              </div>

              <div class="field">
                <label>URL de imagen (opcional)</label>
                <input
                  v-model="noticiaForm.imagen"
                  type="text"
                  placeholder="https://..."
                />
              </div>

              <div class="form-actions">
                <button type="submit">Guardar noticia (demo)</button>
              </div>
            </form>
          </section>

          <!-- ATENCIÓN A ENFERMEDADES -->
          <section id="mod-atencion" class="form-card">
            <h3>Atención a enfermedades</h3>
            <p class="form-hint">
              Cifras que alimentan las tarjetas de consultas y estudiantes
              atendidos.
            </p>

            <form @submit.prevent="saveAtencion">
              <div class="field">
                <label>Consultas atendidas</label>
                <input
                  v-model.number="atencionForm.consultas"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Estudiantes atendidos</label>
                <input
                  v-model.number="atencionForm.estudiantes"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field field-inline">
                <div>
                  <label>% Hombres</label>
                  <input
                    v-model.number="atencionForm.hombres"
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label>% Mujeres</label>
                  <input
                    v-model.number="atencionForm.mujeres"
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div class="form-actions">
                <button type="submit">Guardar cifras (demo)</button>
              </div>
            </form>
          </section>

          <!-- SUMINISTRO DE MEDICAMENTOS -->
          <section id="mod-medicamentos" class="form-card">
            <h3>Suministro de medicamentos</h3>
            <p class="form-hint">
              Resumen que se muestra en el módulo de medicamentos y en el
              inicio.
            </p>

            <form @submit.prevent="saveMedicamentos">
              <div class="field">
                <label>Unidades de medicamento entregadas</label>
                <input
                  v-model.number="medForm.unidades"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Establecimientos con suministro</label>
                <input
                  v-model.number="medForm.establecimientos"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Periodo de referencia</label>
                <input
                  v-model="medForm.periodo"
                  type="text"
                  placeholder="enero – julio 2025"
                  required
                />
              </div>

              <div class="form-actions">
                <button type="submit">Guardar resumen (demo)</button>
              </div>
            </form>
          </section>

          <!-- CENTRO DE LLAMADAS -->
          <section id="mod-llamadas" class="form-card">
            <h3>Centro de llamadas 1528</h3>
            <p class="form-hint">
              Total de llamadas que se visualiza en el módulo de centro de
              llamadas.
            </p>

            <form @submit.prevent="saveLlamadas">
              <div class="field">
                <label>Número total de llamadas</label>
                <input
                  v-model.number="llamadasForm.total"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Periodo de referencia (texto)</label>
                <input
                  v-model="llamadasForm.periodo"
                  type="text"
                  placeholder="Datos acumulados al 31/12/2025"
                />
              </div>

              <div class="form-actions">
                <button type="submit">Guardar llamadas (demo)</button>
              </div>
            </form>
          </section>

          <!-- APOYO FUNERARIO -->
          <section id="mod-funerario" class="form-card">
            <h3>Apoyo económico funerario</h3>
            <p class="form-hint">
              Datos que alimentan las tarjetas de familias beneficiadas y montos
              de aporte.
            </p>

            <form @submit.prevent="saveFunerario">
              <div class="field">
                <label>Familias beneficiadas</label>
                <input
                  v-model.number="funForm.familias"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Monto total entregado (Q)</label>
                <input
                  v-model.number="funForm.montoTotal"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field">
                <label>Monto máximo por estudiante (Q)</label>
                <input
                  v-model.number="funForm.montoMaximo"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div class="field field-inline">
                <div>
                  <label>Casos masculinos</label>
                  <input
                    v-model.number="funForm.masculinos"
                    type="number"
                    min="0"
                  />
                </div>
                <div>
                  <label>Casos femeninos</label>
                  <input
                    v-model.number="funForm.femeninos"
                    type="number"
                    min="0"
                  />
                </div>
              </div>

              <div class="form-actions">
                <button type="submit">Guardar apoyo (demo)</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/helpers/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const today = new Date().toLocaleDateString('es-GT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
})

/* ---------- ESTADOS DE FORMULARIOS (DEMO) ---------- */

// Noticias / promoción
const noticiaForm = reactive({
  fecha: '',
  titulo: '',
  descripcion: '',
  modulo: 'Promoción y prevención',
  imagen: ''
})

// Atención a enfermedades
const atencionForm = reactive({
  consultas: 674656,
  estudiantes: 222704,
  hombres: 52,
  mujeres: 48
})

// Medicamentos
const medForm = reactive({
  unidades: 800000,
  establecimientos: 1350,
  periodo: 'enero – julio 2025'
})

// Llamadas 1528
const llamadasForm = reactive({
  total: 24221,
  periodo: 'Datos de ejemplo del prototipo'
})

// Apoyo funerario
const funForm = reactive({
  familias: 329,
  montoTotal: 2467000,
  montoMaximo: 7500,
  masculinos: 193,
  femeninos: 136
})

/* ---------- ACCIONES (SOLO DEMO) ---------- */

const handleLogout = () => {
  logout()
  router.push('/login') // aquí regresa al login
}

const saveNoticias = () => {
  console.log('Noticias guardadas (demo):', { ...noticiaForm })
  alert('Noticia guardada (prototipo).')
}

const saveAtencion = () => {
  console.log('Atención guardada (demo):', { ...atencionForm })
  alert('Cifras de atención guardadas (prototipo).')
}

const saveMedicamentos = () => {
  console.log('Medicamentos guardados (demo):', { ...medForm })
  alert('Resumen de medicamentos guardado (prototipo).')
}

const saveLlamadas = () => {
  console.log('Llamadas 1528 guardadas (demo):', { ...llamadasForm })
  alert('Datos de llamadas guardados (prototipo).')
}

const saveFunerario = () => {
  console.log('Apoyo funerario guardado (demo):', { ...funForm })
  alert('Datos de apoyo funerario guardados (prototipo).')
}
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  min-height: 100vh;
  background: #f5f7fb;
}

/* SIDEBAR */
.sidebar {
  background: #0f172a;
  color: #e5e7eb;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-logo {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #2563eb;
  font-weight: 700;
  font-size: 0.85rem;
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.sidebar-sub {
  font-size: 0.75rem;
  color: #9ca3af;
}

.sidebar-section {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #64748b;
  margin-bottom: 6px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
}

.sidebar-nav li + li {
  margin-top: 4px;
}

.sidebar-nav a {
  color: #e5e7eb;
  text-decoration: none;
}

.sidebar-nav a:hover {
  text-decoration: underline;
}

.btn-logout {
  margin-top: auto;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #64748b;
  background: transparent;
  color: #e5e7eb;
  font-size: 0.78rem;
  cursor: pointer;
}

/* MAIN */
.admin-main {
  padding: 20px 26px 26px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.admin-header h1 {
  font-size: 1.15rem;
  margin-bottom: 4px;
  color: #111827;
}

.admin-header p {
  font-size: 0.85rem;
  color: #4b5563;
}

.header-info {
  text-align: right;
  font-size: 0.8rem;
}

.header-label {
  color: #6b7280;
}

.header-value {
  font-weight: 600;
}

/* USER CARD */
.user-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  font-size: 0.85rem;
}

.user-card-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-role-block {
  text-align: right;
}

.user-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #9ca3af;
  margin-bottom: 4px;
}

.user-name {
  font-weight: 600;
  color: #111827;
}

.user-email {
  font-size: 0.78rem;
  color: #6b7280;
}

.user-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 500;
}

.btn-logout-inline {
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #111827;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.btn-logout-inline:hover {
  background: #f3f4f6;
}

/* QUICK ACCESS */
.quick-section h2 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.quick-sub {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.quick-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  font-size: 0.82rem;
  text-decoration: none;
  color: #111827;
}

.quick-card h3 {
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.quick-card p {
  font-size: 0.8rem;
  color: #4b5563;
}

/* FORM SECTION */
.form-section h2 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.form-sub {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.form-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12);
  font-size: 0.82rem;
}

.form-card h3 {
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.form-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.field-inline {
  flex-direction: row;
  gap: 8px;
}

.field-inline > div {
  flex: 1;
}

.field label {
  font-size: 0.75rem;
  color: #4b5563;
}

.field input,
.field textarea,
.field select {
  padding: 7px 10px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 0.8rem;
  outline: none;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.18);
}

textarea {
  resize: vertical;
}

.form-actions {
  margin-top: 6px;
  text-align: right;
}

.form-actions button {
  padding: 7px 12px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.form-actions button:hover {
  background: #1d4ed8;
}

@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .sidebar {
    display: none; /* en móvil luego puedes hacer menú hamburguesa */
  }

  .admin-main {
    padding-inline: 16px;
  }

  .user-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-card-actions {
    width: 100%;
    justify-content: space-between;
  }

  .user-role-block {
    text-align: left;
  }
}
</style>
