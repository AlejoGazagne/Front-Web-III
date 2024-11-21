<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  { text: 'Orders', icon: 'mdi-truck', action: () => router.push('/'), },
  { text: 'Add Product', icon: 'mdi-plus', action: () => router.push('/add-product'), }
]);

</script>

<template>
  <div>
    <v-navigation-drawer class="pt-3" app :width="325" permanent>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" class="cursor-pointer"
          :clickable="!!item.action" @click="item.action && item.action()" >

          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>

</style>