import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from 'config';

import { forgottenPassword, resetPassword } from './forgottenPassword';
import { signIn, signUp } from './strategies';
import resendConfirmationEmail from './resendConfirmationEmail';
import verifyCode from './verifyCode';

const authRoutes = express.Router();

// Register local strategies with passport
passport.use('signup', signUp);
passport.use('signin', signIn);

// Use these strategies with express routes
const authenticate = (res, next) => (err, user, info) => {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.status(401).json(info);
  }

  return res.status(201).json({
    access_token: jwt.sign({ id: user.id }, config.JWT_SECRET),
    verified: user.facebookEmail || user.googleEmail
  });
};

authRoutes.post('/signup', (req, res, next) => {
  passport.authenticate('signup', authenticate(res, next))(req, res, next);
});

authRoutes.post('/signin', (req, res, next) => {
  passport.authenticate('signin', authenticate(res, next))(req, res, next);
});

authRoutes.post('/resendConfirmationEmail', (req, res, next) =>
  resendConfirmationEmail(req, res, next)
);

authRoutes.post('/verifyCode', (req, res, next) => verifyCode(req, res, next));

authRoutes.post('/forgottenPassword', (req, res, next) => forgottenPassword(req, res, next));

authRoutes.get('/forgottenPassword/resetPassword', (req, res, next) =>
  resetPassword(req, res, next)
);

export default authRoutes;
