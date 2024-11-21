<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const codeBlocks = ref(Array(5).fill('')); // Five blocks initialized as empty
const activeBlock = ref(0); // Tracks the active input field
const error = ref(false); // Tracks validation error state

const router = useRouter();

// Validate password with the database
async function validatePassword() {
  const password = codeBlocks.value.join('');
  console.log(password);

  console.log(localStorage.getItem('token'));
  try {
    const response = await fetch(`http://localhost:8080/api/v1/charging-system/validate-password?password=${password}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
      
    });
    console.log(response.headers);
    if (response.ok) {
      const { preset } = await response.json();
      alert(`Validation successful! Preset: ${preset}`);
      // Clear fields after success
      router.push('/');
    } else {
      throw new Error('Invalid code');
    }
  } catch (error) {
    console.error(error);
    error.value = true;
  }
}

// Handle keypress and navigation
function handleInput(index, event) {
  error.value = false;
  const { value } = event.target;

  // Restrict to single digits
  if (!/^\d$/.test(value)) {
    codeBlocks.value[index] = '';
    return;
  }

  codeBlocks.value[index] = value;

  // Automatically move to the next block if not the last
  if (index < codeBlocks.value.length - 1) {
    activeBlock.value = ++index;
  }
}

// Handle deletion and navigation
function handleDelete(index, event) {
  const { key } = event;

  if (key === 'Backspace' && index > 0 && !codeBlocks.value[index]) {
    activeBlock.value = index - 1;
  }
}

// Handle pasting the code
function handlePaste(event) {
  error.value = false;
  const pastedData = event.clipboardData.getData('text').slice(0, 5);

  if (/^\d{1,5}$/.test(pastedData)) {
    pastedData.split('').forEach((num, i) => {
      codeBlocks.value[i] = num;
    });

    activeBlock.value = Math.min(pastedData.length, codeBlocks.value.length); // Set focus after the last input
  }

}
</script>

<template>
  <div>
    <div class="d-flex justify-center">
      <v-text-field
        v-for="(block, index) in codeBlocks"
        :key="index"
        v-model="codeBlocks[index]"
        class="mx-1"
        outlined
        dense
        type="text"
        maxlength="1"
        :autofocus="index === activeBlock"
        :error="error"
        @input="handleInput(index, $event)"
        @keydown="handleDelete(index, $event)"
        @paste="handlePaste"
      />
    </div>
    <v-alert
      v-if="error"
      type="error"
      dense
      text
      class="mt-2"
    >
      Invalid code, please try again.
    </v-alert>
    <v-btn color="primary" class="mt-3" @click="validatePassword">
      Validate
    </v-btn>
  </div>
</template>