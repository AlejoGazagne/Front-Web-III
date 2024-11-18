<script setup lang="ts">
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>

    <v-navigation-drawer :width="217" permanent>
      <Menu />
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main class="prueba">
      <v-container>
        <v-nav class="d-flex justify-space-between">
          <div>
            <h2>Ordenes</h2>
          </div>
          <div>
            <v-btn outlined color="white">Recibidos
              <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
            </v-btn>
            <v-btn outlined color="white">Pendiente
              <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
            </v-btn>
            <v-btn outlined color="white">Completado
              <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
            </v-btn>
          </div>
        </v-nav>
        <h1>Bienvenido a la Home View</h1>
        <!-- Otros contenidos -->
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>