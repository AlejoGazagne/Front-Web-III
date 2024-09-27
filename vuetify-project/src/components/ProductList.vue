<script lang="ts" setup>
import { onMounted, toRefs } from 'vue';
import { useProductStore } from '@/stores/useProductsStore';
import ProductItem from '@/components/ProductItem.vue';

const productStore = useProductStore();
const { products, isLoading } = toRefs(productStore);

onMounted(() => {
    productStore.fetchProducts();
});

</script>

<template>
    <v-container class="best-selling">
        <v-row>
            <v-col>
                <div v-if="isLoading">
                    <v-row>
                        <v-col v-for="i in 4" :key="i" cols="12" sm="3">
                            <v-skeleton-loader :elevation="2" type="card" width="300px"
                                class="mt-3"></v-skeleton-loader>
                        </v-col>
                    </v-row>

                </div>
                <section v-else class="catalog">
                    <ProductItem v-for="product in products" :key="product.id" :product="product"
                        @delete="productStore.deleteProduct" />
                </section>
            </v-col>
        </v-row>
    </v-container>

</template>

<style scoped>
.see-more {
    background-color: #C1DCDC;
    color: black;
}

.catalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>