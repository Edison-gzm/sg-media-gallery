 // Servicio de conexión con el backend
// Centraliza todas las peticiones HTTP al API

import axios from 'axios';

// URL base
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
});

// Interceptor - agrega el token JWT automáticamente a cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicios de contenido
export const obtenerContenido = () => API.get('/contenido');
export const obtenerContenidoPorId = (id) => API.get(`/contenido/${id}`);

// Servicios de favoritos
export const obtenerFavoritos = () => API.get('/favoritos');
export const agregarFavorito = (contenidoId) => API.post('/favoritos', { contenidoId });
export const eliminarFavorito = (id) => API.delete(`/favoritos/${id}`);

// Servicios de autenticación
export const login = (email, password) => API.post('/auth/login', { email, password });
