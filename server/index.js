const authRoutes = require('./routes/local-auth');
const bodyParser = require('body-parser');
const comingsoon = require('./routes/comingsoon');
const config = require('./config');
const cors = require('cors');
const express = require('express');
const facebookRoutes = require('./routes/facebook-auth');
const next = require('next');
const passport = require('passport');

const { NODE_ENV, PORT } = config;
const DEV = NODE_ENV !== 'production';

const app = next({ dir: 'src', dev: DEV });
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
  server.use('/api/v1/auth/local', authRoutes);
  server.use('/api/v1/auth/facebook', facebookRoutes);
  server.get('*', (req, res) => handler(req, res));

  // production error handler
  // no stacktraces leaked to user
  server.use((err, req, res, next) => { // eslint-disable-line
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
