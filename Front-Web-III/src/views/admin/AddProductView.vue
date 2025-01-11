<script setup>
import AddProduct from "@/components/admin/AddProduct.vue";
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
      <div>
        <AddProduct />
      </div>
    </v-main>

  </v-app>
</template>
  
<style>
</style>