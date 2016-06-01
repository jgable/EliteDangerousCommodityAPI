const sqlizr = require('sqlizr');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('elite-dangerous', 'user', 'pass', {
  dialect: 'sqlite',
  storage: 'data/db.sqlite',
});

const db = sqlizr(sequelize, 'models/*Model.js');

db.sequelize = sequelize;

module.exports = db;
