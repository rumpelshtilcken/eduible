import uuidv1 from 'uuid/v1';

import { isNotValidEmail, isUserNotExist } from 'utils/VerificationUtils';
import { sendEmailConfirmation } from 'mailer';
import models from 'models';

const verifyCode = async (req, res, next) => {
  // verify and take  email from request
  let errorMessage = req.body.email ? false : 'You should send email';

  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  const email = req.body.email;

  // email validation
  errorMessage = isNotValidEmail(email);
  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  // fetch user and check for existense
  const user = await models.User.findOne({ where: { email } });
  errorMessage = isUserNotExist(user);

  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  // generate code for email verification
  const verificationCode = uuidv1();

  user.verificationCode = verificationCode;
  try {
    await user.save();
  } catch (e) {
    return next(e);
  }

  sendEmailConfirmation(user.email, user.verificationCode, (error, info) => {
    if (error || info.rejected.length !== 0) {
      return res.status(422).json({ message: 'Message not sent' });
    }

    return res.status(200).json({ message: 'Success' });
  });
};

export default verifyCode;
