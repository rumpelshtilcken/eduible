/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import btoa from 'btoa';
import bodyParser from 'body-parser';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

import { mailingConfig } from 'config';

import acknowledgements from './index';

chai.use(chaiHttp);
const expect = chai.expect;

const key = btoa(mailingConfig.key);
const requestBody = {
  appointmentLength: '15 min',
  appointmentPrice: '5',
  appointmentDate: '23/5/1',
  message: 'Hi',
  professionalEmail: 'adilkhankenzhetaev@gmail.com',
  professionalName: 'Professional Name',
  studentName: 'Student Name'
};

describe('Mailing functionality', () => {
  let server;

  beforeEach(async () => {
    // cleanup database and setup a new server on each test
    server = express();
    server.use(bodyParser.json());
    server.use(acknowledgements);
  });

  it('Should return error: Key not provided', async () => {
    try {
      await chai
        .request(server)
        .post('/')
        .send(requestBody);
    } catch (error) {
      expect(error.status).to.equal(401);
      return expect(error.response.body.message).to.equal(
        'Key not provided'
      );
    }

    expect(false).to.be.ok;
  });

  it('Should return error: Wrong key', async () => {
    try {
      await chai
        .request(server)
        .post('/')
        .set('authorization', 'sss')
        .send(requestBody);
    } catch (error) {
      expect(error.status).to.equal(401);
      return expect(error.response.body.message).to.equal(
        'Wrong key'
      );
    }

    expect(false).to.be.ok;
  });

  it('Should return error: You should pass all fields', async () => {
    try {
      await chai
        .request(server)
        .post('/')
        .set('Authorization', key)
        .send();
    } catch (error) {
      expect(error.status).to.equal(401);
      return expect(error.response.body.message).to.equal(
        'You should pass all fields'
      );
    }

    expect(false).to.be.ok;
  });

  it('Should send email', async () => {
    const res = await chai
      .request(server)
      .post('/')
      .set('authorization', key)
      .send(requestBody);
    expect(res.status).to.equal(200);
  });
});
