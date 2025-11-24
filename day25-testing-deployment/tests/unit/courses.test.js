const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../src/app');

describe('Unit Tests - /api/courses', () => {
  it('GET /api/courses - should return all courses', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.be.at.least(2);
  });

  it('GET /api/courses/1 - should return single course', async () => {
    const res = await request(app).get('/api/courses/1');
    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal('Node.js Mastery');
  });

  it('POST /api/courses - should create a course', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Vue.js', instructor: 'Mike' });
    expect(res.status).to.equal(201);
    expect(res.body.data.title).to.equal('Vue.js');
  });
});