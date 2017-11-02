import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';

chai.use(chaiHttp);

let token,
  userId;

describe('/POST User Sign Up validation Test', () => {
  it('should return \'Password must be at least 5 characters!\'', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .type('form')
      .send({
        name: 'oluwafemi',
        surname: 'adekunle',
        username: 'phemonick',
        email: 'phemy.smith@gmai.com',
        password: 'come',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'Password must be at least 5 characters',
          },
        });
        done();
      });
  });

  it('should return \'input valid name\' for null name', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'kayode',
        email: 'eranius@gmail.com',
        password: 'phemy123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid name',
          },
        });
        done();
      });
  });

  it('should return \'input valid name\' for null name', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: ' ',
        username: 'kayode',
        email: 'eranius@gmail.com',
        password: 'phemy123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid name',
          },
        });
        done();
      });
  });


  it('should return \'input valid username\' for single username', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'phemy',
        surname: 'adewale',
        email: 'phemo@gmail.com',
        password: 'phemy123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid username',
          },
        });
        done();
      });
  });

  it('should return \'input valid username\' for null Username', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'olaolu',
        surname: 'oluwawee',
        email: 'weare@gmail.com',
        password: 'phemy123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid username',
          },
        });
        done();
      });
  });

  it('should return \'Error Creating user\' for null email', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'phemmy',
        surname: 'olawabukkr',
        username: 'Henry',
        password: 'henry123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid email',
          },
        });
        done();
      });
  });

  it('should return \'Error Creating user\' for invalid email', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'olaolu',
        email: 'ola@b',
        surname:'olabukoimcmn',
        username: 'olabobo',
        password: 'ola123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          message: {
            message: 'input valid email',
          },
        });
        done();
      });
  });

 

  it('should return \'Error Creating user\' for invalid password', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'kayoler',
        email: 'kayoler@gmail.com',
        username: 'kayorrr',
        password: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).deep.equal({
          success: false,
          message: 'Password must be at least 6 characters!',
        });
        done();
      });
  });
});

