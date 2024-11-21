import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/shared/HomeView.vue'),
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: () => import('../views/admin/AddProductView.vue'),
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !useUserStore().isLoggedInCheck()) {
    next({ name: 'login' })
  }else{
    next();
  }
});

export default router
