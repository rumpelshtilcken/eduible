const express = require('express');
const next = require('next');
// import router from './router';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handler = app.getRequestHandler();

const runServer = async () => {
  await app.prepare();
  const server = express();

  // server.use('/api/v1', router);
  server.get('*', (req, res) => handler(req, res));

  server.listen(3000, (err) => {
    console.log('====');
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
};

runServer();
