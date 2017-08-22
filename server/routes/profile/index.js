const localAuth = require('./auth/local');
const facebookAuth = require('./auth/facebook');

module.exports = {
  local: localAuth,
  facebook: facebookAuth
};
