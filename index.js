const express = require('express');
const next = require('next');
const smtpTransport = require('nodemailer-smtp-transport');
const auth = require('./routes/auth');
const comingsoon = require('./routes/comingsoon');
const models = require('./models');

// Load environment variables from .env file if present
require('dotenv').load();

// now-logs allows remote debugging if deploying to now.sh
if (process.env.LOGS_SECRET) {
  require('now-logs')(process.env.LOGS_SECRET);
}

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

// Default when run with `npm start` is 'production' and default port is '3000'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;

// Secret used to encrypt session data stored on the server
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'change-me';

// If EMAIL_USERNAME and EMAIL_PASSWORD are configured use them to send email.
// e.g. For a Google Mail account (@gmail.com) set EMAIL_SERVICE to 'gmail'
// See nodemailer documentation for other values for EMAIL_SERVICE.
let mailserver = null;
if (process.env.EMAIL_SERVER && process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
  mailserver = smtpTransport({
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_PORT || 25,
    secure: !!(process.env.EMAIL_SECURE && process.env.EMAIL_SECURE.match(/true/i)),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}

const app = next({
  dir: '.',
  dev: process.env.NODE_ENV === 'development'
});

const handle = app.getRequestHandler();
let server;

app
  .prepare()
  .then(() => {
    // Get instance of Express server
    server = express();

    // Once DB is available, setup sessions and routes for authentication
    auth.configure({
      app,
      server,
      user: models.User,
      secret: process.env.SESSION_SECRET,
      mailserver,
      fromEmail: process.env.EMAIL_ADDRESS || null
    });

    // A simple example of a custom route
    // Says requests to '/route/{anything}' will be handled by 'pages/routing.js'
    // and the {anything} part will be pased to the page in parameters.
    server.get('/route/:id', (req, res) => app.render(req, res, '/routing', req.params));

    server.use('/comingSoon', comingsoon)

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    // Set vary header (good practice)
    // Note: This overrides any existing 'Vary' header but is okay in this app
    server.use((req, res, next) => {
      res.setHeader('Vary', 'Accept-Encoding');
      next();
    });

    server.listen(process.env.PORT, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${process.env.PORT} [${process.env.NODE_ENV}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
