<script setup>
import { computed, ref, watch } from "vue";
import { useOrdersStore } from "@/stores/useOrdersStore";

const props = defineProps({
  currentMass: Number,
  externalId: String
});

const orderStore = useOrdersStore();

console.log(props);
console.log(props.currentMass);
console.log(props.externalId);
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
          <strong>{{ progress }}%</strong>
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