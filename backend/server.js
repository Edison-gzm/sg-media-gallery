// Punto de entrada del servidor
// Conecta a PostgreSQL y arranca Express en el puerto configurado

require('dotenv').config();
const app = require('./src/app');
const { conectarDB, sequelize } = require('./src/config/database');

const PORT = process.env.PORT || 4000;

const iniciarServidor = async () => {
  try {
    // Conecta a PostgreSQL
    await conectarDB();

    // Sincroniza los modelos con la base de datos
    // force: false para no borrar datos existentes
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con PostgreSQL');

    // Arranca el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}/api`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

iniciarServidor();