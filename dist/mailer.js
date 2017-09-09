'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPasswordReset = exports.sendEmailConfirmation = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create transport for all email activities
// TODO: use host
// Write your own email
var transporter = _nodemailer2.default.createTransport({
  service: 'Gmail',
  auth: {
    user: 'adilkhankenzhetaev@gmail.com',
    pass: ''
  }
});

/* eslint-disable import/no-mutable-exports */
var sendEmailConfirmation = function sendEmailConfirmation(userEmail, activationCode, callback) {
  callback(null, { rejected: [] });
};
/* eslint-disable no-unused-vars */
var sendPasswordReset = function sendPasswordReset(_ref) {
  var email = _ref.email,
      passwordResetLink = _ref.passwordResetLink,
      notSend = _ref.notSend,
      callback = _ref.callback;

  callback(null, { rejected: [] });
};
/* eslint-enable no-unused-vars */
/* eslint-enable import/no-mutable-exports */

if (_config2.default.NODE_ENV !== 'test') {
  // send mail with defined transport object
  exports.sendEmailConfirmation = sendEmailConfirmation = function sendEmailConfirmation(userEmail, activationCode, callback) {
    var mailOptions = {
      from: { name: 'Eduible', address: 'adilkhankenzhetaev@gmail.com' }, // sender address
      to: userEmail, // list of receivers
      subject: 'Hello, email verification',
      text: 'Thank you for registration! It is your activation code ' + activationCode + ',If not you please click link below',
      html: 'Thank you for registration! It is your activation code ' + activationCode + ',If not you please click link below'
    };

    transporter.sendMail(mailOptions, callback);
  };

  exports.sendPasswordReset = sendPasswordReset = function sendPasswordReset(_ref2) {
    var email = _ref2.email,
        passwordResetLink = _ref2.passwordResetLink,
        notSend = _ref2.notSend,
        callback = _ref2.callback;

    var mailOptions = {
      from: { name: 'Eduible', address: 'adilkhankenzhetaev@gmail.com' }, // sender address
      to: email, // list of receivers
      subject: 'Hello, email verification',
      text: 'You send password reset. Please click link: ' + passwordResetLink + ',If not you please click link below ' + notSend,
      html: 'You send password reset. Please click link: ' + passwordResetLink + ',If not you please click link below ' + notSend
    };

    transporter.sendMail(mailOptions, callback);
  };
}

exports.sendEmailConfirmation = sendEmailConfirmation;
exports.sendPasswordReset = sendPasswordReset;