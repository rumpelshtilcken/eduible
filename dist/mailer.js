'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nodemailer = require('nodemailer');

// Create transport for all email activities
// TODO: use host
// Write your own email
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'adilkhankenzhetaev@gmail.com',
    pass: 'R33030adcw14a14027!'
  }
});

// send mail with defined transport object
var emailConfirmation = function emailConfirmation(userEmail, activationCode, callback) {
  var mailOptions = {
    from: { name: 'Eduible', address: 'adilkhankenzhetaev@gmail.com' }, // sender address
    to: userEmail, // list of receivers
    subject: 'Hello, email verification',
    text: 'Thank you for registration! It is your activation code ' + activationCode + ',If not you please click link below',
    html: 'Thank you for registration! It is your activation code ' + activationCode + ',If not you please click link below'
  };

  transporter.sendMail(mailOptions, callback);
};

exports.default = emailConfirmation;