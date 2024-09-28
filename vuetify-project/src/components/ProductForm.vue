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

console.log("que tengo aca aver")

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object
  }
});

console.log("hola2.0")
const formProduct = ref({ ...props.product });
console.log(formProduct.value)
watchEffect(() => {
  formProduct.value = { ...props.product };
});

const emit = defineEmits(['submit']);

const onSubmit = () => {
  emit('submit', formProduct.value);
};
</script>

<style scoped>
</style>