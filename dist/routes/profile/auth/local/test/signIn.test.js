'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var chai = require('chai');
var chaiHttp = require('chai-http');
var express = require('express');
var jwt = require('jsonwebtoken');

var config = require('../../../../../config');
var models = require('../../../../../models');

var authRouter = require('../index');

chai.use(chaiHttp);
var expect = chai.expect;

var validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

var wrongEmail = {
  email: 'kasaselya91@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};
var notValidEmail = {
  email: 'kasaselya91',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};
var wrongPassword = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adada'
};

var TestsInfo = {
  sameTests: [{
    name: '/signin should respond 401 if email doesnt exist',
    errorMessage: 'User does not exist',
    user: wrongEmail
  }, {
    name: '/signin should respond 401 if email not valid',
    errorMessage: 'Invalid email',
    user: notValidEmail
  }, {
    name: '/signin should respond 401 if wrong password',
    errorMessage: 'Password is wrong',
    user: wrongPassword
  }],
  accessToken: {
    name: '/signin should send an access_token as jwt',
    errorMessage: ''
  }
};

describe('Signin functionality', function () {
  var server = void 0;

  beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return models.sequelize.sync({ force: true });

          case 2:
            server = express();
            server.use(bodyParser.json());
            server.use(authRouter);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  TestsInfo.sameTests.map(function (test) {
    return it(test.name, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!test.user) {
                _context2.next = 9;
                break;
              }

              _context2.t0 = models.User;
              _context2.t1 = validUser.email;
              _context2.next = 5;
              return bcrypt.hash(validUser.password, 10);

            case 5:
              _context2.t2 = _context2.sent;
              _context2.t3 = {
                email: _context2.t1,
                password: _context2.t2
              };
              _context2.next = 9;
              return _context2.t0.create.call(_context2.t0, _context2.t3);

            case 9:
              _context2.prev = 9;
              _context2.next = 12;
              return chai.request(server).post('/signin').send(test.user);

            case 12:
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t4 = _context2['catch'](9);

              expect(_context2.t4.status).to.equal(401);
              return _context2.abrupt('return', expect(_context2.t4.response.body.message).to.equal(test.errorMessage));

            case 18:

              expect(false).to.be.ok;

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[9, 14]]);
    })));
  });

  it(TestsInfo.accessToken.name, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var res;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = models.User;
            _context3.t1 = validUser.email;
            _context3.next = 4;
            return bcrypt.hash(validUser.password, 10);

          case 4:
            _context3.t2 = _context3.sent;
            _context3.t3 = {
              email: _context3.t1,
              password: _context3.t2
            };
            _context3.next = 8;
            return _context3.t0.create.call(_context3.t0, _context3.t3);

          case 8:
            _context3.next = 10;
            return chai.request(server).post('/signin').send(validUser);

          case 10:
            res = _context3.sent;


            expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});