'use strict';

var validator = require('email-validator');

var express = require('express');
var models = require('../models');

var router = express.Router();

// POST new user
router.post('/comingsoon', function (req, res) {
  var email = req.body.email || null;
  console.log(email);
  validator.validate_async(email, function (err, isValidEmail) {
    if (isValidEmail) {
      models.Emails.findOrCreate({ where: { email: email } }).spread(function (user) {
        console.log(user);
        res.json({ hello: 'world' });
      });
    }
  });
});

module.exports = router;