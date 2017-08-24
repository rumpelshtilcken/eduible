'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

var bodyParser = require('body-parser');
var chai = require('chai');
var chaiHttp = require('chai-http');
var express = require('express');

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
  errorMessage: 'User does not exist'
};

var notValidEmail = {
  email: 'kasaselya91',
  errorMessage: 'Invalid email'
};

describe('Code verification functionality', function () {
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

  it('verifyCode it should return wrong email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var savedUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return chai.request(server).post('/signup').send(validUser);

          case 3:
            _context2.next = 5;
            return models.User.findOne({ where: { email: validUser.email } });

          case 5:
            savedUser = _context2.sent;
            _context2.next = 8;
            return chai.request(server).post('/verifyCode').send({ email: notValidEmail.email, verificationCode: savedUser.verificationCode });

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);

            expect(_context2.t0.status).to.equal(401);
            return _context2.abrupt('return', expect(_context2.t0.response.body.message).to.equal(notValidEmail.errorMessage));

          case 14:

            expect(false).to.be.ok;

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  })));

  it('verifyCode it should return user does not exist', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var savedUser;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return chai.request(server).post('/signup').send(validUser);

          case 3:
            _context3.next = 5;
            return models.User.findOne({ where: { email: validUser.email } });

          case 5:
            savedUser = _context3.sent;
            _context3.next = 8;
            return chai.request(server).post('/verifyCode').send({ email: wrongEmail.email, verificationCode: savedUser.verificationCode });

          case 8:
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            expect(_context3.t0.status).to.equal(401);
            return _context3.abrupt('return', expect(_context3.t0.response.body.message).to.equal(wrongEmail.errorMessage));

          case 14:

            expect(false).to.be.ok;

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  })));

  it('verifyCode it should return verification code not correct', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return chai.request(server).post('/signup').send(validUser);

          case 3:
            _context4.next = 5;
            return chai.request(server).post('/verifyCode').send({ email: validUser.email, verificationCode: '' });

          case 5:
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);

            expect(_context4.t0.status).to.equal(401);
            return _context4.abrupt('return', expect(_context4.t0.response.body.message).to.equal('You should send email and verificationCode'));

          case 11:

            expect(false).to.be.ok;

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  })));

  it('verifyCode it should return you should send email and verificationCode', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return chai.request(server).post('/signup').send(validUser);

          case 3:
            _context5.next = 5;
            return chai.request(server).post('/verifyCode').send();

          case 5:
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);

            expect(_context5.t0.status).to.equal(401);
            return _context5.abrupt('return', expect(_context5.t0.response.body.message).to.equal('You should send email and verificationCode'));

          case 11:

            expect(false).to.be.ok;

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  })));

  it('verifyCode user verified should be true', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var savedUser;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return chai.request(server).post('/signup').send(validUser);

          case 2:
            _context6.next = 4;
            return models.User.findOne({ where: { email: validUser.email } });

          case 4:
            savedUser = _context6.sent;
            _context6.next = 7;
            return chai.request(server).post('/verifyCode').send({ email: validUser.email, verificationCode: savedUser.verificationCode });

          case 7:
            _context6.next = 9;
            return models.User.findOne({ where: { email: validUser.email } });

          case 9:
            savedUser = _context6.sent;


            expect(savedUser.verified).to.equal(true);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});