import supertest from 'supertest';
import {assert} from 'chai';
import {recipe} from '../routes';

const app = recipe.router;

describe('GET /api/recipes', () => {


it('should return status code 200', (done) => {
    request(app)
    .get('/api/recipes')
    .expect('content-Type', /json/)  
    .expect(200)
    .expect((res) => {
        assert.equal(typeof(res.body), typeof{});
    })
    .end(done);
    
})
})


