'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var config = require('../../../../config');
var strategies = require('./strategies');

var authRoutes = express.Router();

// Register local strategies with passport
passport.use('signup', strategies.signUp);
passport.use('signin', strategies.signIn);

// Use these strategies with express routes
var authenticate = function authenticate(res, next) {
  return function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(201).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  };
};

authRoutes.post('/signup', function (req, res, next) {
  passport.authenticate('signup', authenticate(res, next))(req, res, next);
});

authRoutes.post('/signin', function (req, res, next) {
  passport.authenticate('signin', authenticate(res, next))(req, res, next);
});

authRoutes.post('/verifyCode', function (req, res, next) {
  return strategies.verifyCode(req, res, next);
});

module.exports = authRoutes;