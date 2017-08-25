import express from 'express';
import expressJwt from 'express-jwt';

import config from 'config';
import models from 'models';

const router = express.Router();

// POST new user
router.all(
  '/',
  expressJwt({ secret: config.JWT_SECRET }),
  async (req, res, next) => {
    const user = await models.User.findOne({ where: { id: req.user.id } });

    if (!user || !user.verified) {
      return res.status(401).json({ message: 'User not verified' });
    }
    next();
  },
  (req, res) => {
    res.json({ message: 'hello' });
  }
);

export default router;
