const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('write-room', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
