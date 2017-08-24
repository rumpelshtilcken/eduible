'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sequelizeConfig = {
  development: {
    username: 'eduibleuser',
    password: 'eduiblepassword',
    database: 'eduibledb_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'eduibleuser',
    password: 'eduiblepassword',
    database: 'eduibledb_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    database: 'DATABASE_URL',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};
// const sequelizeConfig = require('./config.json');

exports.default = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.APP_PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  sequelize: sequelizeConfig
};