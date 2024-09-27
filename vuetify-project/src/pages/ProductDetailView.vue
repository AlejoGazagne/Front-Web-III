<script lang="ts" setup>
import Header from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/useProductsStore';

const productStore = useProductStore();
const route = useRoute();

const producto = productStore.getProductById(Number(route.params.id));

</script>

<template>
    <div class="page-container">
        <header>
            <Header/>
        </header>

        <v-container v-if="producto" class="mt-14">
            <v-row>
                <v-col class="prueba d-flex justify-center align-center" cols="5" offset="2">
                    <img :src=producto alt="Imagen Producto">
                </v-col>
                <v-col class="prueba d-flex flex-column justify-space-between" cols="3">
                    <div>
                        <h2></h2>
                        <p>Category</p>
                        <v-row align="center" class="mx-0 mt-2">
                            <v-rating :model-value=3 color="amber" density="compact" size="small" half-increments
                                readonly></v-rating>

                            <div class="text-grey ms-4">
                                3 (200)
                            </div>
                        </v-row>
                        <p class="mt-10 mb-3">Description</p>
                        <h3>Price: $</h3>
                    </div>
                    
                    <v-btn width="min-content" class="ml-auto">Editar</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <footer>
            <Footer/>
        </footer>
        
    </div>
</template>

<style scoped>
.page-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 93dvh;
}
.prueba{
    border: 2px solid black;
}
</style>