<script setup lang="ts">
import ProductItem from './ProductItem.vue'
import { onMounted, ref } from 'vue';

const products = ref([])
const isFinished = ref(false)

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        products.value = data
    } catch (error) {
        console.error('Error al obtener productos:', error)
    } finally {
        isFinished.value = true
    }
}

onMounted(() => {
    fetchProducts()
})

function deleteProduct(id: number) {
    products.value = products.value.filter(product => product.id !== id)
}

</script>

<template>
    <main>
        <p>Lista de productos</p>
        <h3 v-if="!isFinished">Cargando caralogo... </h3>
        <section v-else class="catalogo">
            <ProductItem v-for="product in products" :key="product.id" :product="product" @delete="deleteProduct" />
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