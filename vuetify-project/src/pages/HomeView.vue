<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import ItemsList from '@/components/ProductList.vue'
// import Item from '@/components/ProductItem.vue'

</script>

<template>
  <header>
    <NavBar />
  </header>
  <v-container class="mt-10">
    <ItemsList />
  </v-container>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
