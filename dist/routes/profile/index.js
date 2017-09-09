'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuth = exports.localAuth = undefined;

var _local = require('./auth/local');

var _local2 = _interopRequireDefault(_local);

var _facebook = require('./auth/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.localAuth = _local2.default;
exports.facebookAuth = _facebook2.default;