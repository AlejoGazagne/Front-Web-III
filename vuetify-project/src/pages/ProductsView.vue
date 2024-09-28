<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import ProductsList from '@/components/ProductList.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
    <header>
        <NavBar />
    </header>
    <div>
        <h1>Products</h1>
        <ProductsList />
    </div>
    <footer>
        <Footer />
    </footer>
</template>

<style scoped></style>