// Server entry point - connects to PostgreSQL and starts

require('dotenv').config();
const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/database');

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();

    // force: false prevents dropping existing data on sync
    await sequelize.sync({ force: false });
    console.log('Models synchronized with PostgreSQL');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });

  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
};

startServer();