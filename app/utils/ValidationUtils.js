/* @flow */
/* eslint-disable */
const PASSWORD_MIN_LENGTH = 6;

const ValidationUtils = {
  isValidEmail: candidate =>
  /^([A-Z a-z 0-9]{1,})(([.]|[-]|[_]){0,}[A-Za-z0-9-+]+){0,}[@]{1}([A-z0-9]+)([.][A-z0-9]+){0,}$/.test(candidate),
  isValidPassword: candidate => candidate.length >= PASSWORD_MIN_LENGTH,
  isValidCardNumber: candidate => /^(?:\d[ -]*?){12,18}$/.test(candidate),
  isValidCVV: candidate => /^(?:\d[ -]*?){3}$/.test(candidate),
  isCardExpired: candidate => console.log('expired'),
  isValidName: candidate =>
    /^[A-Z](('[A-Z][a-z]+)|([a-z]+)|(.[ ][A-Z][a-z]+))(-[A-Z][a-z]+)?([ ][A-Z][.])?([ ][A-Z][a-z]+)((-[A-Z][a-z]+)?)$/.test(
      candidate
    ),
  fullnameValidation: candidate =>
    !ValidationUtils.isValidName(candidate)
    &&
    'First name and last name must be uppercased',
  emailValidation: email =>
    !ValidationUtils.isValidEmail(email) && 'Email not valid',
  passwordValidation: password =>
    !ValidationUtils.isValidPassword(password)
    &&
    'Password must be more than 6 character'
};

export default ValidationUtils;
