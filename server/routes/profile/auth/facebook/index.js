import { Strategy as FacebookStrategy } from 'passport-facebook';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import models from 'models';
import config from 'config';

const facebookRoutes = express.Router();

const facebookOptions = {
  clientID: '503270650015067',
  clientSecret: '1346436d8ac6ff4e4dd7d6548fe12b89',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback'
};

passport.use(
  'signin',
  new FacebookStrategy(facebookOptions, async (req, accessToken, refreshToken, profile, done) =>
    done(false, null, { message: 'sss' })
  )
);

facebookRoutes.get('/signin', (req, res, next) => {
  passport.authenticate(
    'signin',
    {
      failureRedirect: '/',
      session: false,
      scope: ['email']
    },
    (err, user, info) => {
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

export default facebookRoutes;
