import btoa from 'btoa';
import express from 'express';
import jsSHA from 'jssha';

import { vidyoConfig } from 'config';

const videochatRoute = express.Router();

const generateToken = ({ userName, expiresInSeconds }) => {
  const EPOCH_SECONDS = 62167219200;
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;

  const shaObj = new jsSHA('SHA-384', 'TEXT');

  shaObj.setHMACKey(vidyoConfig.devKey, 'TEXT');

  const jid = `${userName}@${vidyoConfig.appID}`;
  const body = `${'provision\x00'}${jid}\x00${expires}\x00`;
  shaObj.update(body);

  const mac = shaObj.getHMAC('HEX');
  const serialized = `${body}\0${mac}`;
  const token = btoa(serialized);
  return token;
};
// cHJvdmlzaW9uAGRlbW91c2VyX2UwZWE5N0A0OTZkMGYudmlkeW8uaW8ANjM2NzIwMTE1MjMAADJjMDQ4MTMyYTU3Yjc3OWE3YTgyMzk2MmZmNDZiNTg5OTYwY2U0YzUyNDY4NDY5MjVjODUyZGU2YWNhM2YzY2RlNzFkY2U0MmQ4NGMxYzU4ZjMwYjlhN2VjMWYwYzVkNw%3D%3D

videochatRoute.post('/', (req, res, next) => {
  if (!req.body.userName || !req.body.expiresInSeconds) {
    return res.status(401).json({ message: 'You should pass username and expiresInSeconds' });
  }

  const { userName, expiresInSeconds } = req.body;
  const token = generateToken({ userName, expiresInSeconds });
  return res.status(200).json({ vidyoToken: token });
});

export default videochatRoute;
