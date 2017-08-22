/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../../../../config');
const models = require('../../../../../../models');

const validUser = {
  email: 'adilkhankenzhetaev@gmail.ru',
  password: 'adadadadadad',
  confirmPassword: 'adadadadadad'
};

const Test = {
  creationNewUser: {
    name: '/signup should create new user from passed post params in db',
    test: (server, chai, expect) => async () => {
      await chai.request(server).post('/signup').send(validUser);

      const savedUser = await models.User.findOne({ where: { email: validUser.email } });
      expect(savedUser.email).to.equal(validUser.email);
    }
  },
  hashingPassword: {
    name: '/signup should hash password and store hashed version in db',
    test: (server, chai, expect) => async () => {
      await chai.request(server).post('/signup').send(validUser);

      const savedUser = await models.User.findOne({ where: { email: validUser.email } });
      expect(await bcrypt.compare(validUser.password, savedUser.password)).to.be.ok;
    }
  },
  generatingAccessToken: {
    name: '/signup should send an access_token as jwt',
    test: (server, chai, expect) => async () => {
      const res = await chai.request(server).post('/signup').send(validUser);

      expect(jwt.verify(res.body.access_token, config.JWT_SECRET)).to.be.ok;
    }
  }
};

module.exports = Test;
