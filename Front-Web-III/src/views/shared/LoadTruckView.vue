<script setup>
import LoadingTruck from '@/components/common/LoadingTruck.vue';
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import { ref } from 'vue';

const preset = ref('');


</script>

<template>
    <v-app>
        <v-app-bar app clipped >
            <Header />
        </v-app-bar>

        <Menu />
        <v-main>
            <v-container>
                <h1>Realtime Loading</h1>
                <LoadingTruck :preset="preset" />
            </v-container>
        </v-main>
    </v-app>
  </template>
  
