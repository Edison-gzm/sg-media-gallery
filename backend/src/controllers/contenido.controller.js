// Gallery and favorites controller - handles content retrieval and favorites management

const { Content, Favorite } = require('../models');

const getContent = async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
};

const getContentById = async (req, res) => {
  try {
    const item = await Content.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      include: [{ model: Content }]
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { contentId } = req.body;

    const item = await Content.findByPk(contentId);
    if (!item) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const alreadyExists = await Favorite.findOne({ where: { contentId } });
    if (alreadyExists) {
      return res.status(400).json({ message: 'Item already in favorites' });
    }

    const favorite = await Favorite.create({ contentId });
    res.status(201).json({ message: 'Added to favorites', favorite });

  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await favorite.destroy();
    res.json({ message: 'Removed from favorites' });

  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite' });
  }
};

module.exports = {
  getContent,
  getContentById,
  getFavorites,
  addFavorite,
  removeFavorite
};