import { ref } from 'vue'

const toasts = ref([])
let _nextId = 0

export function useToast() {
  function show(message, type = 'error', duration = 5000) {
    const id = ++_nextId
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
  }

  function remove(id) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) toasts.value.splice(index, 1)
  }

  return { toasts, show, remove }
}
