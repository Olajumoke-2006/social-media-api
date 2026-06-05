const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

let token;
let secondUserId;

describe('Follow System', () => {

  beforeEach(async () => {

    await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'User',
        last_name: 'One',
        username: 'userone',
        email: 'user1@example.com',
        password: 'password123'
      });

    await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'User',
        last_name: 'Two',
        username: 'usertwo',
        email: 'user2@example.com',
        password: 'password123'
      });

    const login = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user1@example.com',
        password: 'password123'
      });

    token = login.body.token;

    const secondUser = await User.findOne({
      email: 'user2@example.com'
    });

    secondUserId = secondUser._id;

  });

  it('should follow another user', async () => {

    const res = await request(app)
      .post(`/api/follow/${secondUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);

  });

  it('should not follow same user twice', async () => {

    await request(app)
      .post(`/api/follow/${secondUserId}`)
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .post(`/api/follow/${secondUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);

  });

  it('should unfollow user', async () => {

    await request(app)
      .post(`/api/follow/${secondUserId}`)
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .delete(`/api/follow/${secondUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

  });

});