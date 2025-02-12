import { defineStore } from 'pinia';
import type { UserData } from '../types/user';
import { login } from '../services/authService';
import { connect, disconnect } from '../services/wsService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    userData: JSON.parse(localStorage.getItem('userData') || '{}') as UserData,
  }),
  actions: {
    async login(username: string, password: string) {
      try{
        const response = await login(username, password);

        console.log('Respuesta del login:', response);

        this.setToken(response.token);
        
        const userData: UserData = {
          id: response.id,
          name: response.username,
          roles: response.roles,
          mail: response.email,
          enabled: true
        };

        this.setUserData(userData);

        connect(response.token);

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
      disconnect();
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