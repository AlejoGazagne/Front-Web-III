<script lang="ts" setup>
import { ref } from 'vue';

// Variables reactivas
const page = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(1);
const countAlarms = ref(0);

const dialog = ref(false);

const headers = ref([
  { align: 'start' as const, key: 'name', sortable: false, title: 'Compañía', width: '20rem'},
  { title: 'Ordenes emitidas', key: 'orders', sortable: false, width: '20rem' },
  { title: '', key: 'actions', sortable: false, width: '10rem' },
]);

const desserts = ref([
  { id: 1, name: 'admin', mail: "admin@mail.com", orders: 6, enable: 'Si' },
  { id: 2, name: 'Ice cream sandwich', mail: 237, orders: 9.0, enable: 'Si' },
  { id: 3, name: 'Eclair', mail: 262, orders: 16.0, enable: 'Si' },
  { id: 4, name: 'Cupcake', mail: 305, orders: 3.7, enable: 'Si' },
  { id: 5, name: 'Gingerbread', mail: 356, orders: 16.0, enable: 'Si' },
  { id: 6, name: 'Jelly bean', mail: 375, orders: 0.0, enable: 'Si' },
  { id: 7, name: 'Lollipop', mail: 392, orders: 0.2, enable: 'Si' },
  { id: 8, name: 'Honeycomb', mail: 408, orders: 3.2, enable: 'Si' },
  { id: 9, name: 'Donut', mail: 452, orders: 25.0, enable: 'Si' },
  { id: 10, name: 'KitKat', mail: 518, orders: 26.0, enable: 'No' },
]);

const handleCancel = () => {
  dialog.value = false;
};

const handleSave = async () => {
  if (false) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  try {
    

    dialog.value = false;
  } catch (error) {
    
  }
}
</script>

<template>
  <div>
    <h2 class="text-h5 ml-6 mt-3 mb-2">Usuarios de la empresa</h2>
    <v-row>
      <v-col cols="4" class=" ml-6 mt-3">
        <p>Administradores y operarios de la empresa</p>
      </v-col>
      <v-col>
        <v-data-table
    v-model:page="page"
    :headers="headers"
    :items="desserts"
    :items-per-page="itemsPerPage"
    class="probando"
  >
    <!-- personalizar la última columna -->
    <template v-slot:item.actions="{ item }">
      <div>
        <!-- Botón Agregar Producto -->
        <v-dialog v-model="dialog" max-width="500" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps">
              <Icon icon="mdi:pencil" height="15px" class="mr-2" />
              <span>Editar</span>
            </v-btn>
          </template>

          <v-card class="dialog-card">
            <v-card-title>Editar Usuario</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <!-- Input para el Nombre del Producto -->
                  <v-text-field
                    label="Ingrese el nombre del producto"
                    placeholder="Butano"
                    outlined
                    dense
                    clearable
                    required
                    append-inner-icon="mdi-cube-outline"
                    class="custom-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <!-- Input para la Temperatura Máxima -->
                  <v-text-field
                    label="Ingrese la temperatura máxima (°C)"
                    outlined
                    dense
                    placeholder="-25.5"
                    clearable
                    required
                    append-inner-icon="mdi-thermometer"
                    type="text"
                    :rules="[value => /^-?\d*(\.|,)?\d*$/.test(value) || 'Debe ser un número válido']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-row justify="end" class="action-buttons mr-5 mb-3">
                <v-btn @click="handleCancel" variant="outlined">Cancelar</v-btn>
                <v-btn @click="handleSave" variant="tonal">Guardar</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="totalPages" size="small" class="custom-pagination"></v-pagination>
      </div>
    </template>
  </v-data-table>
      </v-col>
    </v-row>
  </div>
  
</template>

<style scoped>
.probando{
  width: 100%;
}
</style>