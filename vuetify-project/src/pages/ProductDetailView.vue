<script lang="ts" setup>
import Header from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/useProductsStore';
import { computed, onMounted, ref } from 'vue';
import ProductDetail from '@/components/ProductDetail.vue';

const productStore = useProductStore();
const route = useRoute();
const productId = ref(route.params.id as string);

let product = ref();
const isLoading = computed(() => productStore.isLoading);

onMounted(async () => {
    if (productId.value) {
        if (!product.value) {
            product.value = await productStore.fetchProductById(Number(productId.value));
            console.log(product.value);
        }
    }
});

</script>

<template>
    <div class="page-container">
        <header>
            <Header/>
        </header>

        <v-container class="mt-14">
            <ProductDetail :product="product" v-if="product" />
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
</style>