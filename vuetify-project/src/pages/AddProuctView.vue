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
  
  const newProduct = ref({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });
  
  const handleSubmit = async (product) => {
    try {
      const response = await fetch('http://localhost:3000', {
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