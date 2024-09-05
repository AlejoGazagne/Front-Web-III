<script lang="ts" setup>
import { ref } from 'vue';

const icons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']);

</script>

<template>
    <v-footer class="footer text-center d-flex flex-column mt-10">
        <div>
            <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
        </div>

        <div class="pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris
            cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id 
            ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. 
            Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. 
            Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
        </div>

        <v-divider></v-divider>

        <div>
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </div>
    </v-footer>
</template>

<style scoped>
.footer{
  background-color: #7b9c9c;
}

</style>