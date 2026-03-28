// Controlador del contenido y favoritos

const { Contenido, Favorito } = require('../models');

// Obtener todo el contenido de la galería
const obtenerContenido = async (req, res) => {
  try {
    const contenido = await Contenido.findAll();
    res.json(contenido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el contenido' });
  }
};

// Obtener un item específico por id
const obtenerContenidoPorId = async (req, res) => {
  try {
    const item = await Contenido.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ mensaje: 'Contenido no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el contenido' });
  }
};

// Obtener todos los favoritos
const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll({
      include: [{ model: Contenido }]
    });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los favoritos' });
  }
};

// Agregar un item a favoritos
const agregarFavorito = async (req, res) => {
  try {
    const { contenidoId } = req.body;

    // Verifica si el contenido existe
    const item = await Contenido.findByPk(contenidoId);
    if (!item) {
      return res.status(404).json({ mensaje: 'Contenido no encontrado' });
    }

    // Verifica si ya está en favoritos
    const yaExiste = await Favorito.findOne({ where: { contenidoId } });
    if (yaExiste) {
      return res.status(400).json({ mensaje: 'Este item ya está en favoritos' });
    }

    // Crea el favorito en PostgreSQL
    const favorito = await Favorito.create({ contenidoId });
    res.status(201).json({ mensaje: 'Agregado a favoritos', favorito });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar a favoritos' });
  }
};

// Eliminar un item de favoritos
const eliminarFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.findByPk(req.params.id);
    if (!favorito) {
      return res.status(404).json({ mensaje: 'Favorito no encontrado' });
    }

    await favorito.destroy();
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