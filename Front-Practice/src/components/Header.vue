<script setup lang="ts"></script>
<template>
    <header>
        <RouterLink to="/" id="title">Productos</RouterLink>
        <nav>
            <RouterLink to="/addProduct">Agregar Producto</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eeeff1;
    box-shadow: 0px 8px 15px #00000034;
    padding: .6rem 5%;
}
#title{
    padding: .4rem 0;
    font-size: 2.2rem;
    font-weight: bold;
    color: black;
    text-decoration: none;
    transition-duration: 0.3s;
}
#title:hover{
    color: #616ab2;
}
nav a{
    font-size: 1.3rem;
    text-decoration: none;
    color: black;
}
nav a:hover{
    color: #616ab2;
}
</style>
