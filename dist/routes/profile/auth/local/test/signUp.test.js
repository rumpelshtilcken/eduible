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
var InvalidInputsTest = require('./invalidInput');

chai.use(chaiHttp);
var expect = chai.expect;

var validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

var ValidInputsTestNames = {
  creationNewUser: '/signup should create new user from passed post params in db',
  generatingVerificationCode: '/signup should generate verification code for new user',
  hashingPassword: '/signup should hash password and store hashed version in db',
  generatingAccessToken: '/signup should send an access_token as jwt'
};

describe('Local Authentication', function () {
  describe('Signup functionality', function () {
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

    it(ValidInputsTestNames.creationNewUser, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var savedUser;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return chai.request(server).post('/signup').send(validUser);

            case 2:
              _context2.next = 4;
              return models.User.findOne({ where: { email: validUser.email } });

            case 4:
              savedUser = _context2.sent;

              expect(savedUser.email).to.equal(validUser.email);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it(ValidInputsTestNames.hashingPassword, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var savedUser;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return chai.request(server).post('/signup').send(validUser);

            case 2:
              _context3.next = 4;
              return models.User.findOne({ where: { email: validUser.email } });

            case 4:
              savedUser = _context3.sent;
              _context3.t0 = expect;
              _context3.next = 8;
              return bcrypt.compare(validUser.password, savedUser.password);

            case 8:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.ok;

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it(ValidInputsTestNames.generatingVerificationCode, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var savedUser;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return chai.request(server).post('/signup').send(validUser);

            case 2:
              _context4.next = 4;
              return models.User.findOne({ where: { email: validUser.email } });

            case 4:
              savedUser = _context4.sent;


              expect(savedUser.verificationCode).to.be.a('string');

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it(ValidInputsTestNames.generatingAccessToken, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var res;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return chai.request(server).post('/signup').send(validUser);

            case 2:
              res = _context5.sent;


              expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    // Invalid inputs test
    InvalidInputsTest.map(function (test) {
      return it(test.info.name, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return chai.request(server).post('/signup').send(test.user);

              case 3:
                _context6.next = 9;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6['catch'](0);

                expect(_context6.t0.status).to.equal(401);
                return _context6.abrupt('return', expect(_context6.t0.response.body.message).to.equal(test.info.errorMessage));

              case 9:

                expect(false).to.be.ok;

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[0, 5]]);
      })));
    });
  });
});