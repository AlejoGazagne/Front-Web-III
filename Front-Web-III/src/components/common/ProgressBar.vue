<script setup>
import { computed, ref, watch } from "vue";
import { useOrdersStore } from "@/stores/useOrdersStore";

const props = defineProps({
  currentMass: Number,
  externalId: String,
  caudal: Number,
  density: Number
});

const orderStore = useOrdersStore();
const preset = ref(null);

watch(() => props.externalId, async (newExternalId) => {
  if (newExternalId) {
    const order = await orderStore.fetchById(newExternalId);
    preset.value = order.preset;
  }
}, { immediate: true });

// Calculate progress percentage
const progress = computed(() => {
  if (!preset.value || preset.value === 0) return 0;
  return Math.min(100, ((props.currentMass / preset.value) * 100).toFixed(2));
});

// Calcular el caudal en Kg/s si la densidad es válida
const massFlowRate = computed(() => {
  if (!props.caudal || !props.density || props.caudal <= 0 || props.density <= 0) return 0;
  return props.caudal * props.density; // Kg/s
});

// Calculate estimated remaining time
const estimatedTime = computed(() => {
  if (!preset.value || !massFlowRate.value || massFlowRate.value <= 0) return "";
  const remainingMass = preset.value - props.currentMass;
  if (remainingMass <= 0) return "Finalizado";
  const timeInSeconds = remainingMass / massFlowRate.value;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
});

</script>

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
          <strong>{{ progress }}%  -  {{ estimatedTime }}</strong>
        </template>
      </v-progress-linear>
    </v-card>
</template>
  
  
<style scoped>
.v-progress-linear {
  font-size: 14px;
  font-weight: bold;
}
</style>