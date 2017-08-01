const express = require('express');
const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');

const facebookRoutes = express.Router();

const facebookOptions = {
  clientID: '1930827900538994',
  clientSecret: '5a6084a00d497bf36d5d22850d3e673b',
  callbackURL: 'http://localhost:3000/facebook/callback'
};

passport.use('facebook-login', new FacebookStrategy(facebookOptions, async (req, accessToken, refreshToken, profile, done) => {
  if (!req.user) {
    models.User.findOne({ 'facebook.id': profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      const newUser = new models.User();
      newUser.facebook.id = profile.id;
      newUser.facebook.token = accessToken;
      newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      });
      return done(null, user);
    });
  }
}));
// facebook login
facebookRoutes.post('/facebook', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(200).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  })(req, res, next);
});

// facebook callback

facebookRoutes.post('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }), (req, res) => {
  // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = facebookRoutes;
