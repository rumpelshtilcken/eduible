import nodemailer from 'nodemailer';
import config from 'config';

// Create transport for all email activities
// TODO: use host
// Write your own email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'adilkhankenzhetaev@gmail.com',
    pass: ''
  }
});

/* eslint-disable import/no-mutable-exports */
let sendEmailConfirmation = (userEmail, activationCode, callback) => {
  callback(null, {
    rejected: []
  });
};
/* eslint-disable no-unused-vars */
let sendPasswordReset = ({
  email,
  passwordResetLink,
  notSend,
  callback
}) => {
  callback(null, {
    rejected: []
  });
};
/* eslint-enable no-unused-vars */
/* eslint-enable import/no-mutable-exports */

if (config.NODE_ENV !== 'test') {
  // send mail with defined transport object
  sendEmailConfirmation = (userEmail, activationCode, callback) => {
    const mailOptions = {
      from: {
        name: 'Eduible',
        address: 'adilkhankenzhetaev@gmail.com'
      }, // sender address
      to: userEmail, // list of receivers
      subject: 'Hello, email verification',
      text: `Thank you for registration! It is your activation code ${activationCode},If not you please click link below`,
      html: `Thank you for registration! It is your activation code ${activationCode},If not you please click link below`
    };

    transporter.sendMail(mailOptions, callback);
  };

  sendPasswordReset = ({
    email,
    passwordResetLink,
    notSend,
    callback
  }) => {
    const mailOptions = {
      from: {
        name: 'Eduible',
        address: 'adilkhankenzhetaev@gmail.com'
      }, // sender address
      to: email, // list of receivers
      subject: 'Hello, email verification',
      text: `You send password reset. Please click link: ${passwordResetLink},If not you please click link below ${notSend}`,
      html: `You send password reset. Please click link: ${passwordResetLink},If not you please click link below ${notSend}`
    };

    transporter.sendMail(mailOptions, callback);
  };
}

export {
  sendEmailConfirmation,
  sendPasswordReset
};
