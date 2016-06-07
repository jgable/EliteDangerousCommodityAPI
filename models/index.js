const sqlizr = require('sqlizr');
const Sequelize = require('sequelize');

const {development, test, production} = require('../config/config');
const {NODE_ENV} = process.env;

let conf = development;
if (NODE_ENV === 'production') {
  conf = production;
} else if (NODE_ENV === 'test') {
  conf = test;
}

const sequelize = new Sequelize(conf.database, conf.user, conf.password, conf);

const db = sqlizr(sequelize, 'models/*Model.js');

db.sequelize = sequelize;

module.exports = db;
