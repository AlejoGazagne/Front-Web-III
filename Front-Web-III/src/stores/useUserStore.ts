import { defineStore } from "pinia";
import { ref } from "vue";


export const useUserStore = defineStore('user', () => {
    const token = ref(null);

    
    const login= async (extToken) => {
        token.value = extToken;
        localStorage.setItem('token', extToken);
    };

    const logout =  () => {
        token.value = null;
        localStorage.removeItem('token');
    };
    const isLoggedInCheck =  () => {

        return (localStorage.getItem('token') !== null);
    };

    return  { isLoggedInCheck, logout, login };
});

