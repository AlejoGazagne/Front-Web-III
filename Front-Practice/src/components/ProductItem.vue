<script setup lang="ts">
import router from '@/router';
import { defineProps } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits<{
    (event: 'delete', id: number): void;
}>();

function deleteProduct(event) {
    event.stopPropagation();
    emit('delete', props.product.id);
}

const goToDetail = (id: number) => {
    router.push({ name: 'ProductDetail', params: { id } });
};
</script>

<template>
    <div class="product-card" v-if="product.rating.rate > 4" @click="goToDetail">
        <img :src="product.image" :alt="product.title">
        <div class="product-info">
            <h2>{{ product.title }}</h2>
            <p>{{ product.category }}</p>
            <p>Price: ${{ product.price }}</p>
        </div>
        <div class="buttons">
            <button>Editar</button>
            <button @click="deleteProduct">Borrar</button>
        </div>
    </div>
</template>

<style scoped>
.product-card {
    margin: 1rem;
    border: 1px solid #bebebe93;
    border-radius: 15px;
    background-color: #cacaca8e;
    transition-duration: .3s;
    width: min-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-card:hover {
    /* transform: matrix(1.05, 0, 0, 1.05, 0, 0); */
    box-shadow: 0 0 15px #52525298;
    cursor: pointer;
}

img {
    border-radius: 15px 15px 0 0;
    width: 250px;
    height: 250px;
    object-fit: cover;
}

.product-info {
    padding: .5rem 1rem;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: .8rem;
}

button {
    padding: .5rem 1rem;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    background-color: #515cb1;
    transition-duration: .3s;
}

button:hover {
    filter: brightness(1.4);
}

.buttons button:last-child {
    background-color: rgb(184, 0, 0);
}
</style>