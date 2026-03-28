 // Modelo de la tabla Favoritos
// Cada favorito está relacionado con un item de la tabla Contenido


const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Contenido = require('./Contenido');

const Favorito = sequelize.define('Favorito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Contenido,
      key: 'id'
    }
  }
}, {
  tableName: 'favoritos',
  timestamps: true // Guarda fecha de cuando se agregó a favoritos
});

// Relación entre tablas
Favorito.belongsTo(Contenido, { foreignKey: 'contenidoId' });

module.exports = Favorito;
