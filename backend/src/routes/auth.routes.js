 
// Rutas de autenticación
// Solo tiene una ruta: POST /api/auth/login

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);

module.exports = router;