const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const models = require('../../../../models');
const {
  isNotEqualPassword,
  isNotValidConfirmPassword,
  isNotValidEmail,
  isNotValidPassword,
  isUserNotExist
} = require('../../utils/VerificationUtils');

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

  // create new user
  const newUser = await models.User.create({
    email,
    password: await bcrypt.hash(password, 10)
  });

  // return new user
  return done(null, newUser);
});

const signIn = new LocalStrategy(localOptions, async (req, email, password, done) => {
  // verify request inputs
  let errorMessage = isNotValidEmail(email);
  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // verify db users
  const signinUser = await models.User.findOne({ where: { email } });
  errorMessage =
    isUserNotExist(signinUser) || (await isNotEqualPassword(password, signinUser.localPassword));

  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // return user
  return done(null, signinUser);
});

module.exports = {
  signIn,
  signUp
};
