import atob from 'atob';
import express from 'express';

import { mailingConfig } from 'config';
import sendEmail from 'mailer';

import { professionalText } from './texts';

// const studentAcknowledgeUrl = 'http://www.eduible.com/studentAcknowledge';
const apiKey = mailingConfig.key;
const AknowledgementsRouter = express.Router();

AknowledgementsRouter.post('/', (req, res, next) => {
  // extract all data
  const {
    appointmentLength,
    appointmentPrice,
    appointmentDate,
    message,
    professionalEmail,
    professionalName,
    studentName
  } = req.body;
  const key = req.headers.authorization;

  // verify apiKey
  if (!key) return res.status(401).json({ message: 'Key not provided', headers: key });

  const decodedKey = atob(key);
  if (decodedKey !== apiKey) return res.status(401).json({ message: 'Wrong key', key: decodedKey });

  // verify body data
  if (
    !professionalEmail &&
    !professionalName &&
    !studentName &&
    !message &&
    !appointmentLength &&
    !appointmentPrice &&
    !appointmentDate
  ) {
    return res.status(401).json({ message: 'You should pass all fields' });
  }

  // send email to the professional
  sendEmail({
    to: professionalEmail,
    subject: 'Appointment acknowledgments',
    text: professionalText({
      appointmentDate,
      appointmentLength,
      appointmentPrice,
      message,
      professionalName,
      studentName
    }),
    html: '',
    callback: (error, data) => {
      if (error && data.rejected.length !== 0) {
        return res.status(401).json({ message: 'Error' });
      }

      return res.status(200).json({ message: 'Success' });
    }
  });
});

export default AknowledgementsRouter;
