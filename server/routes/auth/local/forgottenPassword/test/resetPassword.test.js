/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import uuidv1 from 'uuid/v1';

import models from 'models';

import authRouter from '../../index';

chai.use(chaiHttp);
const expect = chai.expect;

const validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

describe('/forgottenPassword/resetPassword functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use(authRouter);
  });

  // Functionality:
  // 1. Take tempPassword and verify
  // 2. Verify tempPassword existence
  // 3. Open modal for password changing
  // 4. Take and verify password and confirm password
  // 5. Update user's password

  it('/resetPassword should return You should send token and password and confirm password', async () => {
    try {
      await chai.request(server).get('/forgottenPassword/resetPassword').send({});
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal(
        'You should send token and password and confirm password'
      );
    }

    expect(false).to.be.ok;
  });

  it('/resetPassword should return Token is invalid', async () => {
    try {
      await models.User.create({
        email: validUser.email,
        password: validUser.password
      });

      await chai
        .request(server)
        .get('/forgottenPassword/resetPassword')
        .send({ token: 'ss', password: 'ss', confirmPassword: 'ss' });
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal('Token is invalid');
    }

    expect(false).to.be.ok;
  });

  it('/resetPassword should return Password should be more than 8 character', async () => {
    try {
      const tempPassword = uuidv1();

      await models.User.create({
        email: validUser.email,
        password: validUser.password,
        tempPassword
      });

      await chai
        .request(server)
        .get('/forgottenPassword/resetPassword')
        .send({ token: tempPassword, password: 'ss', confirmPassword: 'ss' });
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal('Password should be more than 8 character');
    }

    expect(false).to.be.ok;
  });

  it('/resetPassword should return Confirm password should be same as your password', async () => {
    try {
      const tempPassword = uuidv1();

      await models.User.create({
        email: validUser.email,
        password: validUser.password,
        tempPassword
      });

      await chai
        .request(server)
        .get('/forgottenPassword/resetPassword')
        .send({ token: tempPassword, password: validUser.password, confirmPassword: 'ss' });
    } catch (e) {
      expect(e.status).to.equal(422);
      return expect(e.response.body.message).to.equal(
        'Confirm password should be same as your password'
      );
    }

    expect(false).to.be.ok;
  });

  it('/resetPassword should chage password', async () => {
    const tempPassword = uuidv1();

    await models.User.create({
      email: validUser.email,
      password: validUser.password,
      tempPassword
    });

    await chai.request(server).get('/forgottenPassword/resetPassword').send({
      token: tempPassword,
      password: validUser.password,
      confirmPassword: validUser.password
    });

    const alteredUser = await models.User.findOne({ where: { email: validUser.email } });
    expect(await bcrypt.compare(validUser.password, alteredUser.password)).to.be.ok;
  });
});
