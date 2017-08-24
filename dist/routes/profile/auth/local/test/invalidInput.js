'use strict';

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

var invalid = {
  empty: {},
  invalidEmail: {
    email: 'adilkhankenzhetaev',
    password: 'adadadadadad',
    confirmPassword: 'adadadadadad'
  },
  invalidPassword: {
    email: 'adilkhankenzhetaev@gmail.ru',
    password: 'adada',
    confirmPassword: 'adada'
  },
  invalidConfirmPassword: {
    email: 'adilkhankenzhetaev@gmail.ru',
    password: 'adadadadadad',
    confirmPassword: 'adadasd'
  }
};

var InvalidInputsTest = [{
  info: {
    name: '/signup should respond 401 if email not valid',
    errorMessage: 'Invalid email'
  },
  user: invalid.invalidEmail
}, {
  info: {
    name: '/signup should respond 401 if password not valid',
    errorMessage: 'Password should be more than 8 character'
  },
  user: invalid.invalidPassword
}, {
  info: {
    name: '/signup should respond 401 if password not equal confirm password',
    errorMessage: 'Confirm password should be same as your password'
  },
  user: invalid.invalidConfirmPassword
}];

module.exports = InvalidInputsTest;