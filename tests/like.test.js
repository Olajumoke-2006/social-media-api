const request = require('supertest');
const app = require('../app');

let token;
let postId;

describe('Like System', () => {

  beforeEach(async () => {

    await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'Like',
        last_name: 'Tester',
        username: 'liketester',
        email: 'like@example.com',
        password: 'password123'
      });

    const login = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'like@example.com',
        password: 'password123'
      });

    token = login.body.token;

    const post = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Like Post',
        content: 'Testing likes'
      });

    postId = post.body.post._id;

    await request(app)
      .patch(`/api/posts/${postId}/publish`)
      .set('Authorization', `Bearer ${token}`);

  });

  it('should like a post', async () => {

    const res = await request(app)
      .post(`/api/likes/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

  });

  it('should prevent duplicate likes', async () => {

    await request(app)
      .post(`/api/likes/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .post(`/api/likes/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);

  });

  it('should unlike a post', async () => {

    await request(app)
      .post(`/api/likes/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .delete(`/api/likes/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

  });

});