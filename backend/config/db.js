const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  logging: false, // Disable logging; default: console.log
});

module.exports = sequelize;
