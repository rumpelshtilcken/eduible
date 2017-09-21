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
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  sequelize: sequelizeConfig
};

// Auth config

var facebookConfig = {
  options: {
    clientID: '305795383220393',
    clientSecret: '68253afcc6594c2a6b15249a8d75422b',
    callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
    profileFields: ['id', 'name', 'emails']
  },
  scope: ['email', 'manage_pages', 'user_location']
};

var googleConfig = {
  options: {
    clientID: '586068173797-nd1btfivi62ak3lpn5oofaoscj93v19e.apps.googleusercontent.com',
    clientSecret: 'jENXymEmEaMIap7X0C7umGq7',
    callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
  },
  scope: ['https://www.googleapis.com/auth/plus.login', 'email']
};

exports.facebookConfig = facebookConfig;
exports.googleConfig = googleConfig;