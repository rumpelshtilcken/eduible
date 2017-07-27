const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.json({ access_token: '1', message: '' });
});

module.exports = router;
