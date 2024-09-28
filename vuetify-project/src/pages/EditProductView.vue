<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ProductForm :isEdit="true" :product="existingProduct" @submit="handleSubmit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ProductForm from '@/components/ProductForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
console.log("aca hay parametros")
console.log(route.params)
// Mock existing product data for editing


const productId = route.params.id;
const existingProduct = ref(null)



const fetchExisting = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    console.log("y esto?")
    console.log (response)
    const data = await response.json();
    existingProduct.value = data; // Store the product data in the ref
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

onMounted(() => {
  fetchExisting(productId);
});
console.log("aver")
console.log(existingProduct)

// Handle form submission to update the product using the FakeStore API
const handleSubmit = async (product) => {
  try {
    const response = await fetch('http://localhost:5000/products/' + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const data = await response.json();
    console.log('Product updated:', data);
    router.push({ name: 'Home' });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
</script>