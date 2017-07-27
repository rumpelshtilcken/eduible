// const passport = require('passport');
// const { Strategy: LocalStrategy } = require('passport-local');
// const validator = require('email-validator');
// const models = require('../../models');
// const { hashPassword } = require('../utils/bcrypt');
// const { middlewareConstructor } = require('./passport-helper');
//
// const localOptions = {
//   usernameField: 'email',
//   passReqToCallback: true,
// };
//
// passport.use('local-signup', new LocalStrategy(localOptions, async (req, email, password, done) => {
//   if (!validator.isEmail(email)) {
//     return done(null, false, { message: 'email is not valid' });
//   }
//   if (req.body.confirmPassword !== password) {
//     return done(null, false, { message: 'password and confirm password do not match' });
//   }
//   const user = (await models.User.findOne({ where: { email } }));
//   if (user) {
//     return done(null, false, { message: 'such email already exists' });
//   }
//   const localUser = await models.User.create({
//     where: {
//       email,
//       password: await hashPassword(password)
//     }
//   });
//   return done(null, localUser);
// }));
//
// passport.use('local-login', new LocalStrategy(localOptions, async (req, email, password, done) => {
//   if (!validator.isEmail(email)) {
//     return done(null, false, { message: 'email is not valid' });
//   }
//   const player = (await models.User.findOne({ where: { email } }))[0];
//   if (!player) {
//     return done(null, false, { message: 'The username or password dont match' });
//   }
//   if (!(await player.validatePassword(password))) {
//     return done(null, false, { message: 'The username or password dont match' });
//   }
//   return done(null, player);
// }));
//
// export default {
//   localSignup: middlewareConstructor('local-signup', 201),
//   localLogin: middlewareConstructor('local-login', 200),
// };
