import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import next from 'next';
import passport from 'passport';

import config from 'config';
import { localAuth, facebookAuth } from 'routes/auth';
import comingsoon from 'routes/comingsoon';
import graphqlRouter from 'routes/graphql';

const { NODE_ENV, PORT } = config;
const dev = NODE_ENV !== 'production';

const app = next({ dir: 'app', dev });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // Load body parser to handle POST requests
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(passport.initialize());

  server.use(cors());

  server.use('/api/v1', comingsoon);
  server.use('/api/v1/auth/local', localAuth);
  server.use('/api/v1/auth/facebook', facebookAuth);
  server.use('/graphql', graphqlRouter);
  server.get('*', (req, res) => handler(req, res));

  // production error handler
  // no stacktraces leaked to user
  server.use((err, req, res, next) => {
    // eslint-disable-line
    res.status(err.status || 500);
    if (err.status < 500) {
      // log.warn('%s %d %s', req.method, res.statusCode, err.message);
    } else {
      // log.error('%s %d %s', req.method, res.statusCode, err.message);
    }
    res.json({
      message: err.message
    });
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

runServer();
