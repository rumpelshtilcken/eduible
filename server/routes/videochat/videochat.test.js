/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

import videochatRouter from './index';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Vidyo token generation functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    server = express();
    server.use(bodyParser.json());
    server.use(videochatRouter);
  });

  it('should generate token', async () => {
    const res = await chai
      .request(server)
      .post('/')
      .send({ userName: 'John Smith', expiresInSeconds: 10000 });

    return expect(res.body.vidyoToken).to.not.equal(undefined);
  });

  it('should return You should pass username and expiresInSeconds ', async () => {
    try {
      await chai.request(server).post('/').send();
    } catch (error) {
      expect(error.status).to.equal(401);
      return expect(error.response.body.message).to.equal(
        'You should pass username and expiresInSeconds'
      );
    }

    expect(false).to.be.ok;
  });
});
