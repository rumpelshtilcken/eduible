import bcrypt from 'bcrypt';

import { isNotValidPassword, isNotValidConfirmPassword } from 'utils/VerificationUtils';
import models from 'models';

const resetPassword = async (req, res, next) => {
  // 422 - Unprocessable Entity
  // The request was well-formed but was unable to be followed due to semantic errors.

  let errorMessage =
    req.body.token && req.body.password && req.body.confirmPassword
      ? false
      : 'You should send token and password and confirm password';

  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  const { token, password, confirmPassword } = req.body;

  const user = await models.User.findOne({ where: { tempPassword: token } });

  if (!user) {
    return res.status(422).json({ message: 'Token is invalid' });
  }

  errorMessage =
    isNotValidPassword(password) || isNotValidConfirmPassword(password, confirmPassword);

  if (errorMessage) {
    return res.status(422).json({ message: errorMessage });
  }

  user.password = await bcrypt.hash(password, 10);
  try {
    await user.save();
    return res.status(200).json({ message: 'success' });
  } catch (e) {
    return next(e);
  }
};

export default resetPassword;
