<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import ItemsList from '@/components/ProductList.vue'
import Footer from '@/components/Footer.vue'
// import Item from '@/components/ProductItem.vue'


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
    <ItemsList />
  </v-container>

  <footer>
    <Footer/>
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
