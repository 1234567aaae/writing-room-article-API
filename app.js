const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config'); 
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { handleError } = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

// Error handling middleware
app.use(handleError);

// Start the server
const PORT = process.env.PORT || 3000;

sequelize.sync() // Sync the database before starting the server
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });