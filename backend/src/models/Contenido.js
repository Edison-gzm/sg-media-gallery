 
// Modelo de la tabla Contenido 
// Define la estructura de la tabla y los tipos de datos de cada columna

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contenido = sequelize.define('Contenido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('imagen', 'video'),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('Naturaleza', 'Tecnología', 'Arte'),
    allowNull: false
  }
}, {
  tableName: 'contenido',
  timestamps: false
});

module.exports = Contenido;