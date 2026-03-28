 
// Controlador de autenticación
// Maneja el login y genera el token JWT para el usuario

const jwt = require('jsonwebtoken');


const usuarios = [
  { id: 1, email: 'usuario@sg.com', password: '1234' }
];

const login = (req, res) => {
  const { email, password } = req.body;

 
  const usuario = usuarios.find(
    u => u.email === email && u.password === password
  );

 
  if (!usuario) {
    return res.status(401).json({
      mensaje: 'Email o contraseña incorrectos'
    });
  }

 // Genera el token JWT con los datos del usuario
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    mensaje: 'Login exitoso',
    token
  });
};

module.exports = { login };