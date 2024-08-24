<script setup lang="ts"></script>
<template>
    <div class="product-card">
        <img src="../assets/suit-2.png" alt="Producto">
        <div class="product-info">
            <h2>Titulo</h2>
            <p>descripccion</p>
            <p>Precio</p>
        </div>
    </div>
</template>
<style scoped>
.product-card{
    margin: 1rem;
    border: 1px solid #cccccc93;
    border-radius: 15px;
    background-color: #f0ebfc8e;
    transition-duration: .3s;
    width: min-content;
}
.product-card:hover{
    transform: matrix(1.05, 0, 0, 1.05, 0, 0);
    box-shadow: 0 0 15px #5252523d;
    cursor: pointer;
}
img{
    border-radius: 15px 15px 0 0;
}
.product-info{
    padding: .5rem 1rem;
}
</style>