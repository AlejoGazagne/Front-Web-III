<script lang="ts" setup>
import UsersList from '@/components/admin/UsersList.vue';
</script>

<template>

  <div class="custom-card">
    <v-row>
      <UsersList />
    </v-row>
  </div>

</template>

<style scoped>
.probando {
  padding: 0;
}
.custom-card{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
}
</style>