import nodemailer from 'nodemailer';

import { NODE_ENV } from 'config';

// Create transport for all email activities
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eduible1@gmail.com',
    pass: 'Intellection1'
  }
});

/* eslint-disable import/no-mutable-exports */
let sendEmail = ({ callback }) => {
  callback(null, {
    rejected: []
  });
};

if (NODE_ENV !== 'test') {
  sendEmail = ({
    to,
    subject,
    text,
    html,
    callback
  }) => {
    const mailOptions = {
      from: { name: 'Eduible', address: 'eduible1@gmail.com' }, // sender address
      to, // list of receivers
      subject,
      text,
      html
    };

    transporter.sendMail(mailOptions, callback);
  };
}

export default sendEmail;
/* eslint-enable import/no-mutable-exports */
