<script lang="ts" setup>
import router from '@/router';
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
const route = useRoute()

const currentUrl = route.name

const homeButtonClass = computed(() => {
  return currentUrl === 'Home' ? 'active-button' : 'inactive-button'
});
const productButtonClass = computed(() => {
  return currentUrl === 'Products' ? 'active-button' : 'inactive-button'
});

const isAdmin = computed(() => {
  return localStorage.getItem('token')?.split(',')[0] === 'admin'
})

const handleAccountClick = () => {
  const role = localStorage.getItem('token')?.split(',')[0]
  if (role === 'admin') {
    router.push({ name: 'AdminProfile' })
  } else if (role === 'user') {
    router.push({ name: 'UserProfile' })
  } else {
    router.push({ name: 'Login' })
  }
}

</script>

<template>
  <v-app-bar elevation="1">
    <v-row align="center">
      <v-col cols="2" offset="1">
        <router-link to="/" class="custom-link"><v-toolbar-title
            class="text-h5 font-weight-bold">Products</v-toolbar-title></router-link>
      </v-col>
      <v-col cols="6">
        <v-toolbar-items>
          <router-link to="/" class="custom-link"><v-btn :class="[homeButtonClass, 'custom-btn']">Home</v-btn></router-link>
          <router-link to="/products" class="custom-link"><v-btn :class="[productButtonClass, 'custom-btn']">Products</v-btn></router-link>
        </v-toolbar-items>
      </v-col>
      <v-col cols="2" offset="1">
        <v-toolbar-items>
          <router-link to="/" class="custom-link">
            <v-btn v-if="!isAdmin" class="custom-btn"><v-icon>mdi-cart</v-icon></v-btn>
          </router-link>
          
          <v-btn class="custom-btn" @click="handleAccountClick"><v-icon>mdi-account</v-icon></v-btn>
          
        </v-toolbar-items>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.custom-link {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 2rem;
}

.active-button {
  color: black;
}

.inactive-button {
  color: gray;
}

.custom-btn {
  padding: 1rem 1rem;
}
</style>