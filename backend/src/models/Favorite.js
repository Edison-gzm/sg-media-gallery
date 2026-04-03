// Definition of the Favorites table and its relationship with the Content table

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Content = require('./Content');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Content,
      key: 'id'
    }
  }
}, {
  tableName: 'favorites',
  timestamps: true
});

Favorite.belongsTo(Content, { foreignKey: 'contentId' });

module.exports = Favorite;