/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '@/stores/useUserStore'

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
      path: "/add-product",
      name: "AddProduct",
      component: () => import('../pages/AddProductView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.checkRole();
        if (userStore.role !== 'admin') {
          next({ name: 'Home' });
        } else {
          next();
        }
      }
    },
    {
      path: "/edit-product/:id",
      name: "EditProduct",
      component: () => import('../pages/EditProductView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.checkRole();
        if (userStore.role !== 'admin') {
          next({ name: 'Home' });
        } else {
          next();
        }
      }
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
    },
    {
      path: "/admin",
      name: "AdminProfile",
      component: () => import('../pages/AdminProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.checkRole();
        if (userStore.role !== 'admin') {
          next({ name: 'Home' });
        } else {
          next();
        }
      }
      
    },
    {
      path: "/user",
      name: "UserProfile",
      component: () => import('../pages/UserProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.checkRole();
        if (userStore.role !== 'user') {
          next({ name: 'Home' });
        } else {
          next();
        }
      }

    },
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
