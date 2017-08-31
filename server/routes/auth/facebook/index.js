import express from 'express';
import passport from 'passport';

import facebookStrategy from './strategy';

const facebookRoutes = express.Router();

passport.use('facebook', facebookStrategy);

facebookRoutes.get(
  '',
  passport.authenticate('facebook', {
    scope: ['email', 'manage_pages', 'user_location']
  })
);

// facebook callback
facebookRoutes.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

export default facebookRoutes;
