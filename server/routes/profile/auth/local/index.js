const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../../../../config');
const strategies = require('./strategies');

const authRoutes = express.Router();

// Register local strategies with passport
passport.use('signup', strategies.signUp);
passport.use('signin', strategies.signIn);

// Use these strategies with express routes
const authenticate = (res, next) => (err, user, info) => {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.status(401).json(info);
  }
  return res.status(201).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
};

authRoutes.post('/signup', (req, res, next) => {
  passport.authenticate('signup', authenticate(res, next))(req, res, next);
});

authRoutes.post('/signin', (req, res, next) => {
  passport.authenticate('signin', authenticate(res, next))(req, res, next);
});

authRoutes.post('/verifyCode', (req, res, next) => strategies.verifyCode(req, res, next));

module.exports = authRoutes;
