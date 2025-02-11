<script setup>
import WebsocketTest from '@/components/common/WebsocketTest.vue';
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';



</script>

<template>
    <v-app>
        <v-app-bar app clipped >
            <Header />
        </v-app-bar>

        <Menu />
        <v-main>
            <v-container>
                <h1>WS testing</h1>
                <WebsocketTest/>
            </v-container>
        </v-main>
    </v-app>
  </template>
  
