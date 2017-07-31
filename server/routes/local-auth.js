const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');
const validator = require('email-validator');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const authRoutes = express.Router();
const localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

// Register local strategies with passport
passport.use('/signup', new LocalStrategy(localOptions, async (req, email, password, done) => {
  if (!email && !password && !req.body.confirmPassword) {
    done(null, false, { message: 'you should fill the email and password field' });
  }
  validator.validate_async(email, async (err, isValidEmail) => { // TODO
    if (!isValidEmail) {
      return done(null, false, { message: 'invalid email' });
    }
    if (password !== req.body.confirmPassword) {
      done(null, false, { message: 'it should be same as your password' });
    }
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser !== null) {
      done(null, false, { message: 'email already exists' });
    }
    const newUser = await models.User.create({
      email,
      password: await bcrypt.hash(password, 10)
    });
    done(null, newUser);
  });
}));

passport.use('/signin', new LocalStrategy(localOptions, async (req, email, password, done) => {
  const signinUser = await models.User.findOne({ where: { email } });
  if (signinUser === null) {
    done(null, false, { message: 'user doesnt exist' });
  }
  if (await bcrypt.compare(password, signinUser.password)) {
    done(null, false, { message: 'password is wrong' });
  }
  done(null, signinUser);
}));

// Use these strategies with express routes
authRoutes.post('/signup', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      const error = new Error(info.message);
      error.status = 401;
      return next(error);
    }
    return res.status(201).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  });
});
authRoutes.post('/signin', (req, res, next) => {
  passport.authenticate('signin', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      const error = new Error(info.message);
      error.status = 401;
      return next(error);
    }
    return res.status(200).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  });
});

module.exports = authRoutes;
