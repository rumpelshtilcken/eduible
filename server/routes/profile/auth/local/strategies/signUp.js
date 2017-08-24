const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

const {
  isNotValidConfirmPassword,
  isNotValidEmail,
  isNotValidPassword
} = require('../../../utils/VerificationUtils');

const models = require('../../../../../models');
const sendEmailConfirmation = require('../../../../../mailer');

const localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

const signUp = new LocalStrategy(localOptions, async (req, email, password, done) => {
  // verify request inputs inputs
  const errorMessage =
    isNotValidEmail(email) ||
    isNotValidPassword(password) ||
    isNotValidConfirmPassword(password, req.body.confirmPassword);

  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // verify db users
  const existingUser = await models.User.findOne({ where: { email } });
  if (existingUser !== null) {
    return done(null, false, { message: 'email already exists' });
  }

  // generate code for email verification
  const verificationCode = uuidv1();

  // create new user
  let newUser;
  try {
    newUser = await models.User.create({
      email,
      password: await bcrypt.hash(password, 10),
      verificationCode
    });
  } catch (err) {
    return done(null, false, { message: 'Server error' });
  }

  sendEmailConfirmation(newUser.email, verificationCode, (error, info) => {
    if (error || info.rejected.length !== 0) {
      return done(null, false, { message: 'Message not sent' });
    }

    return done(null, newUser);
  });

  return done(null, newUser);
});

module.exports = signUp;
