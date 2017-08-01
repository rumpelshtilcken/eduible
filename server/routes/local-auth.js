const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');
const validator = require('validator');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const authRoutes = express.Router();
const localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

// Register local strategies with passport
passport.use('signup', new LocalStrategy(localOptions, async (req, email, password, done) => {
  console.log('+++++++++++', email, password, req.body.confirmPassword);
  if (!validator.isEmail(email)) {
    return done(null, false, { message: 'invalid email' });
  }
  if (!email && !password && !req.body.confirmPassword) {
    return done(null, false, { message: 'you should fill the email and password field' });
  }
  if (password !== req.body.confirmPassword) {
    return done(null, false, { message: 'it should be same as your password' });
  }
  const existingUser = await models.User.findOne({ where: { 'local.email': email } });
  if (existingUser !== null) {
    return done(null, false, { message: 'email already exists' });
  }
  const newUser = await models.User.create({
    'local.email': email,
    'local.password': await bcrypt.hash(password, 10)
  });
  return done(null, newUser);
}));

passport.use('signin', new LocalStrategy(localOptions, async (req, email, password, done) => {
  const signinUser = await models.User.findOne({ where: { 'local.email': email } });
  if (signinUser === null) {
    done(null, false, { message: 'user doesnt exist' });
  }
  if (await bcrypt.compare(password, signinUser.local.password)) {
    done(null, false, { message: 'password is wrong' });
  }
  return done(null, signinUser);
}));

// Use these strategies with express routes
authRoutes.post('/signup', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(201).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  })(req, res, next);
});
authRoutes.post('/signin', (req, res, next) => {
  passport.authenticate('signin', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(200).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  })(req, res, next);
});

module.exports = authRoutes;
