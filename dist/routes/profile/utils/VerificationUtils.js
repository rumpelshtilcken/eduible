'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcrypt');
var validator = require('validator');

var MIN_PASSWORD_LENGTH = 8;

var VerificationUtils = {
  isNotValidEmail: function isNotValidEmail(email) {
    return validator.isEmail(email) ? false : 'Invalid email';
  },
  isNotValidPassword: function isNotValidPassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH ? false : 'Password should be more than 8 character';
  },
  isNotValidConfirmPassword: function isNotValidConfirmPassword(password, confirmPassword) {
    return password === confirmPassword ? false : 'Confirm password should be same as your password';
  },
  isUserNotExist: function isUserNotExist(user) {
    return user ? false : 'User does not exist';
  },
  isNotEqualPassword: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(typedPassword, dbPassword) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return bcrypt.compare(typedPassword, dbPassword);

            case 2:
              if (!_context.sent) {
                _context.next = 6;
                break;
              }

              _context.t0 = false;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = 'Password is wrong';

            case 7:
              return _context.abrupt('return', _context.t0);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function isNotEqualPassword(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};

module.exports = VerificationUtils;