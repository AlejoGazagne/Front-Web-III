<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'

const load = ref(false)

function viewMore(id: number) {
    load.value = true
    setTimeout(() => (load.value = false), 2000)
    router.push({ name: 'ProductDetail', params: { id } });
}

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <v-card :disabled="load" :isLoading="load" class="mx-auto my-12 product-card" max-width="374">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img height="250" :src=product.image alt="Imagen producto" cover></v-img>

        <v-card-item>
            <v-card-title>{{ product.title }}</v-card-title>
        </v-card-item>

        <v-card-text class="flex-grow-1">
            <v-row align="center" class="mx-0">
                <v-rating :model-value="product.rating.rate" color="amber" density="compact" size="small" half-increments
                    readonly></v-rating>

                <div class="text-grey ms-4">
                    {{ product.rating.rate }} ({{ product.rating.count }})
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                Price: $ {{ product.price }}
            </div>

            <div>{{ product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description }} </div>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn color="deep-black-lighten-2" text="View more" block border @click="viewMore(product.id)"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.product-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.product-card .v-card-text {
    flex-grow: 1;
}

.product-card .v-card-actions {
    margin-top: auto;
}
</style>