import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## client APIs', () => {


  let client = {
    name: 'KK123',
    lastName: 'KK123',
    rg: 'KK123',
    cpf: 'KK123',
    maritalStatus: 'KK123',
    sex: 'KK123',
    address: 'KK123',
    city: 'KK123',
    state: 'KK123',
    phone: 'KK123',
    facebook: 'KK123',
    email: 'KK123',
    birthday: 'KK123',
    info: 'KK123'
  };

  describe('# POST /api/clients', () => {
    it('should create a new client', (done) => {
      request(app)
        .post('/api/clients')
        .send(client)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(client.name);
          expect(res.body.lastName).to.equal(client.lastName);
          expect(res.body.rg).to.equal(client.rg);
          expect(res.body.cpf).to.equal(client.cpf);
          expect(res.body.maritalStatus).to.equal(client.maritalStatus);
          expect(res.body.sex).to.equal(client.sex);
          expect(res.body.address).to.equal(client.address);
          expect(res.body.city).to.equal(client.city);
          expect(res.body.state).to.equal(client.state);
          expect(res.body.phone).to.equal(client.phone);
          expect(res.body.facebook).to.equal(client.facebook);
          expect(res.body.email).to.equal(client.email);
          expect(res.body.birthday).to.equal(client.birthday);
          expect(res.body.info).to.equal(client.info);
          client = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/clients/:clientId', () => {
    it('should get client details', (done) => {
      request(app)
        .get(`/api/clients/${client._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(client.name);
          expect(res.body.lastName).to.equal(client.lastName);
          expect(res.body.rg).to.equal(client.rg);
          expect(res.body.cpf).to.equal(client.cpf);
          expect(res.body.maritalStatus).to.equal(client.maritalStatus);
          expect(res.body.sex).to.equal(client.sex);
          expect(res.body.address).to.equal(client.address);
          expect(res.body.city).to.equal(client.city);
          expect(res.body.state).to.equal(client.state);
          expect(res.body.phone).to.equal(client.phone);
          expect(res.body.facebook).to.equal(client.facebook);
          expect(res.body.email).to.equal(client.email);
          expect(res.body.birthday).to.equal(client.birthday);
          expect(res.body.info).to.equal(client.info);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when client does not exists', (done) => {
      request(app)
        .get('/api/clients/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/clients/:clientId', () => {
    it('should update client details', (done) => {
      client.clientname = 'KK';
      request(app)
        .put(`/api/clients/${client._id}`)
        .send(client)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK123');
          expect(res.body.lastName).to.equal(client.lastName);
          expect(res.body.rg).to.equal(client.rg);
          expect(res.body.cpf).to.equal(client.cpf);
          expect(res.body.maritalStatus).to.equal(client.maritalStatus);
          expect(res.body.sex).to.equal(client.sex);
          expect(res.body.address).to.equal(client.address);
          expect(res.body.city).to.equal(client.city);
          expect(res.body.state).to.equal(client.state);
          expect(res.body.phone).to.equal(client.phone);
          expect(res.body.facebook).to.equal(client.facebook);
          expect(res.body.email).to.equal(client.email);
          expect(res.body.birthday).to.equal(client.birthday);
          expect(res.body.info).to.equal(client.info);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/clients/', () => {
    it('should get all clients', (done) => {
      request(app)
        .get('/api/clients')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/clients/', () => {
    it('should delete client', (done) => {
      request(app)
        .delete(`/api/clients/${client._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK123');
          expect(res.body.lastName).to.equal(client.lastName);
          expect(res.body.rg).to.equal(client.rg);
          expect(res.body.cpf).to.equal(client.cpf);
          expect(res.body.maritalStatus).to.equal(client.maritalStatus);
          expect(res.body.sex).to.equal(client.sex);
          expect(res.body.address).to.equal(client.address);
          expect(res.body.city).to.equal(client.city);
          expect(res.body.state).to.equal(client.state);
          expect(res.body.phone).to.equal(client.phone);
          expect(res.body.facebook).to.equal(client.facebook);
          expect(res.body.email).to.equal(client.email);
          expect(res.body.birthday).to.equal(client.birthday);
          expect(res.body.info).to.equal(client.info);
          done();
        })
        .catch(done);
    });
  });
});
