// Gallery and favorites routes - favorites routes are protected by authentication

const express = require('express');
const router = express.Router();
const { getContent, getContentById, getFavorites, addFavorite, removeFavorite } = require('../controllers/contenido.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/content', getContent);
router.get('/content/:id', getContentById);

// Protected routes
router.get('/favorites', verifyToken, getFavorites);
router.post('/favorites', verifyToken, addFavorite);
router.delete('/favorites/:id', verifyToken, removeFavorite);

module.exports = router;