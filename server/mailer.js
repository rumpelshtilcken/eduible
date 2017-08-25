import nodemailer from 'nodemailer';
import config from 'config';

// Create transport for all email activities
// TODO: use host
// Write your own email
// eslint-disable-next-line
let emailConfirmation = (userEmail, activationCode, callback) => {
  callback(null, { rejected: [] });
};

if (config.NODE_ENV !== 'test') {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'adilkhankenzhetaev@gmail.com',
      pass: 'R33030adcw14a14027!'
    }
  });

  // send mail with defined transport object
  emailConfirmation = (userEmail, activationCode, callback) => {
    const mailOptions = {
      from: { name: 'Eduible', address: 'adilkhankenzhetaev@gmail.com' }, // sender address
      to: userEmail, // list of receivers
      subject: 'Hello, email verification',
      text: `Thank you for registration! It is your activation code ${activationCode},If not you please click link below`,
      html: `Thank you for registration! It is your activation code ${activationCode},If not you please click link below`
    };

    transporter.sendMail(mailOptions, callback);
  };
}

export default emailConfirmation;
