const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const passport = require('passport');
const comingsoon = require('./routes/comingsoon');
const config = require('./config');
const authRoutes = require('./routes/local-auth');
const facebookRoutes = require('./routes/facebook-auth');


const { NODE_ENV, PORT } = config;
const DEV = NODE_ENV !== 'production';

const app = next({ dir: '.', dev: DEV });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // Load body parser to handle POST requests
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(passport.initialize());

  server.use('/api/v1', comingsoon);
  server.use('/api/v1/auth/local', authRoutes);
  server.use('/api/v1/auth/facebook', facebookRoutes);
  server.get('*', (req, res) => handler(req, res));


  // error handlers
  // development error handler
  // will print stacktrace
  if (DEV) {
    server.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  server.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

runServer();
