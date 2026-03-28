// Rutas de la API para el contenido de la galería y los favoritos
// Las rutas de favoritos están protegidas por autenticación

const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenido.controller');
const verificarToken = require('../middleware/auth.middleware');

// Rutas públicas - cualquiera puede ver el contenido
router.get('/contenido', contenidoController.obtenerContenido);
router.get('/contenido/:id', contenidoController.obtenerContenidoPorId);

// Rutas protegidas - solo usuarios autenticados pueden ver y modificar favoritos
router.get('/favoritos', verificarToken, contenidoController.obtenerFavoritos);
router.post('/favoritos', verificarToken, contenidoController.agregarFavorito);
router.delete('/favoritos/:id', verificarToken, contenidoController.eliminarFavorito);

module.exports = router;