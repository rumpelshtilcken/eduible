/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

import models from 'models';

import authRouter from '../index';

chai.use(chaiHttp);
const expect = chai.expect;

const validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

const wrongEmail = {
  email: 'kasaselya91@gmail.com',
  errorMessage: 'User does not exist'
};

const notValidEmail = {
  email: 'kasaselya91',
  errorMessage: 'Invalid email'
};

describe('Forgot password functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use(authRouter);
  });

  // Functionality:
  // 1. take and verify email to valid and existense in db
  // 2. generate key and save to the new table ForgotPassword
  // 3. send email to the user

  it('/forgottenPassword should return You should send email', async () => {
    try {
      await chai.request(server).post('/forgottenPassword').send({});
    } catch (e) {
      expect(e.status).to.equal(400);
      return expect(e.response.body.message).to.equal('You should send email');
    }

    expect(false).to.be.ok;
  });

  it('/forgottenPassword should return email not valid', async () => {
    try {
      await chai.request(server).post('/forgottenPassword').send({ email: notValidEmail.email });
    } catch (e) {
      expect(e.status).to.equal(400);
      return expect(e.response.body.message).to.equal(notValidEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('/forgottenPassword should return user does not exist', async () => {
    try {
      await models.User.create({
        email: validUser.email,
        password: validUser.password
      });

      await chai.request(server).post('/forgottenPassword').send({ email: wrongEmail.email });
    } catch (e) {
      expect(e.status).to.equal(400);
      return expect(e.response.body.message).to.equal(wrongEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('/forgottenPassword should add temporary password', async () => {
    await models.User.create({
      email: validUser.email,
      password: validUser.password
    });

    await chai.request(server).post('/forgottenPassword').send({ email: validUser.email });

    const user = await models.User.findOne({ where: { email: validUser.email } });

    expect(user.tempPassword).to.be.a('string');
  });

  it('/forgottenPassword should send message', async () => {
    await models.User.create({
      email: validUser.email,
      password: validUser.password
    });

    const res = await chai
      .request(server)
      .post('/forgottenPassword')
      .send({ email: validUser.email });

    expect(res.body.message).to.be.equal('Message sent');
  });
});
