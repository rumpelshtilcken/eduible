const { Strategy: LocalStrategy } = require('passport-local');

const models = require('../../../../../models');
const {
  isNotEqualPassword,
  isNotValidEmail,
  isUserNotExist
} = require('../../../utils/VerificationUtils');

const localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

const signIn = new LocalStrategy(localOptions, async (req, email, password, done) => {
  // verify request inputs

  let errorMessage = isNotValidEmail(email);
  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // verify db users
  const signinUser = await models.User.findOne({ where: { email } });

  errorMessage =
    isUserNotExist(signinUser) || (await isNotEqualPassword(password, signinUser.password));

  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // return user
  return done(null, signinUser);
});

module.exports = signIn;
