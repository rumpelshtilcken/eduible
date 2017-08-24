/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../../../../../config');
const models = require('../../../../../models');

const authRouter = require('../index');
const InvalidInputsTest = require('./invalidInput');

chai.use(chaiHttp);
const expect = chai.expect;

const validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

const ValidInputsTestNames = {
  creationNewUser: '/signup should create new user from passed post params in db',
  generatingVerificationCode: '/signup should generate verification code for new user',
  hashingPassword: '/signup should hash password and store hashed version in db',
  generatingAccessToken: '/signup should send an access_token as jwt'
};

describe('Local Authentication', () => {
  describe('Signup functionality', () => {
    let server;

    beforeEach(async () => {
      // cleanup database and setup a new server on each test
      await models.sequelize.sync({ force: true });
      server = express();
      server.use(bodyParser.json());
      server.use(authRouter);
    });

    it(ValidInputsTestNames.creationNewUser, async () => {
      await chai.request(server).post('/signup').send(validUser);

      const savedUser = await models.User.findOne({ where: { email: validUser.email } });
      expect(savedUser.email).to.equal(validUser.email);
    });

    it(ValidInputsTestNames.hashingPassword, async () => {
      await chai.request(server).post('/signup').send(validUser);

      const savedUser = await models.User.findOne({ where: { email: validUser.email } });
      expect(await bcrypt.compare(validUser.password, savedUser.password)).to.be.ok;
    });

    it(ValidInputsTestNames.generatingVerificationCode, async () => {
      await chai.request(server).post('/signup').send(validUser);

      const savedUser = await models.User.findOne({ where: { email: validUser.email } });

      expect(savedUser.verificationCode).to.be.a('string');
    });

    it(ValidInputsTestNames.generatingAccessToken, async () => {
      const res = await chai.request(server).post('/signup').send(validUser);

      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    });

    // Invalid inputs test
    InvalidInputsTest.map(test =>
      it(test.info.name, async () => {
        try {
          await chai.request(server).post('/signup').send(test.user);
        } catch (e) {
          expect(e.status).to.equal(401);
          return expect(e.response.body.message).to.equal(test.info.errorMessage);
        }

        expect(false).to.be.ok;
      })
    );
  });
});
