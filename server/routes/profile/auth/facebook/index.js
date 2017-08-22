const { Strategy: FacebookStrategy } = require('passport-facebook');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const models = require('../../../../models');
const config = require('../../../../config');

const facebookRoutes = express.Router();

const facebookOptions = {
  clientID: '503270650015067',
  clientSecret: '1346436d8ac6ff4e4dd7d6548fe12b89',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback'
};

passport.use(
  'signin',
  new FacebookStrategy(facebookOptions, async (req, accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log('Passport use');
    console.log(profile);
    if (!req.user) {
      console.log('++++');
      models.User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        console.log('-----');
        // if (err) {
        //   console.log('=====');
        //   return done(err);
        // }
        // console.log('create new user');
        // const newUser = new models.User();
        // newUser.facebookId = profile.id;
        // newUser.facebookToken = accessToken;
        // newUser.facebookName = `${profile.name.givenName} ${profile.name.familyName}`;
        // newUser.facebookEmail = (profile.emails[0].value || '').toLowerCase();
        // console.log('profile: ', profile.id, accessToken, profile.name, profile.emails[0].value);
        // newUser.save((err) => {
        //   if (err) {
        //     return done(err);
        //   }
        //   return done(null, newUser);
        // });
        return done(err, user);
      });
    }
    return done(null, profile);
  })
);

// facebook signin
facebookRoutes.get('/signin', (req, res, next) => {
  console.log('------------------------------Facebook signin server side');
  passport.authenticate(
    'signin',
    {
      failureRedirect: '/',
      session: false,
      scope: ['email']
    },
    (err, user, info) => {
      console.log('Passport auth');
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      return res.status(200).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
    }
  )(req, res, next);
});

// facebook callback
facebookRoutes.get(
  '/callback',
  passport.authenticate('signin', { session: false, failureRedirect: '/' }),
  (req, res) => {
    console.log('----------- Facebook callback');
    // Successful authentication, redirect home.
    // return the token or you would wish otherwise give eg. a succes message
    res.render('json', { data: JSON.stringify(req.user.access_token) });
  },
  (err, req, res) => {
    console.log('++++++ Facebook callback error');
    // You could put your own behavior in here, fx: you could force auth again...
    // res.redirect('/auth/facebook/');
    if (err) {
      res.status(400);
      res.render('error', { message: err.message });
    }
  }
);

module.exports = facebookRoutes;
