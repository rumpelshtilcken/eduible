const express = require('express');
const next = require('next');
const comingsoon = require('../server/routes/comingsoon');
// import router from './router';
const bodyParser = require('body-parser');

const DEV = process.env.NODE_ENV !== 'development';
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
  server.get('/route/:id', (req, res) => app.render(req, res, '/routing', req.params));
  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => handler(req, res));

  // Set vary header (good practice)
  // Note: This overrides any existing 'Vary' header but is okay in this app
  server.use((req, res, next) => {
    res.setHeader('Vary', 'Accept-Encoding');
    next();
  });

  server.listen(PORT, (err) => {
    console.log('====');
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
};

runServer();
