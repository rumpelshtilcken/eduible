import bodyParser from 'body-parser';
import express from 'express';
import next from 'next';
import config from 'config';

import videochat from 'routes/videochat';
import aknowledgements from 'routes/aknowledgements';

const { NODE_ENV, PORT } = config;

const dev = NODE_ENV !== 'production';
const app = next({ dir: 'app', dev });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // Load body parser to handle POST requests
  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  server.use('/api/v1/videochat', videochat);
  server.use('/api/v1/aknowledgements', aknowledgements);

  server.get('*', (req, res) => handler(req, res));

  // production error handler
  // no stacktraces leaked to user
  /* eslint-disable */
  server.use((err, req, res, next) => {
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

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

runServer();
