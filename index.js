const express = require('express');
const next = require('next');
const comingsoon = require('./server/routes/comingsoon');
// import router from './router';
const bodyParser = require('body-parser');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dir: '.', dev: DEV });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // Load body parser to handle POST requests
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  // server.use('/api/v1', router);
  server.get('*', (req, res) => handler(req, res));
  server.use('/comingSoon', comingsoon);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log('> Ready on https://eduible.herokuapp.com/');
  });
};

runServer();
