<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <ProductForm :isEdit="false" :product="newProduct" @submit="handleSubmit" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import ProductForm from '@/components/ProductForm.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // New product data for adding a product
  const newProduct = ref({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating:''
  });
  
  // Handle form submission to add a new product using the FakeStore API
  const handleSubmit = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      console.log('Product added:', data);
      router.push({ name: 'Home' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  </script>