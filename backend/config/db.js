require('dotenv').config();

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with the required configuration
const sequelize = new Sequelize('budget_buddy_2', 'root', 'Adi1489181', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  logging: false, // Disable logging; default: console.log
});

module.exports = sequelize;
