<template>
    <v-card :disabled="load" :isLoading="load" class="mx-auto my-12 product-card" max-width="280">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img height="250" :src=props.product.image alt="Imagen producto" cover></v-img>

        <v-card-item>
            <v-card-title>{{ props.product.title }}</v-card-title>
        </v-card-item>

        <v-card-text class="flex-grow-1">
            <v-row align="center" class="mx-0">
                <v-rating :model-value="props.product.rating.rate" color="amber" density="compact" size="small"
                    half-increments readonly></v-rating>

                <div class="text-grey ms-4">
                    {{ props.product.rating.rate }} ({{ props.product.rating.count }})
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                Price: $ {{ props.product.price }}
            </div>

            <div>{{ props.product.description.length > 100 ? props.product.description.substring(0, 100) + '...' :
                props.product.description }}
            </div>
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn color="deep-black-lighten-2" text="View more" block border @click="viewMore"></v-btn>
            <!-- TODO pasar parametros por state. -->
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'

const load = ref(false)
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const viewMore = () => {
    load.value = true
    setTimeout(() => { 
        load.value = false     
        router.push({ name: 'ProductDetail', params: { id: props.product.id } });
    }, 2000)
}



</script>