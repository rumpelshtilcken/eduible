import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

/* eslint-disable import/no-duplicates */
import config from 'config';
import { googleConfig } from 'config';
/* eslint-enable import/no-duplicates */

import googleStrategy from './strategy';

const googleRoutes = express.Router();

passport.use('google', googleStrategy);

googleRoutes.get(
  '',
  passport.authenticate('google', {
    scope: googleConfig.scope
  })
);

// google callback
googleRoutes.get(
  '/callback',
  passport.authenticate('google', {
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

export default googleRoutes;
