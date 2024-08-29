<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import { useProductStore } from '@/stores/useProductStore';

const productStore = useProductStore()
const route = useRoute()
const idProduct = route.params.id
const product = ref(productStore.getProductById(idProduct.toString()));
const isFinished = ref(productStore.isFinished)

// onMounted(() => {
//     productStore.fetchProductById(idProduct.toString()).then((result) => {
//         product.value = result;
//     }).catch((error) => {
//         console.error('Error fetching product:', error);
//     }).finally(() => {
//         isFinished.value = true;
//     });
// })

const fetchProduct = async () => {
    if (!product.value) {
        await productStore.fetchProductById(idProduct.toString());
    }
};

onMounted(fetchProduct);

</script>

<template>
    <Header />

    <div class="container">
        <h2>Product detail view</h2>
        <div class="product-cart" v-if="isFinished">
            <img :src="product.value.image" :alt="product.value.title">
            <div class="product-info">
                <h2>{{ product.value.title }}</h2>
                <p>Category: {{ product.value.category }}</p>
                <p>{{ product.value.description }}</p>
                <p>Price: ${{ product.value.price }}</p>
            </div>
        </div>
        
    </div>

</template>
<style scoped>
    .container {
        margin: 2rem 5%;
    }
    .product-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 2rem;
        background-color: #cacaca4b;
        border: 1px solid #bebebe93;
        border-radius: 15px;
    }
    img {
        height: 60%;
        margin: 1rem;
    }
    .product-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>