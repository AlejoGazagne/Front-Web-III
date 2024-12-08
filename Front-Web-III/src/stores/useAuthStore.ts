import { defineStore } from 'pinia';
import type { UserData } from '../types/user';
import { login } from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    userData: JSON.parse(localStorage.getItem('userData') || '{}') as UserData,
  }),
  actions: {
    async login(username: string, password: string) {
      try{
        const response = await login(username, password);

        this.setToken(response.token);
        
        const userData: UserData = {
          id: response.id,
          name: response.username,
          roles: response.roles,
        };

        this.setUserData(userData);

        return true;
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false;
      }
    },

    setToken(token: string) {
      this.token = token;
      this._syncLocalStorage('token', token);
    },

    setUserData(userData: UserData) {
      this.userData = userData;
      this._syncLocalStorage('userData', JSON.stringify(userData));
    },

    loadFromLocalStorage() {
      try {
        this.token = localStorage.getItem('token');
        localStorage.getItems('userRole')
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}') as UserData;
      } catch (error) {
        console.error('Error al cargar datos de localStorage:', error);
        this.clearAuth();
      }
    },

    clearAuth() {
      this.token = null;
      this.userData.roles = [];
      this.userData = {} as UserData;
      this._clearLocalStorage();
    },

    _syncLocalStorage(key: string, value: string) {
      localStorage.setItem(key, value);
    },

    _clearLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // true si el usuario está autenticado
    getRoles: (state) => state.userData.roles,
    getUserData: (state) => state.userData,
    getToken: (state) => state.token,
  },

});