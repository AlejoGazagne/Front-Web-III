<script setup>
import AddProduct from "@/components/common/AddProduct.vue";
import Header from "@/components/layout/Header.vue";
import Menu from "@/components/layout/Menu.vue";
</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />
    
    <v-main>
      <div class="add-product-view">
        <h1>Add New Product</h1>
        <AddProduct />
      </div>
    </v-main>

  </v-app>
  </template>
  
  
  <style>
  .add-product-view {
    padding: 20px;
    max-width: 600px;
    margin: auto;
  }
  </style>