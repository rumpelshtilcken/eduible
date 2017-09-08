import sequelizeConfig from './config.json';
// const sequelizeConfig = require('./config.json');

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  sequelize: sequelizeConfig
};

// Auth config

const facebookConfig = {
  options: {
    clientID: '305795383220393',
    clientSecret: '68253afcc6594c2a6b15249a8d75422b',
    callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
    profileFields: ['id', 'name', 'emails']
  },
  scope: ['email', 'manage_pages', 'user_location']
};

const googleConfig = {
  options: {
    clientID: '586068173797-nd1btfivi62ak3lpn5oofaoscj93v19e.apps.googleusercontent.com',
    clientSecret: 'jENXymEmEaMIap7X0C7umGq7',
    callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
  },
  scope: ['https://www.googleapis.com/auth/plus.login', 'email']
};

const linkedinConfig = {
  options: {
    clientID: '81qg0hqn13hbzf',
    clientSecret: 'EAuurylRwZ91XN1z',
    callbackURL: 'http://localhost:3000/api/v1/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  }
};

const vidyoConfig = {
  appID: '496d0f.vidyo.io',
  devKey: '7f0785e435ba4f1c82c49c6682c44081'
};

export { facebookConfig, googleConfig, linkedinConfig, vidyoConfig };
