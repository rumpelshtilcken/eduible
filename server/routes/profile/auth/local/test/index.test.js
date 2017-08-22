/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const bodyParser = require('body-parser');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

const models = require('../../../../../models');

const authRouter = require('../index');
const testInvalidInputs = require('./signUp/invalidInput');
const testSignIn = require('./signInTest');
const testValidInput = require('./signUp/validInput');

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

    it(testValidInput.creationNewUser.name, async () =>
      testValidInput.creationNewUser.test(server, chai, expect)
    );

    it(testValidInput.hashingPassword.name, async () =>
      testValidInput.hashingPassword.test(server, chai, expect)
    );

    it(testValidInput.generatingAccessToken.name, async () =>
      testValidInput.generatingAccessToken.test(server, chai, expect)
    );

    testInvalidInputs(server, chai, expect).map(test => it(test.name, async () => test.test));
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

    it(testSignIn.wrongPassword.name, async () =>
      testSignIn.wrongPassword.test(server, chai, expect)
    );
    it(testSignIn.wrongEmail.name, async () => testSignIn.wrongEmail.test(server, chai, expect));
    it(testSignIn.userDoesntExist.name, async () =>
      testSignIn.userDoesntExist.test(server, chai, expect)
    );
    it(testSignIn.accessToken.name, async () => testSignIn.accessToken.test(server, chai, expect));
  });
});
