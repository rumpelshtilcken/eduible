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

var _models = require('../../../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../../../config');

var _config2 = _interopRequireDefault(_config);

var _strategy = require('./strategy');

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var facebookRoutes = _express2.default.Router();

_passport2.default.use('facebook', _strategy2.default);

facebookRoutes.get('', function (req, res, next) {
  _passport2.default.authenticate('facebook')(req, res, next);
});

// facebook callback
facebookRoutes.get('/callback', function (req, res, next) {
  console.log(req, res, next);
});

exports.default = facebookRoutes;