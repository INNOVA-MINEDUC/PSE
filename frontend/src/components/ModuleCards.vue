<template>
  <section class="modules-section">
    <div class="modules-inner">
      <h2 class="modules-title">Módulos principales del portal</h2>

      <div class="modules-grid">
        <article
          v-for="card in cards"
          :key="card.id"
          class="module-card"
          :style="{ backgroundImage: `url(${card.img})` }"
          @click="$emit('select', card.id)"
        >
          <div class="module-overlay">
            <p class="module-number">{{ card.numero }}</p>
            <h3 class="module-title">{{ card.titulo }}</h3>

            <p class="module-description">
              {{ card.descripcion }}
            </p>

            <button class="module-button">
              {{ card.buttonText || 'MÁS INFORMACIÓN' }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
  },
})

defineEmits(['select'])
</script>

<style scoped>
.modules-section {
  background: #f5f5f7;
  padding: 24px 40px 32px;
}

.modules-inner {
  max-width: 100%;
  margin: 0 auto;
}

.modules-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 18px;
  color: #020617;
}

/* Fila de 5 cards ocupando todo el ancho */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
}

/* Card */
.module-card {
  position: relative;
  height: 260px; /* más altas */
  border-radius: 18px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.35);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.45);
}

/* Capa oscura para los textos */
.module-overlay {
  position: absolute;
  inset: 0;
  padding: 14px 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent);
  color: #f9fafb;
}

.module-number {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #bfdbfe;
  margin-bottom: 4px;
}

.module-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.module-description {
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.92;
  margin-bottom: 10px;
}

/* Botón */
.module-button {
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #93c5fd;
  background: rgba(15, 23, 42, 0.75);
  color: #e5e7eb;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.module-card:hover .module-button {
  background: #3b82f6;
  color: #0b1120;
}

/* ---------- Responsive ---------- */

@media (max-width: 1400px) {
  .modules-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .modules-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .modules-section {
    padding-inline: 20px;
  }

  .modules-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .modules-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .module-card {
    height: 220px;
  }
}
</style>
