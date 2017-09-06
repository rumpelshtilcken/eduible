import uuidv1 from 'uuid/v1';

import { isNotValidEmail, isUserNotExist } from 'utils/VerificationUtils';
import { sendPasswordReset } from 'mailer';
import models from 'models';

const forgottenPassword = async (req, res, next) => {
  // 422 - Unprocessable Entity
  // The request was well-formed but was unable to be followed due to semantic errors.

  let errorMessage = req.body.email ? false : 'You should send email';

  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  // email validation
  const email = req.body.email;
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

  // generate tempPassword and to the user
  const tempPassword = uuidv1();
  try {
    user.tempPassword = tempPassword;
    await user.save();

    const passwordResetLink = `http://localhost:3000/forgottenPassword/resetPassword?token=${tempPassword}`;
    const notSend = 'http://localhost:3000/forgottenPassword/notSend';

    sendPasswordReset({
      email: user.email,
      passwordResetLink,
      notSend,
      callback: (error, info) => {
        if (error || info.rejected.length !== 0) {
          return res.status(500).json({ message: 'Message not sent' });
        }

        return res.status(200).json({ message: 'Message sent' });
      }
    });
  } catch (e) {
    return next(e);
  }
};

export default forgottenPassword;