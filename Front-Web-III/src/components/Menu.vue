<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' },
]);
</script>

<template>
  <div class="pt-3">
    <v-list disabled>
      <!-- <v-list-subheader>MENU</v-list-subheader> -->

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      > 
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>

</style>