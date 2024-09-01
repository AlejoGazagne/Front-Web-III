<script lang="ts" setup>
import { computed, onMounted, toRefs } from 'vue';
import { useProductStore } from '@/stores/useProductStore';
import ProductItem from '@/components/ProductItem.vue';

const productStore = useProductStore();
const { products, isLoading } = toRefs(productStore);

console.log(products.value);

onMounted(() => {
    productStore.fetchProducts();
});
const topProducts = computed(() => {
    return products.value.slice().sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
});

</script>

<template>
    <v-container class="best-selling">
        <v-row>
            <v-col cols="2" offset="">
                <h3 class="mb-6 mt-15">Best Selling</h3>
                <v-btn class="see-more">See more <v-icon icon="mdi-arrow-right" class="pl-3" start></v-icon></v-btn>
            </v-col>
            <v-col>
                <h3 v-if="isLoading" class="mt-2">Loading... </h3>
                <section v-else class="catalog">
                    <ProductItem v-for="product in topProducts" :key="product.id" :product="product"
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
.catalog{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>