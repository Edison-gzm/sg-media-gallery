 
// Archivo central de modelos
// Exporta todos los modelos juntos para importarlos fácilmente
// En lugar de importar cada modelo por separado, importamos desde aquí

const Contenido = require('./Contenido');
const Favorito = require('./Favorito');

module.exports = {
  Contenido,
  Favorito
};