<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' },
  {
    text: 'Validate Password',
    icon: 'mdi-key',
    action: () => router.push('/validate-password'), // Define action for the button
  },
  {
    text: 'Register First Weighing',
    icon: 'mdi-truck',
    action: () => router.push('/register-first-weighing'), // Define action for the button
  }
]);
</script>

<template>
  <div class="pt-3">
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        class="cursor-pointer"
        :clickable="!!item.action"
        @click="item.action && item.action()"
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