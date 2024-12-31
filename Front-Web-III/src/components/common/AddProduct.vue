<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchProducts } from '@/services/productService';
import { fetchProductsCount } from '@/services/orderService';
import { fetchProduct } from '@/services/productService';
import type { Product } from '@/types/product';

const dialog = ref(false);

const headers = [
  { title: 'Nombre', value: 'name', align: 'start' },
  { title: 'Temperatura Máxima', value: 'temperaturaLimite', align: 'end' },
  { title: 'Cant. Pedidos', value: 'count', align: 'end' },
];

const products = ref<{ name: string; temperaturaLimite: number; count: number }[]>([]);

const updateProduct = async () => {
  const data = await fetchProducts();

  for (const product of data) {
    products.value.push({
      name: product.name,
      temperaturaLimite: product.limit_temperature,
      count: 0,
    });
  }
}

const updateProductCount = async () => {
  const data = await fetchProductsCount();

  for (const countData of data) {
    const product = products.value.find((p) => p.name === countData.productName);
    if (product) {
      product.count = countData.count;
    }
  }
};

onMounted(async () => {
  await updateProduct();
  await updateProductCount();
});

// Variables reactivas para los inputs
const productName = ref('');
const maxTemperature = ref<string>('');

const handleCancel = () => {
  productName.value = '';
  maxTemperature.value = '';
  dialog.value = false;
};

const handleSave = async () => {
  if (!productName.value || maxTemperature.value === '') {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  try {
    const newProduct = { id: 0, limit_temperature: parseFloat(maxTemperature.value), name: productName.value };

    await fetchProduct(newProduct)

    products.value.push({
      name: productName.value,
      temperaturaLimite: parseFloat(maxTemperature.value),
      count: 0,
    });

    dialog.value = false;
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    const err = error as { response: { data: { message: string } } };
    alert('Ocurrió un error al guardar el producto. ' + err.response.data.message.split(',')[0]);
  }
}
</script>

<template>
  <div class="contenedor">
    <!-- Encabezado -->
    <v-row class="d-flex align-center justify-space-between mb-6 mt-3">
      <h2>Lista de Productos</h2>

      <div class="d-flex align-center gap-2">
        <!-- Botón Agregar Producto -->
        <v-dialog v-model="dialog" max-width="500" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps">
              <Icon icon="mdi-plus" height="24px" />
              Agregar Producto
            </v-btn>
          </template>

          <v-card class="dialog-card">
            <v-card-title>Agregar Producto</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <!-- Input para el Nombre del Producto -->
                  <v-text-field
                    v-model="productName"
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
                    v-model="maxTemperature"
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
    </v-row>

    <!-- Tabla -->
    <v-data-table-virtual
      :headers="headers"
      :items="products"
      item-value="name"
      class="tabla"
    ></v-data-table-virtual>
  </div>
</template>

<style scoped>
.contenedor {
  margin: 2rem 3rem;
  width: 95%;
}
.tabla {
  border: 1px solid #bebebe;
  border-radius: 10px;
}

</style>