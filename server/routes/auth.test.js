/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRouter = require('./auth');
const models = require('../models');
const config = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;

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

    it('/signup should create new user from passed post params in db', async () => {
      const signupUser = {
        email: 'kasaselya91@mail.ru',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      await chai.request(server)
        .post('/signup')
        .send(signupUser);

      const savedUser = await models.User.findOne({ where: { email: signupUser.email } });
      expect(savedUser.email).to.equal(signupUser.email);
    });

    it('/signup should hash password and store hashed version in db', async () => {
      const signupUser = {
        email: 'kasaselya91@mail.ru',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      await chai.request(server)
        .post('/signup')
        .send(signupUser);

      const savedUser = await models.User.findOne({ where: { email: signupUser.email } });
      expect(await bcrypt.compare(signupUser.password, savedUser.password)).to.be.ok;
    });

    it('/signup should send an access_token as jwt', async () => {
      const signupUser = {
        email: 'kasaselya91@mail.ru',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      const res = await chai.request(server)
        .post('/signup')
        .send(signupUser);

      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    });
  });
});
