import { isNotValidEmail, isUserNotExist } from 'utils/VerificationUtils';
import models from 'models';

const verifyCode = async (req, res, next) => {
  // verify and take code and email from request
  let errorMessage =
    req.body.verificationCode && req.body.email
      ? false
      : 'You should send email and verificationCode';

  if (errorMessage) {
    return res.status(401).json({ message: errorMessage });
  }

  const reqCode = req.body.verificationCode;
  const email = req.body.email;

  // email validation
  errorMessage = isNotValidEmail(email);
  if (errorMessage) {
    return res.status(401).json({ message: errorMessage });
  }

  // fetch user and check for existense
  const user = await models.User.findOne({ where: { email } });
  errorMessage = isUserNotExist(user);

  if (errorMessage) {
    return res.status(401).json({ message: errorMessage });
  }

  // compare verificationCode
  if (reqCode !== user.verificationCode) {
    return res.status(401).json({ message: 'Verification code not correct!' });
  }

  user.verified = true;
  try {
    await user.save();
    // TODO: should redirect
  } catch (e) {
    return next(e);
  }

  return res.status(201).json({ message: 'Success' });
};

export default verifyCode;
