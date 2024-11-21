<script setup>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import Validation from '@/components/Validation.vue';
</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    <v-navigation-drawer :width="217" permanent>
      <Menu />
    </v-navigation-drawer>
    <v-main>
      <v-container class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card elevation="3" class="pa-6" width="400">
        <v-card-title class="text-h5">Password Validation</v-card-title>
        <v-card-text>
          <Validation />
        </v-card-text>
      </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>