import supertest from 'supertest';
import {recipe} from '../routes'

const app = recipe.router;

describe('GET /api/recipes', () => {


it('should return status code 200', (done) => {
    request(app)
    .get('/api/recipes')
    .expect('content-Type', /json/)
    .expect(200)
    .end(done);
    
})
})


