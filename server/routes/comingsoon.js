const validator = require('email-validator');

const express = require('express');
const models = require('../models');

const router = express.Router();

// POST new user
router.post('/comingsoon', (req, res) => {
  const email = req.body.email || null;
  validator.validate_async(email, (err, isValidEmail) => {
    if (isValidEmail) {
      models.Emails.findOrCreate({ where: { email } }).spread((user) => {
        res.json({ hello: 'world', user });
      });
    }
  });
});

module.exports = router;
