const sequelizeConfig = require('./config');

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.APP_PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  sequelize: sequelizeConfig
};
