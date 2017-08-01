/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRouter = require('./local-auth');
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
        email: 'kasaselsya91@mail.ru',
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
        email: 'kasasesdalsya91@mail.ru',
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
        email: 'kasaseslsya91@mail.ru',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      const res = await chai.request(server)
        .post('/signup')
        .send(signupUser);

      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    });

    it('/signup should respond 401 if user model is empty', async () => {
      try {
        await chai.request(server)
          .post('/signup')
          .send({});
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('you should fill the email and password field');
      }
      expect(false).to.be.ok;
    });

    it('/signup should respond 401 if email contains invalid email', async () => {
      const signupUser = {
        email: 'kasaselya91',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      try {
        await chai.request(server)
          .post('/signup')
          .send(signupUser);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('invalid email');
      }
      expect(false).to.be.ok;
    });

    it('/signup should respond 401 if password not equal confirm password', async () => {
      const signupUser = {
        email: 'kasaselya91@gmail.com',
        password: 'adadad',
        confirmPassword: 'adadasd'
      };
      try {
        const res = await chai.request(server)
          .post('/signup')
          .send(signupUser);

        console.log(res.body);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('it should be same as your password');
      }
      expect(false).to.be.ok;
    });

    it('/signup should respond 401 if email already exists', async () => {
      await models.User.create({
        email: 'kasaselya91@gmail.com',
        password: 'adadad'
      });
      const signupUser = {
        email: 'kasaselya91@gmail.com',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      try {
        await chai.request(server)
          .post('/signup')
          .send(signupUser);
      } catch (e) {
        console.log('error_______', e.response.body.message);
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('email already exists');
      }
      expect(false).to.be.ok;
    });
    // TODO send verification email and test
  });

  describe('Signin functionality', () => {
    let server;

    beforeEach(async () => {
      // cleanup database and setup a new server on each test
      await models.sequelize.sync({ force: true });
      server = express();
      server.use(bodyParser.json());
      server.use(authRouter);
    });

    it('/signin should respond 401 if email doesnt exist', async () => {
      const signinUser = {
        email: 'kasaselya91@gmail.com',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      try {
        await chai.request(server)
          .post('/signin')
          .send(signinUser);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('user doesnt exist');
      }
      expect(false).to.be.ok;
    });

    it('/signin should respond 401 if wrong password', async () => {
      await models.User.create({
        email: 'kasaselya91@gmail.com',
        password: 'adadad'
      });
      const signinUser = {
        email: 'kasaselya91@gmail.com',
        password: 'adadsad',
        confirmPassword: 'adadad'
      };
      try {
        await chai.request(server)
          .post('/signin')
          .send(signinUser);
      } catch (e) {
        console.log('pass', e.response.body.message);
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal('password is wrong');
      }
      expect(false).to.be.ok;
    });

    it('/signin should send an access_token as jwt', async () => {
      await models.User.create({
        email: 'kasaselya91@gmail.com',
        password: 'adadad'
      });
      const signinUser = {
        email: 'kasaselya91@gmail.com',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      const res = await chai.request(server)
        .post('/signin')
        .send(signinUser);

      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    });
  });
});
