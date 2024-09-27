<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
const route = useRoute()

const currentUrl = route.name
console.log(currentUrl)

const homeButtonClass = computed(() => {
  return currentUrl === 'Home' ? 'active-button' : 'inactive-button'
});
const productButtonClass = computed(() => {
  return currentUrl === 'Products' ? 'active-button' : 'inactive-button'
});

</script>

<template>
  <v-app-bar elevation="0">
    <v-row align="center">
      <v-col cols="2" offset="1">
        <router-link to="/" class="custom-link"><v-toolbar-title
            class="text-h5 font-weight-bold">Products</v-toolbar-title></router-link>
      </v-col>
      <v-col cols="6">
        <v-toolbar-items>
          <router-link to="/" class="custom-link"><v-btn :class="[homeButtonClass, 'custom-btn']">Home</v-btn></router-link>
          <router-link to="/" class="custom-link"><v-btn :class="[productButtonClass, 'custom-btn']">Products</v-btn></router-link>
        </v-toolbar-items>
      </v-col>
      <v-col cols="2" offset="1">
        <v-toolbar-items>
          <v-btn class="custom-btn"><v-icon>mdi-cart</v-icon></v-btn>
          <v-btn><v-icon>mdi-account</v-icon></v-btn>
        </v-toolbar-items>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.custom-link {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 2rem;
}

.active-button {
  color: black;
}

.inactive-button {
  color: gray;
}

.custom-btn {
  padding: 1rem 1rem;
}
</style>