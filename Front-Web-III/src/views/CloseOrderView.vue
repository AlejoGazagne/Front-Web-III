<script setup>
import CloseOrder from '@/components/CloseOrder.vue';
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import { ref } from 'vue';

const preset = ref('');


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
            <v-container>
                <h1>Close Order</h1>
                <CloseOrder />
            </v-container>
        </v-main>
    </v-app>
</template>

