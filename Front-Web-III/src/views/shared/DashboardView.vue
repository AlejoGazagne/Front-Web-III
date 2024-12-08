<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
      
    </v-main>
  </v-app>
</template>

<style scoped>

</style>