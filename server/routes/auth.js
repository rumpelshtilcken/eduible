const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const authRoutes = express.Router();

authRoutes.post('/signup', async (req, res) => {
  const newUser = await models.User.create({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  });

  res.json({ access_token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET) });
});

module.exports = authRoutes;
