 // Punto de entrada del servidor
// Este archivo es el responsable de hacer que el servidor inicie correctamente
// y conectar todas las piezas juntas

const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});
