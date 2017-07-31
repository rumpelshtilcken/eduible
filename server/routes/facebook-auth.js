const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');

const facebookOptions = {
  clientID: '1930827900538994',
  clientSecret: '5a6084a00d497bf36d5d22850d3e673b',
  callbackURL: 'http://localhost:3000/facebook/callback'
};

passport.use('facebook-login', new FacebookStrategy(facebookOptions, async (accesToken, refreshToken, profile, done) => {
  models.User.findOrCreate( { where: { email }, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      }
}));

export default {
};
