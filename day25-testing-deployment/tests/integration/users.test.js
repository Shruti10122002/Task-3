const request = require('supertest');
const app = require('../../src/app');
const expect = require('chai').expect;

describe('Integration Tests - /api/users', () => {
  it('POST /api/users/register - should register user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Alice', email: 'alice@test.com' });
    expect(res.status).to.equal(201);
    expect(res.body.message).to.include('registered');
  });

  it('POST /api/users/login - correct credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@skillsphere.com', password: '123456' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('POST /api/users/login - wrong password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@skillsphere.com', password: 'wrong' });
    expect(res.status).to.equal(401);
  });
});