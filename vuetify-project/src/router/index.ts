/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/HomeView.vue')
    },
    {
      path: '/product-detail/:id',
      name: 'ProductDetail',
      component: () => import('../pages/ProductDetailView.vue')
    },
    {
      path: "/products",
      name: "Products",
      component: () => import('../pages/ProductsView.vue')
    },
    {
      path: "/login",
      name: "Login",
      component: () => import('../pages/LoginView.vue')
    },
    {
      path: "/register",
      name: "Register",
      component: () => import('../pages/RegisterView.vue')
    }
  ]
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
