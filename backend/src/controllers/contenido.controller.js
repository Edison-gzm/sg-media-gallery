// Gallery and favorites controller - handles content retrieval and favorites management

const { Content, Favorite } = require('../models');
const { Op } = require('sequelize');

const getContent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

          const where = {};
        if (req.query.category) where.category = req.query.category;

        const { count, rows } = await Content.findAndCountAll({
          where,
          limit,
          offset,
          order: [['id', 'ASC']],
        });

    res.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await Favorite.findAndCountAll({
      include: [{ model: Content }],
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    res.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
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