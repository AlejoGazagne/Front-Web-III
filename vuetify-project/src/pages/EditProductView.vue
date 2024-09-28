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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Mock existing product data for editing
  const existingProduct = ref({
    id: 1,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });
  
  // Handle form submission to update the product using the FakeStore API
  const handleSubmit = async (product) => {
    try {
      const response = await fetch('http://localhost:3000/products/' + product.id, {
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