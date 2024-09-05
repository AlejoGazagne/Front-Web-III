import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as any[], // Add type annotation for the products array
        isLoading: false
    }),
    actions: {
        async fetchProducts() {
            this.isLoading = true;
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                // const response = await fetch('https://dummyjson.com/products');
                // const data = await response.json();
                // console.log(data)
                this.products = data;
            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async updateProduct(product: any) {
            const index = this.products.findIndex(p => p.id === product.id);
            this.products[index] = product;
            if (index === -1) {
                console.log('Producto no encontrado para editar');
            }
        },
        async deleteProduct(id: number) {
            this.products = this.products.filter(product => product.id !== id)
        }
    },
    getters: {
        getProductById: (state) => (id: string) => {
            return state.products.find(product => product.id === Number(id))
        }
    }
})