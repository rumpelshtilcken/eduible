'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../../../../config');

var _config2 = _interopRequireDefault(_config);

var _strategies = require('./strategies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRoutes = _express2.default.Router();

// Register local strategies with passport
_passport2.default.use('signup', _strategies.signUp);
_passport2.default.use('signin', _strategies.signIn);

// Use these strategies with express routes
var authenticate = function authenticate(res, next) {
  return function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(201).json({ access_token: _jsonwebtoken2.default.sign({ id: user.id }, _config2.default.JWT_SECRET) });
  };
};

authRoutes.post('/signup', function (req, res, next) {
  _passport2.default.authenticate('signup', authenticate(res, next))(req, res, next);
});

authRoutes.post('/signin', function (req, res, next) {
  _passport2.default.authenticate('signin', authenticate(res, next))(req, res, next);
});

authRoutes.post('/verifyCode', function (req, res, next) {
  return (0, _strategies.verifyCode)(req, res, next);
});

exports.default = authRoutes;