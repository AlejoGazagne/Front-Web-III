<script lang="ts" setup>
import { computed, onMounted, toRefs } from 'vue';
import NavBar from '@/components/NavBar.vue'
import ItemsList from '@/components/ProductList.vue'
import Footer from '@/components/Footer.vue'
import { useProductStore } from '@/stores/useProductStore';

const productStore = useProductStore();
const { products, isLoading } = toRefs(productStore);

onMounted(() => {
  productStore.fetchProducts();
});

const topProducts = computed(() => {
  return products.value.slice().sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
});

</script>

<template>
  <header>
    <NavBar />
  </header>
  <v-container class="mt-10">
    <div class="row py-5 banner-bar">
      <div class="col px-10">
        <h1>Productos</h1>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
    </div>
    <v-row>
      <v-col cols="2" offset="">
        <h3 class="mb-6 mt-15">Best Selling</h3>
        <v-btn class="see-more">See more <v-icon icon="mdi-arrow-right" class="pl-3" start></v-icon></v-btn>
      </v-col>
      <v-col class="d-flex flex-wrap justify-lg-space-around">
        <ProductItem v-for="product in topProducts" :key="product.id" :product="product"
          @delete="productStore.deleteProduct" />
      </v-col>
    </v-row>

  </v-container>

  <footer>
    <Footer />
  </footer>

</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.banner-bar {
  background-color: #7b9c9c;
  border-radius: .5rem;
}
</style>
