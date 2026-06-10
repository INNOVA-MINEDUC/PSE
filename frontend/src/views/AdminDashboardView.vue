<template>
  <main class="admin-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="mineduc-badge">MINEDUC</span>
        <div>
          <p class="brand-name">Portal PSE</p>
          <p class="brand-sub">Salud Escolar</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-section">Principal</p>
        <button class="nav-item" :class="{ active: activeModule === 'dashboard' }" @click="go('dashboard')">
          <span class="nav-sq" :class="{ active: activeModule === 'dashboard' }"></span>
          Panel
        </button>

        <p class="nav-section">Servicios</p>
        <button class="nav-item" :class="{ active: activeModule === 'noticias' }" @click="go('noticias')">
          <span class="nav-dot" :class="{ active: activeModule === 'noticias' }"></span>
          Noticias
        </button>
        <button class="nav-item" :class="{ active: activeModule === 'llamadas' }" @click="go('llamadas')">
          <span class="nav-dot" :class="{ active: activeModule === 'llamadas' }"></span>
          Centro 1528
        </button>
        <button class="nav-item" :class="{ active: activeModule === 'funerario' }" @click="go('funerario')">
          <span class="nav-dot" :class="{ active: activeModule === 'funerario' }"></span>
          Apoyo funerario
        </button>
        <button class="nav-item" :class="{ active: activeModule === 'atencion' }" @click="go('atencion')">
          <span class="nav-dot" :class="{ active: activeModule === 'atencion' }"></span>
          Atenciones
        </button>
        <button class="nav-item" :class="{ active: activeModule === 'medicamentos' }" @click="go('medicamentos')">
          <span class="nav-dot" :class="{ active: activeModule === 'medicamentos' }"></span>
          Medicamentos
        </button>

      </nav>

      <div class="sidebar-footer">
        <div class="sf-avatar">{{ initials }}</div>
        <div class="sf-info">
          <p class="sf-name">{{ fullName }}</p>
          <p class="sf-role">{{ roleText }}</p>
        </div>
        <button class="sf-logout" @click="handleLogout" title="Cerrar sesión">⏻</button>
      </div>
    </aside>

    <div class="main">
      <header class="topbar" v-if="activeModule !== 'dashboard'">
        <div>
          <h1>{{ currentTitle }}</h1>
        </div>
        <div class="topbar-right">
          <div class="info-pill">
            <span class="pill-label">Fecha</span>
            <strong>{{ currentDate }}</strong>
          </div>
          <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
        </div>
      </header>

      <div class="content">
        <template v-if="activeModule === 'dashboard'">

          <!-- HERO BANNER -->
          <div class="dh-hero">
            <div class="dh-hero-inner">
              <div>
                <h2 class="dh-title">Bienvenido, {{ user?.nombres || 'Administrador' }}</h2>
                <p class="dh-sub">{{ currentDate }} · Portal de Salud Escolar</p>
              </div>
              <div class="dh-user">
                <div class="avatar-sm2">{{ initials }}</div>
                <div>
                  <p class="dh-uname">{{ fullName }}</p>
                  <p class="dh-urole">{{ roleText }}</p>
                </div>
                <button class="dh-logout-btn" @click="handleLogout">Cerrar sesión</button>
              </div>
            </div>
          </div>

          <!-- 5 KPI CARDS -->
          <div class="dh-kpis">
            <article
              v-for="kpi in kpiCards"
              :key="kpi.key"
              class="dh-kpi"
              :style="{ '--c': kpi.color, '--cs': kpi.softColor }"
              @click="go(kpi.key)"
            >
              <p class="dh-kpi-label">{{ kpi.label }}</p>
              <h3 class="dh-kpi-val">{{ loadingKpis ? '…' : formatNum(kpi.value) }}</h3>
              <p class="dh-kpi-cap">
                <span class="dh-dot" :style="{ background: kpi.color }"></span>
                {{ kpi.caption }}
              </p>
            </article>
          </div>

          <!-- CHARTS ROW -->
          <div class="dh-charts-row">

            <!-- Donut: distribución por sexo -->
            <div class="dh-chart-card">
              <p class="dh-chart-title">Atenciones por sexo</p>
              <div class="dh-donut-wrap">
                <svg class="dh-donut-svg" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#17c4e8" stroke-width="14"/>
                  <circle
                    cx="60" cy="60" r="45"
                    fill="none"
                    stroke="#2563eb"
                    stroke-width="14"
                    stroke-linecap="round"
                    stroke-dasharray="282.74"
                    :stroke-dashoffset="282.74 * (1 - (dashStats.atencion.porcentaje_hombres || 0) / 100)"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div class="dh-donut-center">
                  <span class="dh-donut-pct">{{ dashStats.atencion.porcentaje_hombres || 0 }}%</span>
                  <span class="dh-donut-lbl">Masc.</span>
                </div>
              </div>
              <div class="dh-donut-legend">
                <div class="dh-leg-item">
                  <span class="dh-leg-dot" style="background:#2563eb"></span>
                  Masculino &nbsp;<strong>{{ dashStats.atencion.porcentaje_hombres || 0 }}%</strong>
                </div>
                <div class="dh-leg-item">
                  <span class="dh-leg-dot" style="background:#17c4e8"></span>
                  Femenino &nbsp;<strong>{{ dashStats.atencion.porcentaje_mujeres || (100 - (dashStats.atencion.porcentaje_hombres || 0)) }}%</strong>
                </div>
              </div>
            </div>

            <!-- Barras: comparativa módulos -->
            <div class="dh-chart-card dh-chart-bars-card">
              <p class="dh-chart-title">Indicadores por módulo</p>
              <div class="dh-bars">
                <div
                  v-for="kpi in kpiCards.filter(k => k.key !== 'noticias')"
                  :key="kpi.key"
                  class="dh-bar-row"
                >
                  <span class="dh-bar-mod">{{ kpi.label }}</span>
                  <div class="dh-bar-track">
                    <div
                      class="dh-bar-fill"
                      :style="{ width: barPct(kpi.value) + '%', background: kpi.color }"
                    ></div>
                  </div>
                  <span class="dh-bar-val" :style="{ color: kpi.color }">{{ formatNum(kpi.value) }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- TABLA RESUMEN -->
          <div class="dh-table-card">
            <table class="dh-table">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Indicador principal</th>
                  <th>Detalle 1</th>
                  <th>Detalle 2</th>
                  <th>Período</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="dh-td-mod">Atención a enfermedades</td>
                  <td><span class="dh-td-big">{{ formatNum(rawKpis.atenciones) }}</span><span class="dh-td-unit">consultas</span></td>
                  <td><span class="dh-td-big">{{ formatNum(rawKpis.estudiantes) }}</span><span class="dh-td-unit">estudiantes</span></td>
                  <td><span class="dh-td-big">{{ dashStats.atencion.porcentaje_hombres||0 }}%</span><span class="dh-td-unit">masculino</span></td>
                  <td class="dh-td-period">{{ dashStats.atencion.periodo || '—' }}</td>
                  <td><button class="dh-td-btn" @click="go('atencion')">Editar</button></td>
                </tr>
                <tr>
                  <td class="dh-td-mod">Suministro de medicamentos</td>
                  <td><span class="dh-td-big">{{ formatNum(rawKpis.medicamentos) }}</span><span class="dh-td-unit">unidades</span></td>
                  <td><span class="dh-td-big">{{ formatNum(dashStats.medicamentos.establecimientos_con_suministro) }}</span><span class="dh-td-unit">establecimientos</span></td>
                  <td><span class="dh-td-big">{{ formatNum(dashStats.medicamentos.cobertura_nacional) }}</span><span class="dh-td-unit">municipios</span></td>
                  <td class="dh-td-period">{{ dashStats.medicamentos.periodo || '—' }}</td>
                  <td><button class="dh-td-btn" @click="go('medicamentos')">Editar</button></td>
                </tr>
                <tr>
                  <td class="dh-td-mod">Centro de llamadas 1528</td>
                  <td><span class="dh-td-big">{{ formatNum(rawKpis.llamadas) }}</span><span class="dh-td-unit">llamadas</span></td>
                  <td><span class="dh-td-big">{{ formatNum(dashStats.llamadas.casos_atendidos) }}</span><span class="dh-td-unit">casos atendidos</span></td>
                  <td><span class="dh-td-big">{{ formatNum(dashStats.llamadas.usuarios_beneficiados) }}</span><span class="dh-td-unit">usuarios</span></td>
                  <td class="dh-td-period">{{ dashStats.llamadas.periodo || '—' }}</td>
                  <td><button class="dh-td-btn" @click="go('llamadas')">Editar</button></td>
                </tr>
                <tr>
                  <td class="dh-td-mod">Apoyo funerario</td>
                  <td><span class="dh-td-big">{{ formatNum(rawKpis.funerario) }}</span><span class="dh-td-unit">familias</span></td>
                  <td><span class="dh-td-big">Q{{ formatNum(dashStats.funerario.monto_total) }}</span><span class="dh-td-unit">monto total</span></td>
                  <td><span class="dh-td-big">{{ formatNum(dashStats.funerario.apoyos_otorgados) }}</span><span class="dh-td-unit">apoyos otorgados</span></td>
                  <td class="dh-td-period">{{ dashStats.funerario.periodo || '—' }}</td>
                  <td><button class="dh-td-btn" @click="go('funerario')">Editar</button></td>
                </tr>
              </tbody>
            </table>
          </div>
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

                    <td class="td-title">
                      <div class="title-truncate">{{ n.titulo }}</div>
                    </td>

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
                        <a :href="`/noticias/${n.id}`" target="_blank" class="act-btn view-btn">Ver</a>
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
            <div class="modal-card modal-card--wide">
              <div class="modal-header">
                <h3>{{ modal.data.id ? "Editar noticia" : "Nueva noticia" }}</h3>
                <button class="modal-close-btn" type="button" @click="modal.open = false">✕</button>
              </div>

              <!-- SECCIÓN: INFORMACIÓN -->
              <p class="modal-section-label">Información básica</p>

              <div class="field">
                <label>Título <span class="req">*</span></label>
                <input v-model="modal.data.titulo" type="text" placeholder="Título de la noticia" />
              </div>

              <div class="field">
                <label>Descripción breve
                  <span class="field-hint">— aparece en la card del listado</span>
                </label>
                <textarea v-model="modal.data.descripcion_corta" rows="3" placeholder="Resumen corto visible en la tarjeta..."></textarea>
              </div>

              <div class="field">
                <label>Contenido completo
                  <span class="field-hint">— cuerpo del artículo en la vista detalle</span>
                </label>
                <textarea
                  v-model="modal.data.contenido"
                  rows="10"
                  placeholder="Desarrolla aquí el contenido completo. Separa párrafos con doble salto de línea."
                ></textarea>
              </div>

              <div class="field">
                <label>Autor / Publicado por</label>
                <input v-model="modal.data.autor" type="text" placeholder="Ej: Programa de Salud Escolar — MINEDUC" />
              </div>

              <div class="field-row">
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

              <!-- SECCIÓN: IMÁGENES -->
              <p class="modal-section-label">Imágenes</p>

              <div class="img-fields-grid">

                <!-- MINIATURA -->
                <div class="img-field-block">
                  <p class="img-field-title">
                    Miniatura
                    <span class="field-hint">— card del listado</span>
                  </p>
                  <div class="img-preview-area">
                    <img
                      v-if="modal.data.miniatura_url"
                      :src="resolveUrl(modal.data.miniatura_url)"
                      class="img-preview img-preview--4x3"
                      alt="Miniatura"
                    />
                    <div v-else class="img-preview-empty img-preview--4x3">
                      <span>Sin imagen</span>
                    </div>
                  </div>
                  <label class="file-upload-btn">
                    <input type="file" accept="image/*" class="hidden-input"
                      @change="(e) => onImageChange(e, 'miniatura_url')" />
                    Seleccionar miniatura
                  </label>
                  <input
                    v-model="modal.data.miniatura_url"
                    type="text"
                    class="url-input"
                    placeholder="O pega una URL..."
                  />
                </div>

                <!-- HERO -->
                <div class="img-field-block">
                  <p class="img-field-title">
                    Imagen principal (hero)
                    <span class="field-hint">— encabezado del artículo</span>
                  </p>
                  <div class="img-preview-area">
                    <img
                      v-if="modal.data.hero_url"
                      :src="resolveUrl(modal.data.hero_url)"
                      class="img-preview img-preview--16x9"
                      alt="Hero"
                    />
                    <div v-else class="img-preview-empty img-preview--16x9">
                      <span>Sin imagen</span>
                    </div>
                  </div>
                  <label class="file-upload-btn">
                    <input type="file" accept="image/*" class="hidden-input"
                      @change="(e) => onImageChange(e, 'hero_url')" />
                    Seleccionar imagen hero
                  </label>
                  <input
                    v-model="modal.data.hero_url"
                    type="text"
                    class="url-input"
                    placeholder="O pega una URL..."
                  />
                </div>

              </div>

              <!-- SECCIÓN: GALERÍA -->
              <p class="modal-section-label">
                Galería de imágenes adicionales
                <span class="field-hint">— aparecen al final del artículo · sin límite</span>
              </p>

              <div class="galeria-admin-wrap">

                <!-- IMÁGENES YA EN GALERÍA -->
                <div v-if="galeriaLocal.length" class="galeria-admin-grid">
                  <div
                    v-for="(img, i) in galeriaLocal"
                    :key="img.tempId"
                    class="galeria-admin-item"
                  >
                    <img :src="img.preview" class="galeria-admin-thumb" alt="" />
                    <div class="galeria-admin-item-overlay">
                      <span class="galeria-admin-orden">{{ i + 1 }}</span>
                    </div>
                    <button
                      class="galeria-admin-remove"
                      type="button"
                      @click="removeGaleriaLocal(i)"
                      title="Eliminar imagen"
                    >✕</button>
                  </div>
                </div>

                <p v-if="galeriaLocal.length === 0" class="galeria-admin-empty">
                  No hay imágenes en la galería. Agrega con el botón de abajo.
                </p>

                <!-- AGREGAR -->
                <label class="file-upload-btn file-upload-btn--galeria">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden-input"
                    @change="onGaleriaFilesChange"
                  />
                  + Agregar imágenes a la galería
                </label>
                <p class="galeria-admin-hint">
                  Formatos: JPG, PNG, WebP. Puedes seleccionar varias a la vez.
                </p>

              </div>

              <p v-if="modal.error" class="form-error">{{ modal.error }}</p>

              <div class="modal-actions">
                <button class="secondary-btn" type="button" @click="modal.open = false">Cancelar</button>
                <button class="add-btn" type="button" :disabled="savingNoticia" @click="saveNoticia">
                  {{ savingNoticia ? "Guardando…" : "Guardar noticia" }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeModule === 'atencion'">
          <section class="dashboard-card">
            <div class="mod-header">
              <div class="mod-header-left">
                <span class="mod-icon-bg" style="background:#dcfce7;color:#16a34a;">🏥</span>
                <div>
                  <p class="section-title">Atención a enfermedades</p>
                  <p class="section-sub">Actualiza los indicadores de atención médica escolar.</p>
                </div>
              </div>
              <span v-if="metricaAtencion.periodo" class="period-chip">{{ metricaAtencion.periodo }}</span>
            </div>

            <div class="summary-strip">
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(rawKpis.atenciones) }}</span>
                <span class="summary-label">Consultas atendidas</span>
              </div>
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(rawKpis.estudiantes) }}</span>
                <span class="summary-label">Estudiantes atendidos</span>
              </div>
            </div>

            <div class="edit-section">
              <p class="edit-section-title">Actualizar métricas</p>

              <div class="field-row">
                <div class="field">
                  <label>Consultas atendidas</label>
                  <input v-model.number="metricaAtencion.consultas_atendidas" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Estudiantes atendidos</label>
                  <input v-model.number="metricaAtencion.estudiantes_atendidos" type="number" min="0" />
                </div>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>% Hombres</label>
                  <input v-model.number="metricaAtencion.porcentaje_hombres" type="number" min="0" max="100" />
                </div>
                <div class="field">
                  <label>% Mujeres</label>
                  <input v-model.number="metricaAtencion.porcentaje_mujeres" type="number" min="0" max="100" />
                </div>
                <div class="field">
                  <label>Período</label>
                  <input v-model="metricaAtencion.periodo" type="text" placeholder="ej: enero - julio 2025" />
                </div>
              </div>

              <div class="save-row">
                <button class="save-btn" :disabled="savingAtencion" @click="updateMetricaAtencion">
                  {{ savingAtencion ? "Guardando…" : "Guardar cambios" }}
                </button>
                <span v-if="atencionMsg.text" class="form-msg" :class="atencionMsg.type">
                  {{ atencionMsg.text }}
                </span>
              </div>
            </div>
          </section>
        </template>

        <template v-if="activeModule === 'medicamentos'">
          <section class="dashboard-card">
            <div class="mod-header">
              <div class="mod-header-left">
                <span class="mod-icon-bg" style="background:#fef3c7;color:#d97706;">💊</span>
                <div>
                  <p class="section-title">Suministro de medicamentos</p>
                  <p class="section-sub">Actualiza los indicadores de distribución de medicamentos.</p>
                </div>
              </div>
              <span v-if="metricaMedicamentos.periodo" class="period-chip">{{ metricaMedicamentos.periodo }}</span>
            </div>

            <div class="summary-strip">
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(rawKpis.medicamentos) }}</span>
                <span class="summary-label">Unidades entregadas</span>
              </div>
            </div>

            <div class="edit-section">
              <p class="edit-section-title">Actualizar métricas</p>

              <div class="field-row">
                <div class="field">
                  <label>Unidades entregadas</label>
                  <input v-model.number="metricaMedicamentos.unidades_entregadas" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Establecimientos con suministro</label>
                  <input v-model.number="metricaMedicamentos.establecimientos_con_suministro" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Cobertura nacional</label>
                  <input v-model.number="metricaMedicamentos.cobertura_nacional" type="number" min="0" />
                </div>
              </div>

              <div class="field">
                <label>Período</label>
                <input v-model="metricaMedicamentos.periodo" type="text" placeholder="ej: enero - julio 2025" />
              </div>

              <div class="save-row">
                <button class="save-btn" :disabled="savingMedicamentos" @click="updateMetricaMedicamentos">
                  {{ savingMedicamentos ? "Guardando…" : "Guardar cambios" }}
                </button>
                <span v-if="medicamentosMsg.text" class="form-msg" :class="medicamentosMsg.type">
                  {{ medicamentosMsg.text }}
                </span>
              </div>
            </div>
          </section>
        </template>

        <template v-if="activeModule === 'llamadas'">
          <section class="dashboard-card">
            <div class="mod-header">
              <div class="mod-header-left">
                <span class="mod-icon-bg" style="background:#ede9fe;color:#7c3aed;">📞</span>
                <div>
                  <p class="section-title">Centro de llamadas 1528</p>
                  <p class="section-sub">Actualiza los registros del centro de atención.</p>
                </div>
              </div>
              <span v-if="metricaLlamadas.periodo" class="period-chip">{{ metricaLlamadas.periodo }}</span>
            </div>

            <div v-if="loadingLlamadas" class="loading-state">Cargando métricas…</div>

            <template v-else>
            <div class="summary-strip">
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(metricaLlamadas.total_llamadas) }}</span>
                <span class="summary-label">Total de llamadas</span>
              </div>
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(metricaLlamadas.casos_atendidos) }}</span>
                <span class="summary-label">Casos atendidos</span>
              </div>
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(metricaLlamadas.usuarios_beneficiados) }}</span>
                <span class="summary-label">Usuarios beneficiados</span>
              </div>
            </div>

            <div class="edit-section">
              <p class="edit-section-title">Actualizar métricas</p>

              <div class="field-row">
                <div class="field">
                  <label>Total de llamadas</label>
                  <input v-model.number="metricaLlamadas.total_llamadas" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Casos atendidos</label>
                  <input v-model.number="metricaLlamadas.casos_atendidos" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Usuarios beneficiados</label>
                  <input v-model.number="metricaLlamadas.usuarios_beneficiados" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Período</label>
                  <input v-model="metricaLlamadas.periodo" type="text" placeholder="ej: 2025" />
                </div>
              </div>

              <div class="field">
                <label>Video institucional (URL embed)</label>
                <input v-model="metricaLlamadas.video_url" type="text" placeholder="https://www.youtube.com/embed/XXXXXXXXX" />
                <p class="field-hint-block">Pega la URL embed de YouTube: youtube.com/embed/ID_DEL_VIDEO</p>
              </div>

              <div class="save-row">
                <button class="save-btn" :disabled="savingLlamadas" @click="updateMetricaLlamadas">
                  {{ savingLlamadas ? "Guardando…" : "Guardar cambios" }}
                </button>
                <span v-if="llamadasMsg.text" class="form-msg" :class="llamadasMsg.type">
                  {{ llamadasMsg.text }}
                </span>
              </div>
            </div>
            </template>
          </section>
        </template>

        <template v-if="activeModule === 'funerario'">
          <section class="dashboard-card">
            <div class="mod-header">
              <div class="mod-header-left">
                <span class="mod-icon-bg" style="background:#fce7f3;color:#db2777;">🤝</span>
                <div>
                  <p class="section-title">Apoyo funerario</p>
                  <p class="section-sub">Actualiza los indicadores de apoyos y montos registrados.</p>
                </div>
              </div>
              <span v-if="metricaFunerario.periodo" class="period-chip">{{ metricaFunerario.periodo }}</span>
            </div>

            <div v-if="loadingFunerario" class="loading-state">Cargando métricas…</div>

            <template v-else>
            <div class="summary-strip">
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(metricaFunerario.familias_beneficiadas) }}</span>
                <span class="summary-label">Familias beneficiadas</span>
              </div>
              <div class="summary-item">
                <span class="summary-val">{{ formatNum(metricaFunerario.apoyos_otorgados) }}</span>
                <span class="summary-label">Apoyos otorgados</span>
              </div>
              <div v-if="metricaFunerario.cobertura" class="summary-item">
                <span class="summary-val summary-val--sm">{{ metricaFunerario.cobertura }}</span>
                <span class="summary-label">Cobertura</span>
              </div>
            </div>

            <div class="edit-section">
              <p class="edit-section-title">Actualizar métricas</p>

              <div class="field-row">
                <div class="field">
                  <label>Familias beneficiadas</label>
                  <input v-model.number="metricaFunerario.familias_beneficiadas" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Apoyos otorgados</label>
                  <input v-model.number="metricaFunerario.apoyos_otorgados" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Cobertura</label>
                  <input v-model="metricaFunerario.cobertura" type="text" placeholder="ej: 22 departamentos" />
                </div>
                <div class="field">
                  <label>Período</label>
                  <input v-model="metricaFunerario.periodo" type="text" placeholder="ej: 2025" />
                </div>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Monto total (Q)</label>
                  <input v-model.number="metricaFunerario.monto_total" type="number" min="0" step="0.01" />
                </div>
                <div class="field">
                  <label>Monto por estudiante (Q)</label>
                  <input v-model.number="metricaFunerario.monto_por_estudiante" type="number" min="0" step="0.01" />
                </div>
                <div class="field">
                  <label>Casos masculinos</label>
                  <input v-model.number="metricaFunerario.casos_masculinos" type="number" min="0" />
                </div>
                <div class="field">
                  <label>Casos femeninos</label>
                  <input v-model.number="metricaFunerario.casos_femeninos" type="number" min="0" />
                </div>
              </div>

              <div class="field">
                <label>Video institucional (URL embed)</label>
                <input v-model="metricaFunerario.video_url" type="text" placeholder="https://www.youtube.com/embed/XXXXXXXXX" />
                <p class="field-hint-block">Pega la URL embed de YouTube: youtube.com/embed/ID_DEL_VIDEO</p>
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Folleto PDF</label>
                  <div class="pdf-upload-row">
                    <label class="pdf-upload-btn">
                      <input type="file" accept="application/pdf" class="hidden-input"
                        @change="(e) => onPdfChange(e, 'folleto_url', 'funerario')" />
                      {{ uploadingPdf.folleto ? 'Subiendo…' : 'Subir PDF' }}
                    </label>
                    <span v-if="metricaFunerario.folleto_url" class="pdf-filename">
                      <a :href="resolveUrl(metricaFunerario.folleto_url)" target="_blank" class="pdf-link">Ver archivo</a>
                    </span>
                  </div>
                  <input v-model="metricaFunerario.folleto_url" type="text" class="url-input-sm" placeholder="O pega una URL directa…" />
                </div>
                <div class="field">
                  <label>Formulario PDF</label>
                  <div class="pdf-upload-row">
                    <label class="pdf-upload-btn">
                      <input type="file" accept="application/pdf" class="hidden-input"
                        @change="(e) => onPdfChange(e, 'formulario_url', 'funerario')" />
                      {{ uploadingPdf.formulario ? 'Subiendo…' : 'Subir PDF' }}
                    </label>
                    <span v-if="metricaFunerario.formulario_url" class="pdf-filename">
                      <a :href="resolveUrl(metricaFunerario.formulario_url)" target="_blank" class="pdf-link">Ver archivo</a>
                    </span>
                  </div>
                  <input v-model="metricaFunerario.formulario_url" type="text" class="url-input-sm" placeholder="O pega una URL directa…" />
                </div>
              </div>

              <div class="save-row">
                <button class="save-btn" :disabled="savingFunerario" @click="updateMetricaFunerario">
                  {{ savingFunerario ? "Guardando…" : "Guardar cambios" }}
                </button>
                <span v-if="funerarioMsg.text" class="form-msg" :class="funerarioMsg.type">
                  {{ funerarioMsg.text }}
                </span>
              </div>
            </div>
            </template>
          </section>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// Subida de imagen para noticias
const onImageChange = async (e, targetField = "miniatura_url") => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("imagen", file);
  try {
    const res = await fetch(`${API_URL}/api/noticias/upload`, {
      method: "POST",
      body: formData,
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    if (res.status === 401) {
      handleExpiredSession();
      return;
    }

    const data = await res.json();
    if (data.success && data.url) {
      modal.value.data[targetField] = data.url;
      // compatibilidad hacia atrás: imagen_url apunta a miniatura
      if (targetField === "miniatura_url") modal.value.data.imagen_url = data.url;
      modal.value.error = "";
    } else {
      modal.value.error = data.error || "Error al subir la imagen.";
    }
  } catch (err) {
    modal.value.error = "Error de red al subir la imagen.";
  }
};

/* ── GALERÍA LOCAL (mockup — Fase 0) ─────────────────────────────── */
const galeriaLocal = ref([]);

const onGaleriaFilesChange = (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      galeriaLocal.value.push({
        tempId: `${Date.now()}_${Math.random()}`,
        preview: ev.target.result,
        file,
      });
    };
    reader.readAsDataURL(file);
  });
  // limpiar input para poder volver a seleccionar los mismos archivos
  e.target.value = "";
};

const removeGaleriaLocal = (index) => {
  galeriaLocal.value.splice(index, 1);
};
import { useRouter } from "vue-router";

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter();

const token = localStorage.getItem("token");
const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
const activeModule = ref("dashboard");


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

const barMax = computed(() =>
  Math.max(rawKpis.value.atenciones, rawKpis.value.medicamentos, rawKpis.value.llamadas, rawKpis.value.funerario, 1)
);
const barPct = (val) => Math.round((Number(val) / barMax.value) * 90);

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
  return user.value.roles
    .map((role) => role.nombre.replace(/\bASISTO\b/gi, "").trim())
    .join(", ")
    .replace(/\s+/g, " ")
    .trim() || "Administrador";
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

const handleExpiredSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push({ name: "login", query: { expired: "1" } });
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

    if (res.status === 401) {
      handleExpiredSession();
      return;
    }

    const data = await res.json();

    if (data.success) {
      user.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (error) {
    console.error("Error cargando usuario:", error);
  }
};

const dashStats = ref({
  atencion:     { periodo: "", porcentaje_hombres: 0, porcentaje_mujeres: 0 },
  medicamentos: { establecimientos_con_suministro: 0, cobertura_nacional: 0 },
  llamadas:     { casos_atendidos: 0, usuarios_beneficiados: 0 },
  funerario:    { monto_total: 0, apoyos_otorgados: 0 },
});

const fetchDashStats = async () => {
  try {
    const [ra, rm, rl, rf] = await Promise.all([
      fetch(`${API_URL}/api/atencion/metricas`).then(r => r.json()),
      fetch(`${API_URL}/api/medicamentos/metricas`).then(r => r.json()),
      fetch(`${API_URL}/api/llamadas/metricas`).then(r => r.json()),
      fetch(`${API_URL}/api/funerario/metricas`).then(r => r.json()),
    ]);
    if (ra.success && ra.data) dashStats.value.atencion     = ra.data;
    if (rm.success && rm.data) dashStats.value.medicamentos = rm.data;
    if (rl.success && rl.data) dashStats.value.llamadas     = rl.data;
    if (rf.success && rf.data) dashStats.value.funerario    = rf.data;
  } catch (err) { console.error("Error cargando dashStats:", err); }
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
    const res = await fetch(`${API_URL}/api/dashboard/kpis`);
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

// ── MÉTRICAS ATENCION ─────────────────────────────────────────
const metricaAtencion = ref({ consultas_atendidas: 0, estudiantes_atendidos: 0, porcentaje_hombres: 0, porcentaje_mujeres: 0, periodo: "" });
const savingAtencion  = ref(false);
const atencionMsg     = ref({ text: "", type: "" });

const fetchMetricaAtencion = async () => {
  try {
    const res  = await fetch(`${API_URL}/api/atencion/metricas`);
    const data = await res.json();
    if (data.success && data.data) metricaAtencion.value = { ...data.data };
  } catch (err) { console.error("Error cargando métricas atencion:", err); }
};

const updateMetricaAtencion = async () => {
  savingAtencion.value = true;
  atencionMsg.value = { text: "", type: "" };
  try {
    const res = await fetch(`${API_URL}/api/atencion/metricas`, {
      method: "PUT", headers: authHeaders.value, body: JSON.stringify(metricaAtencion.value),
    });
    if (res.status === 401) { handleExpiredSession(); return; }
    const data = await res.json();
    atencionMsg.value = data.success
      ? { text: "Métricas actualizadas correctamente.", type: "success" }
      : { text: data.error || "Error al guardar.", type: "error" };
    if (data.success) await fetchKpis();
  } catch { atencionMsg.value = { text: "Error de red.", type: "error" }; }
  finally { savingAtencion.value = false; }
};

// ── MÉTRICAS MEDICAMENTOS ──────────────────────────────────────
const metricaMedicamentos = ref({ unidades_entregadas: 0, establecimientos_con_suministro: 0, cobertura_nacional: 0, periodo: "" });
const savingMedicamentos  = ref(false);
const medicamentosMsg     = ref({ text: "", type: "" });

const fetchMetricaMedicamentos = async () => {
  try {
    const res  = await fetch(`${API_URL}/api/medicamentos/metricas`);
    const data = await res.json();
    if (data.success && data.data) metricaMedicamentos.value = { ...data.data };
  } catch (err) { console.error("Error cargando métricas medicamentos:", err); }
};

const updateMetricaMedicamentos = async () => {
  savingMedicamentos.value = true;
  medicamentosMsg.value = { text: "", type: "" };
  try {
    const res = await fetch(`${API_URL}/api/medicamentos/metricas`, {
      method: "PUT", headers: authHeaders.value, body: JSON.stringify(metricaMedicamentos.value),
    });
    if (res.status === 401) { handleExpiredSession(); return; }
    const data = await res.json();
    medicamentosMsg.value = data.success
      ? { text: "Métricas actualizadas correctamente.", type: "success" }
      : { text: data.error || "Error al guardar.", type: "error" };
    if (data.success) await fetchKpis();
  } catch { medicamentosMsg.value = { text: "Error de red.", type: "error" }; }
  finally { savingMedicamentos.value = false; }
};

// ── CARGA DE PDF ───────────────────────────────────────────────
const uploadingPdf = ref({ folleto: false, formulario: false });

const onPdfChange = async (e, targetField, modulo) => {
  const file = e.target.files[0];
  if (!file) return;
  const key = targetField === "folleto_url" ? "folleto" : "formulario";
  uploadingPdf.value[key] = true;
  const formData = new FormData();
  formData.append("archivo", file);
  try {
    const res = await fetch(`${API_URL}/api/${modulo}/upload-pdf`, {
      method: "POST",
      body: formData,
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });
    if (res.status === 401) { handleExpiredSession(); return; }
    const data = await res.json();
    if (data.success && data.url) {
      if (modulo === "funerario") metricaFunerario.value[targetField] = data.url;
    } else {
      alert(data.error || "Error al subir el PDF.");
    }
  } catch {
    alert("Error de red al subir el PDF.");
  } finally {
    uploadingPdf.value[key] = false;
    e.target.value = "";
  }
};

// ── MÉTRICAS LLAMADAS ──────────────────────────────────────────
const metricaLlamadas = ref({ total_llamadas: 0, casos_atendidos: 0, usuarios_beneficiados: 0, periodo: "", video_url: "" });
const savingLlamadas  = ref(false);
const loadingLlamadas = ref(false);
const llamadasMsg     = ref({ text: "", type: "" });

const fetchMetricaLlamadas = async () => {
  loadingLlamadas.value = true;
  try {
    const res  = await fetch(`${API_URL}/api/llamadas/metricas`);
    const data = await res.json();
    if (data.success && data.data) metricaLlamadas.value = { ...data.data };
  } catch (err) { console.error("Error cargando métricas llamadas:", err); }
  finally { loadingLlamadas.value = false; }
};

const updateMetricaLlamadas = async () => {
  savingLlamadas.value = true;
  llamadasMsg.value = { text: "", type: "" };
  try {
    const res = await fetch(`${API_URL}/api/llamadas/metricas`, {
      method: "PUT", headers: authHeaders.value, body: JSON.stringify(metricaLlamadas.value),
    });
    if (res.status === 401) { handleExpiredSession(); return; }
    const data = await res.json();
    llamadasMsg.value = data.success
      ? { text: "Métricas actualizadas correctamente.", type: "success" }
      : { text: data.error || "Error al guardar.", type: "error" };
    if (data.success) { await fetchKpis(); await fetchMetricaLlamadas(); }
  } catch { llamadasMsg.value = { text: "Error de red.", type: "error" }; }
  finally { savingLlamadas.value = false; }
};

// ── MÉTRICAS FUNERARIO ─────────────────────────────────────────
const metricaFunerario = ref({ familias_beneficiadas: 0, apoyos_otorgados: 0, cobertura: "", monto_total: 0, monto_por_estudiante: 0, casos_masculinos: 0, casos_femeninos: 0, periodo: "", video_url: "", folleto_url: "", formulario_url: "" });
const savingFunerario  = ref(false);
const loadingFunerario = ref(false);
const funerarioMsg     = ref({ text: "", type: "" });

const fetchMetricaFunerario = async () => {
  loadingFunerario.value = true;
  try {
    const res  = await fetch(`${API_URL}/api/funerario/metricas`);
    const data = await res.json();
    if (data.success && data.data) metricaFunerario.value = { ...data.data };
  } catch (err) { console.error("Error cargando métricas funerario:", err); }
  finally { loadingFunerario.value = false; }
};

const updateMetricaFunerario = async () => {
  savingFunerario.value = true;
  funerarioMsg.value = { text: "", type: "" };
  try {
    const res = await fetch(`${API_URL}/api/funerario/metricas`, {
      method: "PUT", headers: authHeaders.value, body: JSON.stringify(metricaFunerario.value),
    });
    if (res.status === 401) { handleExpiredSession(); return; }
    const data = await res.json();
    funerarioMsg.value = data.success
      ? { text: "Métricas actualizadas correctamente.", type: "success" }
      : { text: data.error || "Error al guardar.", type: "error" };
    if (data.success) { await fetchKpis(); await fetchMetricaFunerario(); }
  } catch { funerarioMsg.value = { text: "Error de red.", type: "error" }; }
  finally { savingFunerario.value = false; }
};

// ──────────────────────────────────────────────────────────────
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
  galeriaLocal.value = [];
  modal.value = {
    open: true,
    error: "",
    data: noticia
      ? {
          ...noticia,
          fecha_publicacion: noticia.fecha_publicacion
            ? String(noticia.fecha_publicacion).slice(0, 10)
            : new Date().toISOString().slice(0, 10),
          activo:       Number(noticia.activo ?? 1),
          orden:        Number(noticia.orden  ?? 0),
          miniatura_url: noticia.miniatura_url || noticia.imagen_url || "",
          hero_url:      noticia.hero_url      || noticia.imagen_url || "",
          autor:         noticia.autor         || "",
        }
      : {
          titulo:           "",
          descripcion_corta: "",
          contenido:        "",
          imagen_url:       "",
          miniatura_url:    "",
          hero_url:         "",
          autor:            "",
          fecha_publicacion: new Date().toISOString().slice(0, 10),
          modulo:  "promocion",
          activo:  1,
          orden:   0,
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
      ? `${API_URL}/api/noticias/${noticia.id}`
      : `${API_URL}/api/noticias`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: authHeaders.value,
      body: JSON.stringify(noticia),
    });

    if (res.status === 401) {
      handleExpiredSession();
      return;
    }

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
    const res = await fetch(`${API_URL}/api/noticias/${id}`, {
      method: "DELETE",
      headers: authHeaders.value,
    });

    if (res.status === 401) {
      handleExpiredSession();
      return;
    }

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
  if (module === "noticias")     fetchNoticias();
  if (module === "atencion")     fetchMetricaAtencion();
  if (module === "medicamentos") fetchMetricaMedicamentos();
  if (module === "llamadas")     fetchMetricaLlamadas();
  if (module === "funerario")    fetchMetricaFunerario();
});

onMounted(() => {
  fetchUser();
  fetchKpis();
  fetchDashStats();
  fetchNoticias();
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* ── SHELL ───────────────────────────────────────────── */
.admin-shell {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  font-family: "Montserrat", "Segoe UI", system-ui, sans-serif;
  background: #edf3f8;
}

/* ── SIDEBAR ─────────────────────────────────────────── */
.sidebar {
  background:
    radial-gradient(circle at top left, rgba(23,196,232,0.18), transparent 38%),
    linear-gradient(180deg, #071a40 0%, #0e2a5c 100%);
  color: #fff;
  padding: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 18px 0 40px rgba(15,23,42,0.16);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.mineduc-badge {
  background: #22c55e;
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.brand-name {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.brand-sub {
  margin: 2px 0 0;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  gap: 2px;
  flex: 1;
}

.nav-section {
  margin: 16px 0 5px 10px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.36);
  font-weight: 700;
}

.nav-section:first-child { margin-top: 8px; }

.nav-item {
  width: 100%;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.7);
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 13.5px;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.09);
  color: #fff;
}

.nav-item.active {
  background: rgba(255,255,255,0.14);
  color: #fff;
  font-weight: 700;
  box-shadow: inset 3px 0 0 #17c4e8;
}

.nav-item--disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}

.nav-sq {
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1.5px solid rgba(255,255,255,0.45);
  flex-shrink: 0;
}

.nav-sq.active { border-color: #17c4e8; background: rgba(23,196,232,0.2); }

.nav-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  flex-shrink: 0;
}

.nav-dot.active {
  background: #17c4e8;
  box-shadow: 0 0 0 3px rgba(23,196,232,0.18);
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.sf-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #17c4e8, #2563eb);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 13px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(23,196,232,0.3);
}

.sf-info { flex: 1; min-width: 0; }
.sf-name { margin: 0; font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sf-role { margin: 1px 0 0; font-size: 10.5px; color: rgba(255,255,255,0.4); }

.sf-logout {
  border: none;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.45);
  width: 30px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: grid;
  place-items: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.sf-logout:hover { background: rgba(220,38,38,0.2); color: #fca5a5; }

/* ── MAIN ────────────────────────────────────────────── */
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(23,196,232,0.07), transparent 30%),
    #edf3f8;
}

/* ── TOPBAR ──────────────────────────────────────────── */
.topbar {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(226,232,240,0.8);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 8px 24px rgba(15,23,42,0.04);
}

.topbar h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: #0f172a;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.info-pill {
  background: #fff;
  border: 1px solid #dfe8f3;
  border-radius: 12px;
  padding: 9px 14px;
  font-size: 13px;
  color: #0f172a;
  box-shadow: 0 2px 8px rgba(15,23,42,0.04);
}

.pill-label {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  margin-bottom: 2px;
}

.logout-btn {
  background: #fff1f2;
  border: 1px solid #fca5a5;
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  color: #dc2626;
  cursor: pointer;
  font-family: inherit;
}

.logout-btn:hover { background: #fee2e2; }

.content {
  padding: 30px 34px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
}

.dashboard-card {
  background: rgba(255,255,255,0.97);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(15,23,42,0.06);
}

/* ── HERO CARD ───────────────────────────────────────── */
.hero-card {
  background: #151929;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}


.hero-left {
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: linear-gradient(135deg, #17c4e8, #2563eb);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 24px;
  box-shadow: 0 8px 24px rgba(23, 196, 232, 0.4);
  border: 2px solid rgba(255,255,255,0.15);
}

.hero-role-label {
  margin: 0 0 4px;
  font-size: 10px;
  color: #17c4e8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-name {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: #f1f5f9;
}

.hero-email {
  margin: 4px 0 0;
  font-size: 13px;
  color: #475569;
}

.chip {
  background: rgba(23,196,232,0.12);
  border: 1px solid rgba(23,196,232,0.3);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #17c4e8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.dashboard-card {
  padding: 28px;
}

.section-heading {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-heading::before {
  content: "";
  width: 3px;
  height: 22px;
  border-radius: 4px;
  background: linear-gradient(180deg, #17c4e8, #2563eb);
  flex-shrink: 0;
}

.section-title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 900;
  color: #0f172a;
}

.section-sub {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.kpi {
  background: #fff;
  border: 1px solid #e1e9f3;
  border-radius: 20px;
  padding: 24px 22px 18px;
  cursor: pointer;
  transition: 0.22s ease;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.kpi::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--kpi-color, #2563eb);
  border-radius: 20px 20px 0 0;
}

.kpi:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.11);
}

.kpi-label {
  margin: 0;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.kpi-val {
  margin: 0;
  font-size: 38px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1;
}

.kpi-cap {
  margin: 14px 0 0;
  font-size: 11.5px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.kpi-dot-color {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.quick-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.quick-card {
  background: #fff;
  border: 1px solid #e1e9f3;
  border-radius: 20px;
  padding: 22px 20px 18px;
  text-align: left;
  cursor: pointer;
  transition: 0.22s ease;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.quick-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--mod-color, #2563eb);
  border-radius: 20px 20px 0 0;
}

.quick-card:hover {
  transform: translateY(-4px);
  border-color: var(--mod-color, #2563eb);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
}

.quick-icon {
  font-size: 22px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
}

.quick-card h3 {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.3;
}

.quick-card p {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.5;
  flex: 1;
}

.quick-arrow {
  display: block;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 900;
  color: var(--mod-color, #2563eb);
  opacity: 0;
  transform: translateX(-4px);
  transition: 0.2s ease;
}

.quick-card:hover .quick-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── INDICADORES POR MÓDULO ─────────────────────────── */
.mod-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.mod-stat-card {
  border: 1px solid #e1e9f3;
  border-radius: 18px;
  padding: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.mod-stat-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--mod-c, #2563eb);
  border-radius: 18px 18px 0 0;
}

.mod-stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
}

.mod-stat-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.mod-stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.mod-stat-name {
  font-size: 12px;
  font-weight: 800;
  color: #334155;
  line-height: 1.3;
}

.mod-stat-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.mod-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
}

.mod-stat-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.mod-stat-lbl {
  font-size: 11.5px;
  color: #94a3b8;
  font-weight: 600;
}

.mod-stat-val {
  font-size: 14px;
  font-weight: 900;
  color: #0f172a;
}

.mod-stat-period {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.mod-stat-btn {
  margin-top: 16px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 800;
  color: var(--mod-c, #2563eb);
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: inherit;
  transition: opacity 0.15s;
}

.mod-stat-btn:hover { opacity: 0.7; }

@media (max-width: 1200px) {
  .mod-stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .mod-stats-grid { grid-template-columns: 1fr; }
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
  max-width: 220px;
}

.title-truncate {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.view-btn {
  text-decoration: none;
  color: #0369a1;
  border-color: #bae6fd;
  background: #f0f9ff;
}
.view-btn:hover {
  background: #e0f2fe;
  border-color: #7dd3fc;
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


/* ── MÓDULOS DE MÉTRICAS ─────────────────────────────────────── */
.mod-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mod-icon-bg {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.period-chip {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;
}

.summary-strip {
  display: flex;
  gap: 14px;
  padding: 22px 0 6px;
  flex-wrap: wrap;
}

.summary-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 22px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 150px;
}

.summary-val {
  font-size: 1.55rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.summary-val--sm {
  font-size: 1.1rem;
}

.summary-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.edit-section {
  border-top: 1px solid #e2e8f0;
  margin-top: 24px;
  padding-top: 22px;
}

.edit-section-title {
  font-size: 0.72rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 18px;
}

.save-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.save-btn {
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 11px 26px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, opacity 0.15s;
}
.save-btn:hover    { background: #1e293b; }
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.form-msg {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
}
.form-msg.success { background: #dcfce7; color: #15803d; }
.form-msg.error   { background: #fee2e2; color: #b91c1c; }

.field-hint-block {
  margin: 4px 0 0;
  font-size: 0.76rem;
  color: #94a3b8;
}

/* ── DASHBOARD ───────────────────────────────────────── */

/* HERO */
.dh-hero {
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  background-image: url('/login/login-fondo.png');
  background-size: cover;
  background-position: center top;
}
.dh-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(7,26,64,0.78) 0%, rgba(14,42,92,0.65) 100%);
}
.dh-hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
}

.dh-title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 900;
  color: #fff;
}

.dh-sub {
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
}

.dh-user {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 12px;
  padding: 10px 14px;
  backdrop-filter: blur(6px);
}

.avatar-sm2 {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #17c4e8, #2563eb);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 13px;
  flex-shrink: 0;
}

.dh-uname { margin: 0; font-size: 13px; font-weight: 700; color: #fff; }
.dh-urole { margin: 1px 0 0; font-size: 11px; color: rgba(255,255,255,0.55); }

.dh-logout-btn {
  margin-left: 16px;
  padding: 7px 16px;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.14);
  color: #fff;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.dh-logout-btn:hover { background: rgba(220,38,38,0.35); border-color: #fca5a5; color: #fecaca; }

/* ── CHARTS ROW ──────────────────────────────────────── */
.dh-charts-row {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;
}

.dh-chart-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 22px 22px 18px;
  box-shadow: 0 2px 12px rgba(15,23,42,0.05);
}

.dh-chart-title {
  margin: 0 0 18px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

/* Donut */
.dh-donut-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
}
.dh-donut-svg { width: 120px; height: 120px; }
.dh-donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.dh-donut-pct { font-size: 22px; font-weight: 900; color: #071a40; line-height: 1; }
.dh-donut-lbl { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }

.dh-donut-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dh-leg-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;
}
.dh-leg-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Bars */
.dh-chart-bars-card { display: flex; flex-direction: column; }
.dh-bars { display: flex; flex-direction: column; gap: 16px; justify-content: center; flex: 1; }
.dh-bar-row { display: grid; grid-template-columns: 140px 1fr 80px; align-items: center; gap: 12px; }
.dh-bar-mod { font-size: 12px; font-weight: 600; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dh-bar-track {
  height: 10px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
}
.dh-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  min-width: 4px;
}
.dh-bar-val { font-size: 12px; font-weight: 700; text-align: right; }

/* KPI ROW */
.dh-kpis {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.dh-kpi {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 16px 14px;
  cursor: pointer;
  transition: box-shadow 0.18s, transform 0.18s;
  position: relative;
  overflow: hidden;
}

.dh-kpi::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--c, #2563eb);
  border-radius: 14px 14px 0 0;
}

.dh-kpi:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15,23,42,0.1);
  border-color: #bfdbfe;
}

.dh-kpi-label {
  margin: 0 0 10px;
  font-size: 10.5px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dh-kpi-val {
  margin: 0;
  font-size: 30px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1;
}

.dh-kpi-cap {
  margin: 10px 0 0;
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}

.dh-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* TABLA RESUMEN */
/* TABLA RESUMEN */
.dh-table-card {
  background: #fff;
  border: 1px solid #dfe8f3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(15,23,42,0.06);
}

.dh-table {
  width: 100%;
  border-collapse: collapse;
}

.dh-table thead tr {
  background: linear-gradient(90deg, #071a40 0%, #0e2a5c 100%);
}

.dh-table th {
  padding: 14px 22px;
  text-align: left;
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.dh-table tbody tr {
  border-bottom: 1px solid #edf3f8;
  transition: background 0.12s;
}

.dh-table tbody tr:last-child { border-bottom: none; }
.dh-table tbody tr:hover { background: #f0f7ff; }

.dh-table td {
  padding: 16px 22px;
  vertical-align: middle;
}

.dh-td-mod {
  font-size: 13px;
  font-weight: 800;
  color: #071a40;
  white-space: nowrap;
}

.dh-td-big {
  display: block;
  font-size: 17px;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.dh-td-unit {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dh-td-period {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  font-weight: 600;
}

.dh-td-btn {
  border: none;
  background: linear-gradient(135deg, #17c4e8, #2563eb);
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 11.5px;
  font-weight: 800;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.15s, transform 0.15s;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(23,196,232,0.2);
}

.dh-td-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

/* MOD CARD */
.dh-mod {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px 20px 16px;
  box-shadow: 0 2px 10px rgba(15,23,42,0.05);
}

.dh-mod-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.dh-mod-tag {
  margin: 0 0 6px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.dh-mod-num {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1;
}

.dh-mod-sub {
  margin: 0;
  font-size: 11px;
  color: #94a3b8;
}

.dh-mod-aside { text-align: right; }
.dh-mod-aside-num { margin: 0 0 2px; font-size: 18px; font-weight: 900; color: #334155; }
.dh-mod-aside-lbl { margin: 0; font-size: 11px; color: #94a3b8; }


/* BARS */
.dh-bars {
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 14px;
}

.dh-bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #64748b;
}

.dh-bar-row span { min-width: 70px; }
.dh-bar-row b { min-width: 48px; text-align: right; font-size: 11px; color: #334155; }

.dh-bar {
  flex: 1;
  height: 5px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.dh-bar > div {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* LIST */
.dh-list {
  border-top: 1px solid #f1f5f9;
  margin-bottom: 14px;
}

.dh-list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f8fafc;
  font-size: 12px;
}

.dh-list-row span { color: #64748b; }
.dh-list-row b    { color: #0f172a; font-size: 13px; }

.dh-goto {
  border: none;
  background: transparent;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: opacity 0.15s;
}
.dh-goto:hover { opacity: 0.6; }

@media (max-width: 1400px) {
  .dh-mods { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 1200px) {
  .dh-kpis { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .dh-kpis { grid-template-columns: repeat(2, 1fr); }
  .dh-mods { grid-template-columns: 1fr; }
  .dh-greeting { flex-direction: column; align-items: flex-start; gap: 12px; }
}


/* ── MODAL ANCHO ────────────────────────────────────── */
.modal-card--wide {
  max-width: 860px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close-btn {
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  color: #64748b;
  padding: 4px 8px;
}

.modal-close-btn:hover { color: #0f172a; }

.modal-section-label {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #17c4e8;
  margin: 8px 0 2px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}

.req { color: #dc2626; }

.field-hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: #94a3b8;
  margin-left: 4px;
}

/* ── IMÁGENES ───────────────────────────────────────── */
.img-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.img-field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.img-field-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: #334155;
  margin: 0;
}

.img-preview-area {
  width: 100%;
}

.img-preview {
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.img-preview--4x3  { aspect-ratio: 4 / 3; }
.img-preview--16x9 { aspect-ratio: 16 / 9; }

.img-preview-empty {
  width: 100%;
  background: #f1f5f9;
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.78rem;
  font-weight: 600;
}

.file-upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 16px;
  background: #f1f5f9;
  border: 1.5px dashed #94a3b8;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  font-family: inherit;
}

.file-upload-btn:hover {
  background: #e2e8f0;
  border-color: #64748b;
}

.file-upload-btn--galeria {
  width: 100%;
}

.url-input {
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.8rem;
  color: #64748b;
  width: 100%;
  font-family: inherit;
  outline: none;
}

.url-input:focus { border-color: #17c4e8; }

/* ── GALERÍA ────────────────────────────────────────── */
.galeria-admin-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.galeria-admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
}

.galeria-admin-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.galeria-admin-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.galeria-admin-item-overlay {
  position: absolute;
  bottom: 4px;
  left: 4px;
}

.galeria-admin-orden {
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.galeria-admin-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(220,38,38,0.85);
  color: #fff;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.galeria-admin-empty {
  font-size: 0.82rem;
  color: #94a3b8;
  margin: 0;
}

.galeria-admin-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

@media (max-width: 640px) {
  .img-fields-grid { grid-template-columns: 1fr; }
  .modal-card--wide { max-width: 100%; }
}

.pdf-upload-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.hidden-input {
  display: none;
}

.pdf-upload-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 16px;
  background: #f1f5f9;
  border: 1.5px dashed #94a3b8;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.pdf-upload-btn:hover {
  background: #e2e8f0;
  border-color: #64748b;
}

.pdf-link {
  font-size: 0.8rem;
  color: #2563eb;
  text-decoration: underline;
  font-weight: 700;
}

.url-input-sm {
  margin-top: 7px;
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 0.8rem;
  color: #64748b;
  width: 100%;
  font-family: inherit;
  outline: none;
}

.url-input-sm:focus {
  border-color: #17c4e8;
}
</style>