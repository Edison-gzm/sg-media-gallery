 // Configuración de la conexión a PostgreSQL usando Sequelize
// Lee las variables del archivo .env para no exponer datos sensibles

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Desactiva logs de SQL en consola
  }
);

// Función para verificar la conexión
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, conectarDB };
