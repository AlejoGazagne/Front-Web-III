<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app clipped>
      <Header />
    </v-app-bar>
    
    <!-- Menú lateral -->
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
      <!-- Aquí se cargan las vistas dinámicamente -->
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>

</style>