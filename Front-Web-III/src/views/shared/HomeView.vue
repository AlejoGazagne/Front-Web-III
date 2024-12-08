<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import OrdersList from '@/components/common/OrdersList.vue';

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
      <OrdersList />
    </v-main>
  </v-app>
</template>

<style scoped>
.bar{
  width: 100%;
}
</style>