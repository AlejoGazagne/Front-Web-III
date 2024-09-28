<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();

function handleLogout() {
    userStore.logout();
    router.push({ name: 'Home' });
}
</script>

<template>
    <div class="container">
        <h1>Admin profile view</h1>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

button {
    margin-top: 20px;
    padding: 15px 30px; /* Increased padding for a bigger button */
    font-size: 18px; /* Increased font size */
    cursor: pointer;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow */
    transition: box-shadow 0.3s ease;
}

button:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Slightly larger shadow on hover */
}
</style>
