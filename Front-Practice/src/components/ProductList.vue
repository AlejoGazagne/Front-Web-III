<script setup lang="ts">
// importar ProductItem
import ProductItem from './ProductItem.vue'
</script>
<template>
    <main>
        <p>Lista de productos</p>
        <section class="catalogo">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </section>
    </main>
</template>
<style scoped>
main {
    margin: 5rem 5%;
}
main p{
    font-size: 1.5rem;
    font-weight: bold;
}
.catalogo{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>