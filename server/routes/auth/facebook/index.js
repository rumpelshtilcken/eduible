import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

/* eslint-disable import/no-duplicates */
import config from 'config';
import { facebookConfig } from 'config';
/* eslint-enable import/no-duplicates */

import facebookStrategy from './strategy';

const facebookRoutes = express.Router();

passport.use('facebook', facebookStrategy);

facebookRoutes.get(
  '',
  passport.authenticate('facebook', {
    scope: facebookConfig.scope
  })
);

// facebook callback
facebookRoutes.get(
  '/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/'
  }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauth' });
    }

    return res.status(201).json({ access_token: jwt.sign({ id: req.user.id }, config.JWT_SECRET) });
  }
);

export default facebookRoutes;