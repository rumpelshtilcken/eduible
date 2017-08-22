/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const jwt = require('jsonwebtoken');

const models = require('../../../../../models');
const config = require('../../../../../config');

const validUser = {
  email: 'adilkhankenzhetaev@gmail.ru',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

const invalid = {
  empty: {},
  invalidEmail: Object.assign(validUser, {
    email: 'kasaselya91'
  }),
  invalidPassword: Object.assign(validUser, {
    password: 'adada'
  })
};

const TestsInfo = {
  userDoesntExist: {
    errorMessage: 'User does not exist'
  },
  invalidEmail: {
    errorMessage: 'Invalid email'
  },
  wrongPassword: {
    errorMessage: 'Password is wrong'
  },
  accessToken: {
    errorMessage: ''
  }
};

const Test = {
  userDoesntExist: {
    name: '/signin should respond 401 if email doesnt exist',
    test: (server, chai, expect) => async () => {
      try {
        await chai.request(server).post('/signin').send(validUser);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal(TestsInfo.userDoesntExist.errorMessage);
      }
      expect(false).to.be.ok;
    }
  },

  wrongEmail: {
    name: '/signin should respond 401 if email not valid',
    test: (server, chai, expect) => async () => {
      try {
        await chai.request(server).post('/signup').send(invalid.invalidEmail);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal(TestsInfo.invalidEmail.errorMessage);
      }

      expect(false).to.be.ok;
    }
  },

  wrongPassword: {
    name: '/signin should respond 401 if wrong password',
    test: (server, chai, expect) => async () => {
      await models.User.create({
        email: validUser.email,
        password: validUser.password
      });
      try {
        await chai.request(server).post('/signin').send(invalid.invalidPassword);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal(TestsInfo.wrongPassword.errorMessage);
      }
      expect(false).to.be.ok;
    }
  },

  accessToken: {
    name: '/signin should send an access_token as jwt',
    test: (server, chai, expect) => async () => {
      await models.User.create({
        email: validUser.email,
        password: validUser.password
      });

      const res = await chai.request(server).post('/signin').send(validUser);
      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    }
  }
};

module.exports = Test;
