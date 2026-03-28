// Middleware de autenticación con JWT
// Verifica que el usuario tenga un token válido antes de acceder a los favoritos

const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Busca el token en el header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Si no hay token, rechaza
  if (!token) {
    return res.status(401).json({
      mensaje: 'Acceso denegado. Debes iniciar sesión.'
    });
  }

  // Verifica que el token sea válido
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({
        mensaje: 'Token inválido o expirado.'
      });
    }
    req.usuario = usuario;
    next();
  });
};

module.exports = verificarToken;
