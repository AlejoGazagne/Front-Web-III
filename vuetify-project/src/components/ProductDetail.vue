<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const isEdit = ref(false);

const goToEdit = () => {
    isEdit.value = true
    //setTimeout(() => (load.value = false), 2000)
    router.push({ name: 'EditProduct', params: { id: props.product.id } });
}
</script>

<template>
    <v-row class="cart">
        <v-col class="d-flex justify-center align-center">
            <v-img :src=props.product.image alt="Imagen Producto" height="500"></v-img>
        </v-col>
        <v-col class="d-flex flex-column justify-space-between" cols="3">
            <div>
                <h2>{{ props.product.title }}</h2>
                <p>{{ props.product.category }}</p>
                <v-row align="center" class="mx-0 mt-2">
                    <v-rating :model-value=3 color="amber" density="compact" size="small" half-increments
                        readonly></v-rating>

                    <div class="text-grey ms-4">{{ props.product.rating.rate }} ({{ props.product.rating.count }})</div>
                </v-row>
                <p class="mt-10 mb-3">{{ props.product.description }}</p>
                <h3>Price: $ {{ props.product.price }}</h3>
            </div>
                    
            <v-btn width="min-content" class="ml-auto" @click="goToEdit">Editar</v-btn>
        </v-col>
    </v-row>
</template>

<style scoped>
.cart{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
