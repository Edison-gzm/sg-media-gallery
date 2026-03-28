// Configuración principal de Express
// Este archivo configura todos los middlewares y rutas de la aplicación

const express = require('express');
const cors = require('cors');
const contenidoRoutes = require('./routes/contenido.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', contenidoRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de la Galería Interactiva funcionando correctamente' });
});

module.exports = app;