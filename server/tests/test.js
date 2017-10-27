import request from 'supertest';
import { assert } from 'chai';
import app from '../../index';

describe('GET /api/recipes', () => {
  it('should return status code 200', (done) => {
    request(app)
      .get('/api/v1/recipes')
      .expect('content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.log(res);
         assert.equal(typeof(res.body), typeof{});
        done();
      });
  });
  it('should return status code 201', (done) => {
    request(app)
    .get('/api/v1/recipes/vote')
    .expect(201)
    .end((err,res) => {
      done();
    })
  })

  it('should return status code 201', (done) => {
    request(app)
    .get('/api/v1/recipes/vote')
    .expect(201)
    .end((err,res) => {
      done();
    })
  })

});
