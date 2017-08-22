/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

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
  }),
  invalidConfirmPassword: Object.assign(validUser, {
    confirmPassword: 'adadasd'
  })
};

const Tests = [
  {
    info: {
      name: '/signup should respond 401 if user model is empty',
      errorMessage: 'you should fill the email and password field'
    },
    user: invalid.empty
  },
  {
    info: {
      name: '/signup should respond 401 if email not valid',
      errorMessage: 'invalid email'
    },
    user: invalid.invalidEmail
  },
  {
    info: {
      name: '/signup should respond 401 if password not valid',
      errorMessage: 'it should be same as your password'
    },
    user: invalid.invalidPassword
  },
  {
    info: {
      name: '/signup should respond 401 if password not equal confirm password',
      errorMessage: 'it should be same as your password'
    },
    user: invalid.invalidConfirmPassword
  }
];

const testInvalidInputs = (server, chai, expect) =>
  Tests.map(test => ({
    name: test.info.name,
    test: async () => {
      try {
        await chai.request(server).post('/signup').send(test.user);
      } catch (e) {
        expect(e.status).to.equal(401);
        return expect(e.response.body.message).to.equal(test.info.errorMessage);
      }

      expect(false).to.be.ok;
    }
  }));

module.exports = testInvalidInputs;
