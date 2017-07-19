const express = require('express');
const next = require('next');
// import router from './router';

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dir: '.', dev: DEV });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // server.use('/api/v1', router);
  server.get('*', (req, res) => handler(req, res));

  server.listen(PORT, (err) => {
    console.log('====');
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
};

runServer();
