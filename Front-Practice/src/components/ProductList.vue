<script setup lang="ts">
import ProductItem from './ProductItem.vue'
import { onMounted, ref, toRefs } from 'vue';
import { useProductStore } from '@/stores/useProductStore'

const productStore = useProductStore()
const { products, isFinished } = toRefs(productStore);

onMounted(() => {
    productStore.fetchProducts()
})

</script>

<template>
    <main>
        <p>Lista de productos</p>
        <h3 v-if="!isFinished">Cargando caralogo... </h3>
        <section v-else class="catalogo">
            <ProductItem v-for="product in products" :key="product.id" :product="product" @delete="productStore.deleteProduct" @detail=""/>
        </section>
    </main>
</template>

<style scoped>
main {
    margin: 5rem 5%;
}

main p {
    font-size: 1.5rem;
    font-weight: bold;
}

.catalogo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-items: stretch;
}
</style>