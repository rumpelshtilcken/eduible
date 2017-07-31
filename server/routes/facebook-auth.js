const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');

const facebookOptions = {
  clientID: '1002761776413298',
  clientSecret: '77836813ef9530dddbcfd053f90b83a4',
  callbackURL: 'http://localhost:3000/facebook/callback'
};

passport.use('facebook-login', new FacebookStrategy(facebookOptions, async (token, refreshToken, profile, done) => {
  let existingPlayer;
  try {
    existingPlayer = (await models.filter({ facebook: { id: profile.id } }))[0];
  } catch (e) {
    return done(e);
  }
  if (existingPlayer) {
    return done(null, existingPlayer);
  }
  const facebookPlayer = new PlayerModel({
    facebook: {
      id: profile.id,
      token,
      name: profile.name
      // email: profile.emails[0].value,
    }
  });
  await facebookPlayer.save();
  return done(null, facebookPlayer);
}));

export default {
  facebookLogin: passport.authenticate('facebook-login', { session: false, scope: 'email' }),
  facebookCallback: [
    passport.authenticate('facebook-login', { session: false, failureRedirect: '/welcome.html' }),
    (req, res) => {
      return res.redirect('/?access_token=' + createToken(req.user));
    },
  ],
};
