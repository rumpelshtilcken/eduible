'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../../utils/VerificationUtils'),
    isNotValidEmail = _require.isNotValidEmail,
    isUserNotExist = _require.isUserNotExist;

var models = require('../../../../../models');

var verifyCode = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var errorMessage, reqCode, email, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // verify and take code and email from request
            errorMessage = req.body.verificationCode && req.body.email ? false : 'You should send email and verificationCode';

            if (!errorMessage) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: errorMessage }));

          case 3:
            reqCode = req.body.verificationCode;
            email = req.body.email;

            // email validation

            errorMessage = isNotValidEmail(email);

            if (!errorMessage) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: errorMessage }));

          case 8:
            _context.next = 10;
            return models.User.findOne({ where: { email: email } });

          case 10:
            user = _context.sent;

            errorMessage = isUserNotExist(user);

            if (!errorMessage) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: errorMessage }));

          case 14:
            if (!(reqCode !== user.verificationCode)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: 'Verification code not correct!' }));

          case 16:

            user.verified = true;
            _context.prev = 17;
            _context.next = 20;
            return user.save();

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](17);
            return _context.abrupt('return', next(_context.t0));

          case 25:
            return _context.abrupt('return', res.status(201).json({ message: 'Success' }));

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[17, 22]]);
  }));

  return function verifyCode(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = verifyCode;