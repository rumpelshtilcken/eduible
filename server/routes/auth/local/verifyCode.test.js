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

describe('Code verification functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use(authRouter);
    server.get('/profile', (req, res) => {
      res.json({ message: 'Profile' });
    });
  });

  it('verifyCode it should return wrong email', async () => {
    try {
      await chai.request(server).post('/signup').send(validUser);
      const savedUser = await models.User.findOne({ where: { email: validUser.email } });

      await chai
        .request(server)
        .post('/verifyCode')
        .send({ email: notValidEmail.email, verificationCode: savedUser.verificationCode });
    } catch (e) {
      expect(e.status).to.equal(401);
      return expect(e.response.body.message).to.equal(notValidEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('verifyCode it should return user does not exist', async () => {
    try {
      await chai.request(server).post('/signup').send(validUser);
      const savedUser = await models.User.findOne({ where: { email: validUser.email } });

      await chai
        .request(server)
        .post('/verifyCode')
        .send({ email: wrongEmail.email, verificationCode: savedUser.verificationCode });
    } catch (e) {
      expect(e.status).to.equal(401);
      return expect(e.response.body.message).to.equal(wrongEmail.errorMessage);
    }

    expect(false).to.be.ok;
  });

  it('verifyCode it should return verification code not correct', async () => {
    try {
      await chai.request(server).post('/signup').send(validUser);

      await chai
        .request(server)
        .post('/verifyCode')
        .send({ email: validUser.email, verificationCode: '' });
    } catch (e) {
      expect(e.status).to.equal(401);
      return expect(e.response.body.message).to.equal('You should send email and verificationCode');
    }

    expect(false).to.be.ok;
  });

  it('verifyCode it should return you should send email and verificationCode', async () => {
    try {
      await chai.request(server).post('/signup').send(validUser);

      await chai.request(server).post('/verifyCode').send();
    } catch (e) {
      expect(e.status).to.equal(401);
      return expect(e.response.body.message).to.equal('You should send email and verificationCode');
    }

    expect(false).to.be.ok;
  });

  it('verifyCode user verified should be true', async () => {
    await chai.request(server).post('/signup').send(validUser);
    let savedUser = await models.User.findOne({ where: { email: validUser.email } });

    await chai
      .request(server)
      .post('/verifyCode')
      .send({ email: validUser.email, verificationCode: savedUser.verificationCode });

    savedUser = await models.User.findOne({ where: { email: validUser.email } });

    expect(savedUser.verified).to.equal(true);
  });
});
