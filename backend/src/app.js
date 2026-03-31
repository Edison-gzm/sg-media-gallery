// Main configuration of middlewares and routes.

const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/contenido.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', contentRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Interactive Gallery API is running' });
});

module.exports = app;