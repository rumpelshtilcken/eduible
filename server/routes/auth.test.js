/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const authRouter = require('./auth');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Local Authentication', () => {
  describe('Signup functionality', () => {
    let server;

    beforeEach(() => {
      server = express();
      server.use(authRouter);
    });

    it('/signup should create a new user and send token', async () => {
      const signupUser = {
        email: 'kasaselya91@mail.ru',
        password: 'adadad',
        confirmPassword: 'adadad'
      };
      const res = await chai.request(server)
        .post('/signup')
        .send(signupUser);
      expect(res.body).to.have.property('access_token'); // to do: add check for access_token
    });

    it('should respond 401 if empty user model', async () => {
      const res = await chai.request(server)
        .post('/signup')
        .send({});
      expect(res.body).to.have.property('message');
    });

    it('should respond 401 if empty string field', async () => {
      const res = await chai.request(server)
        .post('/signup')
        .send({ email: '', password: '', confirmPassword: '' })
        .expect(401);
      expect(res.body).to.have.property('message');
    });
  });
});
