'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('/POST User Sign Up validation Test', function () {
  it('should return \'Password must be at least 5 characters!\'', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').type('form').send({
      name: 'oluwafemi',
      surname: 'adekunle',
      username: 'phemonick',
      email: 'phemy.smith@gmai.com',
      password: 'come'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'Password must be at least 5 characters'
        }
      });
      done();
    });
  });

  it('should return \'input valid name\' for null name', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      username: 'kayode',
      email: 'eranius@gmail.com',
      password: 'phemy123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid name'
        }
      });
      done();
    });
  });

  it('should return \'input valid name\' for null name', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: ' ',
      username: 'kayode',
      email: 'eranius@gmail.com',
      password: 'phemy123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid name'
        }
      });
      done();
    });
  });

  it('should return \'input valid username\' for single username', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: 'phemy',
      surname: 'adewale',
      email: 'phemo@gmail.com',
      password: 'phemy123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid username'
        }
      });
      done();
    });
  });

  it('should return \'input valid username\' for null Username', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: 'olaolu',
      surname: 'oluwawee',
      email: 'weare@gmail.com',
      password: 'phemy123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid username'
        }
      });
      done();
    });
  });

  it('should return \'Error Creating user\' for null email', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: 'phemmy',
      surname: 'olawabukkr',
      username: 'Henry',
      password: 'henry123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid email'
        }
      });
      done();
    });
  });

  it('should return \'Error Creating user\' for invalid email', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: 'olaolu',
      email: 'ola@b',
      surname: 'olabukoimcmn',
      username: 'olabobo',
      password: 'ola123'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'input valid email'
        }
      });
      done();
    });
  });

  it('should return \'Error Creating user\' for invalid password', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').set('Accept', 'application/json').send({
      name: 'kayoler',
      surname: 'olartvdch',
      email: 'kayoler@gmail.com',
      username: 'kayorrr',
      password: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body).deep.equal({
        message: {
          message: 'Password must be at least 5 characters'
        }
      });
      done();
    });
  });
});