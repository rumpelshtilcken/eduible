/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import jwt from 'jsonwebtoken';

import config from 'config';
import models from 'models';

import authRoutes from '../index';

chai.use(chaiHttp);
const expect = chai.expect;

const validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

const wrongEmail = {
  email: 'kasaselya91@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};
const notValidEmail = {
  email: 'kasaselya91',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};
const wrongPassword = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adada'
};

const TestsInfo = {
  sameTests: [
    {
      name: '/signin should respond 401 if email doesnt exist',
      errorMessage: 'User does not exist',
      user: wrongEmail
    },
    {
      name: '/signin should respond 401 if email not valid',
      errorMessage: 'Invalid email',
      user: notValidEmail
    },
    {
      name: '/signin should respond 401 if wrong password',
      errorMessage: 'Password is wrong',
      user: wrongPassword
    }
  ],
  accessToken: {
    name: '/signin should send an access_token as jwt',
    errorMessage: ''
  }
};

describe('Signin functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use(authRoutes);
  });

  TestsInfo.sameTests.map(test =>
    it(test.name, async () => {
      if (test.user) {
        await models.User.create({
          email: validUser.email,
          password: await bcrypt.hash(validUser.password, 10)
        });
      }

      try {
        await chai.request(server).post('/signin').send(test.user);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal(test.errorMessage);
      }

      expect(false).to.be.ok;
    })
  );

  it(TestsInfo.accessToken.name, async () => {
    await models.User.create({
      email: validUser.email,
      password: await bcrypt.hash(validUser.password, 10)
    });

    const res = await chai.request(server).post('/signin').send(validUser);

    expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
  });
});
