/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

import models from 'models';

import authRouter from './index';

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

describe('Email confirmation resend functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use(authRouter);
  });

  it('resendConfirmationEmail it should return wrong email', async () => {
    try {
      await chai
        .request(server)
        .post('/resendConfirmationEmail')
        .send({ email: notValidEmail.email });
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal(notValidEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('resendConfirmationEmail it should return user does not exist', async () => {
    try {
      await models.User.create({
        email: validUser.email,
        password: validUser.password
      });

      await chai.request(server).post('/resendConfirmationEmail').send({ email: wrongEmail.email });
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal(wrongEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('resendConfirmationEmail it should change verificationCode', async () => {
    const verificationCode = 'sssss';
    await models.User.create({
      email: validUser.email,
      password: validUser.password,
      verificationCode
    });

    await chai.request(server).post('/resendConfirmationEmail').send({ email: validUser.email });

    const savedUser = await models.User.findOne({ where: { email: validUser.email } });
    expect(savedUser.verificationCode).to.not.equal(verificationCode);
  });

  it('resendConfirmationEmail it should return message send', async () => {
    await models.User.create({
      email: validUser.email,
      password: validUser.password
    });

    const res = await chai
      .request(server)
      .post('/resendConfirmationEmail')
      .send({ email: validUser.email });
    expect(res.body.message).to.equal('Success');
  });
});
