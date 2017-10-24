import sequelizeConfig from './config.json';
// const sequelizeConfig = require('./config.json');

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  sequelize: sequelizeConfig
};

const vidyoConfig = {
  appID: '496d0f.vidyo.io',
  devKey: '7f0785e435ba4f1c82c49c6682c44081'
};

const mailingConfig = {
  key: '9drj3dif32kDkr932f2308574731q'
};

export { vidyoConfig, mailingConfig };
