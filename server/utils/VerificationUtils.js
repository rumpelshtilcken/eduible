const bcrypt = require('bcrypt');
const validator = require('validator');

const MIN_PASSWORD_LENGTH = 8;

const VerificationUtils = {
  isNotValidEmail: email => (validator.isEmail(email) ? false : 'Invalid email'),
  isNotValidPassword: password =>
    (password.length >= MIN_PASSWORD_LENGTH ? false : 'Password should be more than 8 character'),
  isNotValidConfirmPassword: (password, confirmPassword) =>
    (password === confirmPassword ? false : 'Confirm password should be same as your password'),
  isUserNotExist: user => (user ? false : 'User does not exist'),
  isNotEqualPassword: async (typedPassword, dbPassword) =>
    ((await bcrypt.compare(typedPassword, dbPassword)) ? false : 'Password is wrong')
};

module.exports = VerificationUtils;
