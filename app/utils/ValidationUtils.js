/* @flow */
/* eslint-disable */
const PASSWORD_MIN_LENGTH = 6;

const ValidationUtils = {
  isValidEmail: candidate =>
    /^([A-Za-z0-9]{1,})(([.]|[-]|[_]){1}[A-Za-z0-9-+]+){1,}[@]{1}([A-z0-9]+)([.][A-z0-9]+)+$/.test(
      candidate
    ),
  isValidPassword: candidate => candidate.length >= PASSWORD_MIN_LENGTH,
  isValidCardNumber: candidate => /^(?:\d[ -]*?){12,18}$/.test(candidate),
  isValidCVV: candidate => /^(?:\d[ -]*?){3}$/.test(candidate),
  isCardExpired: candidate => console.log('expired'),
  isValidName: candidate =>
    /^[A-Z](('[A-Z][a-z]+)|([a-z]+)|(.[ ][A-Z][a-z]+))(-[A-Z][a-z]+)?([ ][A-Z][.])?([ ][A-Z][a-z]+)((-[A-Z][a-z]+)?)$/.test(
      candidate
    )
};

export default ValidationUtils;
