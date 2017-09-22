import btoa from 'btoa';
import express from 'express';
import jsSHA from 'jssha';

import { vidyoConfig } from 'config';

const videochatRoute = express.Router();

const generateToken = ({ userName, expiresInSeconds }) => {
  const EPOCH_SECONDS = 62167219200;
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;

  /* eslint-disable new-cap */
  const shaObj = new jsSHA('SHA-384', 'TEXT');
  /* eslint-enable new-cap */

  shaObj.setHMACKey(vidyoConfig.devKey, 'TEXT');

  const jid = `${userName}@${vidyoConfig.appID}`;
  const body = `${'provision\x00'}${jid}\x00${expires}\x00`;
  shaObj.update(body);

  const mac = shaObj.getHMAC('HEX');
  const serialized = `${body}\0${mac}`;
  const token = btoa(serialized);
  return token;
};

/* eslint-disable no-unused-vars */
videochatRoute.post('/', (req, res, next) => {
  if (!req.body.userName || !req.body.expiresInSeconds) {
    return res.status(401).json({ message: 'You should pass username and expiresInSeconds' });
  }

  const { userName, expiresInSeconds } = req.body;
  const token = generateToken({ userName, expiresInSeconds });
  return res.status(200).json({ vidyoToken: token });
});
/* eslint-enable no-unused-vars */

export default videochatRoute;
