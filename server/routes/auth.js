const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config');
const validator = require('email-validator');

const authRoutes = express.Router();

authRoutes.post('/signup', async (req, res) => {
  if (!req.body.email && !req.body.password && !req.body.confirmPassword) {
    return res.status(401).json({ message: 'you should fill the email and password field' });
  }
  validator.validate_async(req.body.email, ((err, isValidEmail) => {
    if (!isValidEmail) {
      return res.status(401).json({ message: 'invalid email' });
    }
  }));
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(401).json({ message: 'it should be same as your password' });
  }
  const existingUser = await models.User.findOne({ where: { email: req.body.email } });
  if (existingUser !== null) {
    return res.status(401).json({ message: 'email already exists' });
  }
  const newUser = await models.User.create({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  });

  res.json({ access_token: jwt.sign({ id: newUser.id }, config.JWT_SECRET) });
});

module.exports = authRoutes;
