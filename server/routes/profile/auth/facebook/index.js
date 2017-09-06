import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import models from 'models';
import config from 'config';

import facebookStrategy from './strategy';

const facebookRoutes = express.Router();

passport.use('facebook', facebookStrategy);

facebookRoutes.get('', (req, res, next) => {
  passport.authenticate('facebook')(req, res, next);
});

// facebook callback
facebookRoutes.get('/callback', (req, res, next) => {
  console.log(req, res, next);
});

export default facebookRoutes;
