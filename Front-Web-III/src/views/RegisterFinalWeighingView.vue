<script lang="ts" setup>
import FinalWeighing from '../components/FinalWeighing.vue';
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';


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
                <FinalWeighing />
            </v-container>
        </v-main>
    </v-app>
</template>
