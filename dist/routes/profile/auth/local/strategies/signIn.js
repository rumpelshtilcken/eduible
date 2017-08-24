'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('passport-local'),
    LocalStrategy = _require.Strategy;

var models = require('../../../../../models');

var _require2 = require('../../../utils/VerificationUtils'),
    isNotEqualPassword = _require2.isNotEqualPassword,
    isNotValidEmail = _require2.isNotValidEmail,
    isUserNotExist = _require2.isUserNotExist;

var localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

var signIn = new LocalStrategy(localOptions, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, email, password, done) {
    var errorMessage, signinUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // verify request inputs

            errorMessage = isNotValidEmail(email);

            if (!errorMessage) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: errorMessage }));

          case 3:
            _context.next = 5;
            return models.User.findOne({ where: { email: email } });

          case 5:
            signinUser = _context.sent;
            _context.t0 = isUserNotExist(signinUser);

            if (_context.t0) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return isNotEqualPassword(password, signinUser.password);

          case 10:
            _context.t0 = _context.sent;

          case 11:
            errorMessage = _context.t0;

            if (!errorMessage) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: errorMessage }));

          case 14:
            return _context.abrupt('return', done(null, signinUser));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = signIn;