<script setup>
    import { ref } from "vue";
    import axios from "axios";
  
  
    const productName = ref("");
    const temperatureLimit = ref("");
    const valid = ref(false);
    const error = ref(null);
    const success = ref(null);
  
  
    const rules = {
        required: (value) => !!value || "This field is required.",
        isNumber: (value) =>
        !isNaN(parseFloat(value)) && isFinite(value) || "Must be a number.",
    };
  
  
    async function submitProduct() {
        error.value = null;
        success.value = null;
  
    const payload = {
        name: productName.value,
        temperatureLimit: parseFloat(temperatureLimit.value),
    };
  
    try {
      const response = fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      if (response.ok){
        success.value = "Product added successfully!";
        productName.value = "";
        temperatureLimit.value = "";
        //emit("product-added", response.data);

      }else{
        error.value = "Failed to add product. Please try again.";
      }

    } catch (err) {
      error.value =
        err.response?.data?.message;
    }
  }
</script>

  <template>
    <div class="add-product">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Product Name"
          v-model="productName"
          :rules="[rules.required]"
          required
        ></v-text-field>
  
        <v-text-field
          label="Temperature Limit"
          v-model="temperatureLimit"
          :rules="[rules.required, rules.isNumber]"
          required
          type="number"
        ></v-text-field>
  
        <v-btn :disabled="!valid" color="primary" @click="submitProduct">
          Add Product
        </v-btn>
      </v-form>
      <v-alert
        v-if="error"
        type="error"
        dismissible
        v-text="error"
        class="mt-3"
      ></v-alert>
      <v-alert
        v-if="success"
        type="success"
        dismissible
        v-text="success"
        class="mt-3"
      ></v-alert>
    </div>
  </template>
  
    
  <style>
  .add-product {
    padding: 20px;
  }
  </style>
  