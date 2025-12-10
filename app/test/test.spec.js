const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');


describe('GET /', () => {
it('responds with JSON containing hello message', async () => {
const res = await request('http://localhost:3000').get('/');
expect(res.status).to.equal(200);
expect(res.body).to.have.property('message');
});
});