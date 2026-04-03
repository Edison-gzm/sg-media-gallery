// The Axios library is used to connect the backend with the frontend, tokens are automatically injected into every request for security reasons, 
// and functions are included to facilitate or speed up programming.

import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getContent = () => API.get('/contenido');
export const getContentById = (id) => API.get(`/contenido/${id}`);

export const getFavorites = () => API.get('/favoritos');
export const addFavorite = (contentId) => API.post('/favoritos', { contenidoId: contentId });
export const deleteFavorite = (id) => API.delete(`/favoritos/${id}`);

export const login = (email, password) => API.post('/auth/login', { email, password });