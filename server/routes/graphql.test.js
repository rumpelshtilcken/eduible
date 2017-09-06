/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import jwt from 'jsonwebtoken';

import config from 'config';
import models from 'models';

import graphqlRoute from './graphql';

chai.use(chaiHttp);
const expect = chai.expect;

const validUser = {
  email: 'adilkhankenzhetaev@gmail.com',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

describe('Graphql functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    await models.sequelize.sync({ force: true });
    server = express();
    server.use(bodyParser.json());
    server.use('/graphql', graphqlRoute);
  });

  it('Graphql sends error if no HTTP Bearer is provided', async () => {
    try {
      await chai.request(server).get('/graphql');
      expect(true).to.equal(false);
    } catch (e) {
      expect(e.status).to.equal(401);
    }
  });

  it('Graphql sends error if JWT is not valid', async () => {
    try {
      await chai.request(server).get('/graphql').set('Authorization', 'Bearer kjhlkhkjhl');
      expect(true).to.equal(false);
    } catch (e) {
      expect(e.status).to.equal(401);
    }
  });

  it('Graphql sends error if JWT is valid but user does not exist', async () => {
    const token = jwt.sign({ id: 1 }, config.JWT_SECRET);
    try {
      await chai.request(server).get('/graphql').set('Authorization', `Bearer ${token}`);
      expect(true).to.equal(false);
    } catch (e) {
      expect(e.status).to.equal(401);
    }
  });

  it('Graphql success case', async () => {
    const newUser = await models.User.create({
      email: validUser.email,
      password: validUser.password,
      verified: true
    });

    const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET);
    const res = await chai.request(server).get('/graphql').set('Authorization', `Bearer ${token}`);

    expect(res.body.message).to.equal('hello');
  });
});
