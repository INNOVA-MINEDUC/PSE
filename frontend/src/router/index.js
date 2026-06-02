import { createRouter, createWebHistory } from 'vue-router' 
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    {
      path: '/promocion',
      name: 'promocion',
      component: () => import('../views/PromocionView.vue')
    },
    {
      path: '/atencion',
      name: 'atencion',
      component: () => import('../views/AtencionView.vue')
    },
    {
      path: '/medicamentos',
      name: 'medicamentos',
      component: () => import('../views/MedicamentosView.vue')
    },
    {
      path: '/llamadas',
      name: 'llamadas',
      component: () => import('../views/CentroLlamadasView.vue')
    },
    {
      path: '/funerarios',
      name: 'funerarios',
      component: () => import('../views/FunerariosView.vue')
    },

    {
      path: '/noticias/:id',
      name: 'noticia-detalle',
      component: () => import('../views/NoticiaDetalleView.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // Si entra a una ruta protegida y no tiene token
  if (to.meta.requiresAuth && !token) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Si ya tiene sesión y quiere ir a login, mandarlo a admin
  if (to.name === 'login' && token) {
    next({ name: 'admin' })
    return
  }

  next()
})

export default router