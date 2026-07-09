<template>
  <Teleport to="body">
    <div class="toast-wrap" aria-live="polite">
      <TransitionGroup name="toast" tag="div" class="toast-list">
        <div
          v-for="t in toasts"
          :key="t.id"
          :class="['toast', `toast--${t.type}`]"
          role="alert"
        >
          <span class="toast-icon" aria-hidden="true">
            <svg v-if="t.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <svg v-else-if="t.type === 'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </span>
          <p class="toast-msg">{{ t.message }}</p>
          <button class="toast-close" @click="remove(t.id)" aria-label="Cerrar notificación">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border-left: 4px solid;
  min-width: 300px;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
  font-family: 'Montserrat', sans-serif;
  pointer-events: all;
}

.toast--error  { background: #fef2f2; border-color: #dc2626; color: #991b1b; }
.toast--warning { background: #fffbeb; border-color: #d97706; color: #92400e; }
.toast--success { background: #f0fdf4; border-color: #16a34a; color: #14532d; }

.toast-icon { flex-shrink: 0; margin-top: 1px; }
.toast--error   .toast-icon { color: #dc2626; }
.toast--warning .toast-icon { color: #d97706; }
.toast--success .toast-icon { color: #16a34a; }

.toast-msg {
  flex: 1;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.55;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: opacity 0.15s, background 0.15s;
  margin-top: 1px;
}
.toast-close:hover { opacity: 1; background: rgba(0, 0, 0, 0.06); }

.toast-enter-active { animation: toast-slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: toast-slide-out 0.25s ease-in forwards; }
.toast-move        { transition: transform 0.25s ease; }

@keyframes toast-slide-in {
  from { opacity: 0; transform: translateX(110%) scale(0.92); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes toast-slide-out {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to   { opacity: 0; transform: translateX(110%) scale(0.92); }
}
</style>
