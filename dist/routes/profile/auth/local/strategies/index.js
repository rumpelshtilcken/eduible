'use strict';

var signIn = require('./signIn');
var signUp = require('./signUp');
var verifyCode = require('./verifyCode');

module.exports = {
  signIn: signIn,
  signUp: signUp,
  verifyCode: verifyCode
};