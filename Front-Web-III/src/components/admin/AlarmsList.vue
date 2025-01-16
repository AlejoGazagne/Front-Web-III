<script lang="ts" setup>
import AlarmOrder from './AlarmOrder.vue';

</script>

<template>
  <div class="custom-card">
    <v-row class="mb-3 mr-5 ml-2 mt-1">
      <div class="list-alarm d-flex justify-space-between align-center">
        <h3 class="text-h5">Lista de alarmas</h3>
      </div>
    </v-row>

    <v-row class="list-alarm">
      <AlarmOrder />
    </v-row>
  </div>
</template>

<style scoped>
.list-alarm {
  width: 100%;
}
.custom-card{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
}
</style>