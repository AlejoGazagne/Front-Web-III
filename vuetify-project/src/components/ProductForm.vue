<template>
    <v-card class="mx-auto my-4" max-width="600">
      <v-card-title>
        {{ isEdit ? 'Edit Product' : 'Add Product' }}
      </v-card-title>
  
      <v-card-text>
        <form @submit.prevent="onSubmit">
          <v-text-field v-model="formProduct.title" label="Title" />
          <v-text-field v-model="formProduct.price" label="Price" />
          <v-textarea v-model="formProduct.description" label="Description" />
          <v-text-field v-model="formProduct.category" label="Category" />
          <v-text-field v-model="formProduct.image" label="Image URL" />
        </form>
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="primary" @click="onSubmit">{{ isEdit ? 'Update Product' : 'Add Product' }}</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  // Props passed from parent components
  const props = defineProps({
    isEdit: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      default: () => ({
        title: '',
        price: 0,
        description: '',
        category: '',
        image: ''
      })
    }
  });
  
  // Local state for the product form (copy of the product prop)
  const formProduct = ref({ ...props.product });
  
  // Sync the formProduct with the passed product when editing
  watchEffect(() => {
    formProduct.value = { ...props.product };
  });
  
  // Emit the submit event to the parent when the form is submitted
  const emit = defineEmits(['submit']);
  
  const onSubmit = () => {
    emit('submit', formProduct.value);
  };
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>