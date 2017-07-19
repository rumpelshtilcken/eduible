const validator = require('email-validator');

const express = require('express');
const models = require('./models');

const router = express.Router();

// POST new user
router.post('/', (req, res) => {
  const email = req.body.email || null;
  validator.validate_async(email, ((err, isValidEmail) => {
    if (isValidEmail) {
      models.Email
        .findOrCreate({ where: { email } })
        .spread((user) => {
          console.log(user);
          res.json({ hello: 'world' });
        });
    }
  }));
});


module.exports = router;
