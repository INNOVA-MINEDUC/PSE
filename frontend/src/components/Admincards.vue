<template>
  <!-- Ocupa el ancho completo -->
  <v-container class="py-10" fluid>
    <v-row dense>
      <v-col
        v-for="(card, i) in cards"
        :key="i"
        cols="12"
        sm="6"
        md="3"
      >
        <!-- Toda la tarjeta es clickeable -->
        <RouterLink
          :to="card.link"
          class="zoom-link"
        >
          <div class="zoom-card">
            <div
              class="zoom-bg"
              :style="{ backgroundImage: 'url(' + card.img + ')' }"
            ></div>

            <div class="zoom-content">
              <h3 class="title-top">{{ card.top }}</h3>
              <h2 class="title-main">{{ card.title }}</h2>

              <v-btn
                variant="outlined"
                class="mt-4 text-white"
                size="small"
              >
                {{ card.buttonText || 'Explorar' }}
              </v-btn>
            </div>
          </div>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.zoom-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.zoom-card {
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.35);
}

.zoom-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
}

.zoom-card:hover .zoom-bg {
  transform: scale(1.12);
}

.zoom-content {
  position: absolute;
  inset: 0;
  color: white;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.1)
  );
}

.title-top {
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.9;
}

.title-main {
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 4px;
}
</style>
