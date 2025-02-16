<template>
    <v-card class="pa-2">
      <v-progress-linear
        :model-value="progress"
        color="green"
        height="25"
        rounded
        striped
      >
        <template v-slot:default>
          <strong>{{ progress }}%</strong>
        </template>
      </v-progress-linear>
    </v-card>
  </template>
  
  <script setup>
  import { computed, ref, watch } from "vue";
  import { useOrdersStore } from "@/stores/useOrdersStore"; // Adjust the path as needed
  
  const props = defineProps({
    currentMass: Number, // Receives the current mass from the parent component
    externalId: String
  });
  
  const orderStore = useOrdersStore(); // Pinia store
  console.log("sexo11");
  console.log(props);
  console.log(props.currentMass);
  console.log(props.externalId);
  const preset = ref(null);
  // Get preset mass from Pinia
  //const order = computed(() => orderStore.fetchById(props.externalId));
  watch(() => props.externalId, async (newExternalId) => {
    if (newExternalId) {
      const order = await orderStore.fetchById(newExternalId);
      preset.value = order.preset;
    }
  }, { immediate: true }); 
  console.log("sexo12");
  console.log(preset.value);
  // Calculate progress percentage
  const progress = computed(() => {
    if (!preset.value || preset.value === 0) return 0;
    return Math.min(100, ((props.currentMass / preset.value) * 100).toFixed(2));
  });
  </script>
  
  <style scoped>
  .v-progress-linear {
    font-size: 14px;
    font-weight: bold;
  }
  </style>