'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('passport-local'),
    LocalStrategy = _require.Strategy;

var bcrypt = require('bcrypt');
var uuidv1 = require('uuid/v1');

var _require2 = require('../../../utils/VerificationUtils'),
    isNotValidConfirmPassword = _require2.isNotValidConfirmPassword,
    isNotValidEmail = _require2.isNotValidEmail,
    isNotValidPassword = _require2.isNotValidPassword;

var models = require('../../../../../models');
var sendEmailConfirmation = require('../../../../../mailer');

var localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

var signUp = new LocalStrategy(localOptions, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, email, password, done) {
    var errorMessage, existingUser, verificationCode, newUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // verify request inputs inputs
            errorMessage = isNotValidEmail(email) || isNotValidPassword(password) || isNotValidConfirmPassword(password, req.body.confirmPassword);

            if (!errorMessage) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: errorMessage }));

          case 3:
            _context.next = 5;
            return models.User.findOne({ where: { email: email } });

          case 5:
            existingUser = _context.sent;

            if (!(existingUser !== null)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: 'email already exists' }));

          case 8:

            // generate code for email verification
            verificationCode = uuidv1();

            // create new user

            newUser = void 0;
            _context.prev = 10;
            _context.t0 = models.User;
            _context.t1 = email;
            _context.next = 15;
            return bcrypt.hash(password, 10);

          case 15:
            _context.t2 = _context.sent;
            _context.t3 = verificationCode;
            _context.t4 = {
              email: _context.t1,
              password: _context.t2,
              verificationCode: _context.t3
            };
            _context.next = 20;
            return _context.t0.create.call(_context.t0, _context.t4);

          case 20:
            newUser = _context.sent;
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t5 = _context['catch'](10);
            return _context.abrupt('return', done(null, false, { message: 'Server error' }));

          case 26:

            sendEmailConfirmation(newUser.email, verificationCode, function (error, info) {
              if (error || info.rejected.length !== 0) {
                return done(null, false, { message: 'Message not sent' });
              }

              return done(null, newUser);
            });

            return _context.abrupt('return', done(null, newUser));

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[10, 23]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = signUp;