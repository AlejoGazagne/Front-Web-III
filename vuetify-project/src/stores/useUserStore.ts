// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // Reactive state
  const user = ref(null);
  const role = ref(null);

  // Action to log in
  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}&_limit=1`);
      const result = await response.json();

      if (result.length) {
        const loggedUser = result[0];
        user.value = loggedUser;
        role.value = loggedUser.role;

        // Save token to localStorage
        localStorage.setItem('token', `${loggedUser.role},${loggedUser.id}`);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Action to log out
  const logout = () => {
    user.value = null;
    role.value = null;
    localStorage.removeItem('token');
  };

  // Action to check user role
  const checkRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const [savedRole, userId] = token.split(',');
      role.value = savedRole;
      // Fetch and set user based on the token
      fetchUser(userId);
    } else {
      role.value = null;
    }
  };

  const isAdmin = () => role.value === 'admin';
  const isUser = () => role.value === 'user';

  // Fetch the user by ID from localStorage (on reload)
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const loggedUser = await response.json();
      user.value = loggedUser;
      role.value = loggedUser.role;
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  return { user, role, login, logout, checkRole, isAdmin, isUser };
});