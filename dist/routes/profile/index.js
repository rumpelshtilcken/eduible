'use strict';

var localAuth = require('./auth/local');
var facebookAuth = require('./auth/facebook');

module.exports = {
  local: localAuth,
  facebook: facebookAuth
};