const nodemailer = require('nodemailer');

// Create transport for all email activities
// TODO: use host
// Write your own email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: ''
  }
});

// send mail with defined transport object
const emailConfirmation = (userEmail, temporaryToken, callback) => {
  // setup email data with unicode symbols
  const mailOptions = {
    from: { name: 'Eduible', address: '<eduible@gmail.com>' }, // sender address
    to: userEmail, // list of receivers
    subject: 'Hello, emial verification',
    text: `Thank you for registration! Please follow link bellow for complete registraction.${
      temporaryToken}`,
    html: `Thank you for registration! Please follow link bellow for complete registraction.${
      temporaryToken}`
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = emailConfirmation;
