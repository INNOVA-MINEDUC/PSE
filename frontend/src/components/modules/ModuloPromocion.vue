<template>
  <section class="modulo-promocion">
    <!-- ENCABEZADO DEL MÓDULO -->
    <header class="modulo-header">
      <h2>Promoción de la salud y prevención de enfermedades en centros educativos</h2>

      <p>
        El PSE refuerza las acciones de prevención y promoción de la salud dentro de los centros
        educativos, con el objetivo de mejorar el bienestar de la comunidad estudiantil. Estas
        acciones se desarrollan de forma progresiva y coordinada por el Ministerio de Salud
        Pública y Asistencia Social y el Ministerio de Educación.
      </p>

      <p class="modulo-subtexto">
        Haz clic sobre cada acción para conocer más detalles.
      </p>
    </header>

    <!-- ACCIONES PRINCIPALES (tarjetas tipo PNC) -->
    <section class="acciones">
      <h3>Acciones principales</h3>

      <div class="acciones-grid">
        <article
          v-for="accion in acciones"
          :key="accion.id"
          class="accion-card"
        >
          <h4 class="accion-titulo">{{ accion.titulo }}</h4>
          <p class="accion-texto">
            {{ accion.descripcion }}
          </p>

          <!-- Por ahora todas van a /promocion, luego podemos hacer rutas específicas -->
          <RouterLink
            class="accion-link"
            :to="accion.link"
          >
            Ver detalle
          </RouterLink>
        </article>
      </div>
    </section>

    <!-- NOTICIAS / ACTIVIDADES (estilo PNC) -->
    <section class="noticias">
      <div class="noticias-header">
        <h3>Noticias y actividades recientes</h3>
        <p>
          Ejemplos de jornadas, campañas y actividades realizadas en los centros educativos.
          Más adelante aquí se conectará con las noticias reales del programa.
        </p>
      </div>

      <div class="noticias-grid">
        <article
          v-for="nota in noticias"
          :key="nota.id"
          class="noticia-card"
        >
          <div
            class="noticia-img"
            :style="{ backgroundImage: 'url(' + nota.img + ')' }"
          ></div>

          <div class="noticia-body">
            <p class="noticia-fecha">{{ nota.fecha }}</p>
            <h4 class="noticia-titulo">{{ nota.titulo }}</h4>
            <p class="noticia-resumen">
              {{ nota.resumen }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section class="beneficios">
      <h3>Beneficios</h3>
      <p>
        Acá espacio para que agreguemos información más detallada sobre los beneficios de las acciones
        de promoción de la salud y prevención de enfermedades: mejora del rendimiento escolar,
        disminución de ausencias por enfermedad, detección temprana de riesgos, entre otros.
      </p>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// Puedes ajustar estos textos cuando tengas la info final
const acciones = [
  {
    id: 1,
    titulo: 'Jornadas de desparasitación',
    descripcion:
      'Organización de jornadas periódicas de desparasitación para niñas, niños y adolescentes en los centros educativos.',
    link: '/promocion', // luego se puede cambiar a /promocion/desparasitacion
  },
  {
    id: 2,
    titulo: 'Inmunización',
    descripcion:
      'Coordinación con los servicios de salud para facilitar el esquema de vacunación en el entorno escolar.',
    link: '/promocion',
  },
  {
    id: 3,
    titulo: 'Aplicación de barniz con flúor',
    descripcion:
      'Actividades de salud bucal para prevenir caries y fomentar hábitos de higiene oral desde la escuela.',
    link: '/promocion',
  },
  {
    id: 4,
    titulo: 'Prevención del dengue',
    descripcion:
      'Acciones educativas y comunitarias para reducir criaderos de zancudos y evitar enfermedades transmitidas por vectores.',
    link: '/promocion',
  },
  {
    id: 5,
    titulo: 'Promoción de salud renal',
    descripcion:
      'Sensibilización sobre el consumo de agua segura, alimentación saludable y detección temprana de factores de riesgo.',
    link: '/promocion',
  },
]

// Noticias demo (puedes cambiar textos e imágenes después)
import imgPromocion from '@/assets/mod-promocion.jpg'

const noticias = [
  {
    id: 1,
    titulo: 'Jornada de vacunación en escuela oficial urbana',
    fecha: '15 febrero 2025',
    resumen:
      'Se realizó una jornada de vacunación para estudiantes de primero a sexto primaria, en coordinación con el MSPAS.',
    img: imgPromocion,
  },
  {
    id: 2,
    titulo: 'Campaña de lavado de manos en centros educativos rurales',
    fecha: '3 febrero 2025',
    resumen:
      'Docentes y personal de salud impartieron sesiones prácticas de lavado de manos y cuidado personal.',
    img: imgPromocion,
  },
  {
    id: 3,
    titulo: 'Aplicación de barniz con flúor a estudiantes de preprimaria',
    fecha: '28 enero 2025',
    resumen:
      'Equipos de salud bucal atendieron a niñas y niños de preprimaria, reforzando la importancia del cepillado diario.',
    img: imgPromocion,
  },
]
</script>

<style scoped>
.modulo-promocion {
  padding: 32px 40px 40px;
  background: #f5f5f7;
  color: #020617;
}

/* ENCABEZADO */
.modulo-header {
  max-width: 920px;
  margin-bottom: 28px;
}

.modulo-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.modulo-header p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 6px;
}

.modulo-subtexto {
  font-size: 0.85rem;
  font-weight: 500;
  color: #2563eb;
}

/* ACCIONES */
.acciones {
  margin-top: 10px;
}

.acciones h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 14px;
}

.acciones-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.accion-card {
  background: white;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.accion-titulo {
  font-size: 0.95rem;
  font-weight: 600;
}

.accion-texto {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #4b5563;
}

.accion-link {
  margin-top: 6px;
  align-self: flex-start;
  font-size: 0.8rem;
  text-decoration: none;
  color: #2563eb;
  font-weight: 500;
}

/* NOTICIAS */
.noticias {
  margin-top: 32px;
}

.noticias-header {
  max-width: 760px;
  margin-bottom: 16px;
}

.noticias-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.noticias-header p {
  font-size: 0.85rem;
  color: #4b5563;
}

.noticias-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.noticia-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
}

.noticia-img {
  height: 130px;
  background-size: cover;
  background-position: center;
}

.noticia-body {
  padding: 10px 14px 14px;
}

.noticia-fecha {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 2px;
}

.noticia-titulo {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.noticia-resumen {
  font-size: 0.8rem;
  color: #4b5563;
}

/* BENEFICIOS */
.beneficios {
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.beneficios h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.beneficios p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #374151;
}

/* Responsive */
@media (max-width: 1100px) {
  .acciones-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .noticias-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .modulo-promocion {
    padding: 24px 20px 32px;
  }
  .acciones-grid,
  .noticias-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
