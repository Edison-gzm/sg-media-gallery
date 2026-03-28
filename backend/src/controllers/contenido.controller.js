// Controlador del contenido y favoritos


const fs = require('fs');
const path = require('path');


const DB_PATH = path.join(__dirname, '../../data/db.json');


const leerDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};


const escribirDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Obtener todo el contenido de la galería
const obtenerContenido = (req, res) => {
  try {
    const db = leerDB();
    res.json(db.contenido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el contenido' });
  }
};

// Obtener un item específico por id
const obtenerContenidoPorId = (req, res) => {
  try {
    const db = leerDB();
    const item = db.contenido.find(c => c.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ mensaje: 'Contenido no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el contenido' });
  }
};

// Obtener todos los favoritos del usuario
const obtenerFavoritos = (req, res) => {
  try {
    const db = leerDB();
    res.json(db.favoritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los favoritos' });
  }
};

// Agregar un item a favoritos
const agregarFavorito = (req, res) => {
  try {
    const db = leerDB();
    const { id } = req.body;

    // Verifica si el item existe
    const item = db.contenido.find(c => c.id === parseInt(id));
    if (!item) {
      return res.status(404).json({ mensaje: 'Contenido no encontrado' });
    }

    // Verifica si ya está
    const yaExiste = db.favoritos.find(f => f.id === parseInt(id));
    if (yaExiste) {
      return res.status(400).json({ mensaje: 'Este item ya está en favoritos' });
    }

  
    db.favoritos.push(item);
    escribirDB(db);

    res.status(201).json({ mensaje: 'Agregado a favoritos', item });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar a favoritos' });
  }
};

// Eliminar un item de favoritos
const eliminarFavorito = (req, res) => {
  try {
    const db = leerDB();
    const id = parseInt(req.params.id);

    // Verifica si existe en favoritos
    const existe = db.favoritos.find(f => f.id === id);
    if (!existe) {
      return res.status(404).json({ mensaje: 'Favorito no encontrado' });
    }


    db.favoritos = db.favoritos.filter(f => f.id !== id);
    escribirDB(db);

    res.json({ mensaje: 'Eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el favorito' });
  }
};

module.exports = {
  obtenerContenido,
  obtenerContenidoPorId,
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito
};