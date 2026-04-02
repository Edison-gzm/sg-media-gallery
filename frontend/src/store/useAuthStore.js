// Global authentication state managed with Zustand.

import { create } from 'zustand';
import { loginUser } from '../api/auth.api';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email, password) => {
    const response = await loginUser(email, password);
    const { token } = response.data;
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('favorites');
    set({ token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;