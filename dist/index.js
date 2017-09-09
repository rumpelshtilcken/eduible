'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./routes/auth');

var _comingsoon = require('./routes/comingsoon');

var _comingsoon2 = _interopRequireDefault(_comingsoon);

var _graphqlServerExpress = require('graphql-server-express');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = _config2.default.NODE_ENV,
    PORT = _config2.default.PORT;

var dev = NODE_ENV !== 'production';

var app = (0, _next2.default)({
  dir: 'app',
  dev: dev
});
var handler = app.getRequestHandler();

var runServer = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var server;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return app.prepare();

          case 2:
            server = (0, _express2.default)();

            // Load body parser to handle POST requests

            server.use(_bodyParser2.default.json());
            server.use(_bodyParser2.default.urlencoded({
              extended: true
            }));
            server.use(_passport2.default.initialize());

            server.use('*', (0, _cors2.default)({ origin: 'http://localhost:3000' }));

            server.use('/api/v1', _comingsoon2.default);
            server.use('/api/v1/auth/local', _auth.localAuth);
            server.use('/api/v1/auth/facebook', _auth.facebookAuth);
            server.use('/api/v1/auth/google', _auth.googleAuth);
            server.use('/graphql', (0, _graphqlServerExpress.graphqlExpress)({
              schema: _schema2.default
            }));
            server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
              endpointURL: '/graphql'
            }));
            server.get('*', function (req, res) {
              return handler(req, res);
            });

            // production error handler
            // no stacktraces leaked to user
            server.use(function (err, req, res, next) {
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

            server.listen(PORT, function (err) {
              if (err) throw err;
              console.log('> Ready on http://localhost:' + PORT);
            });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function runServer() {
    return _ref.apply(this, arguments);
  };
}();

runServer();