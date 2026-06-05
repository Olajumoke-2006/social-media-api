const request = require('supertest');
const app = require('../app');

let token;
let postId;

describe('Posts', () => {

  beforeEach(async () => {

    await request(app)
      .post('/api/auth/register')
      .send({
        first_name: 'Jane',
        last_name: 'Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        password: 'password123'
      });

    const login = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane@example.com',
        password: 'password123'
      });

    token = login.body.token;

  });

  it('should create draft post', async () => {

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My First Post',
        content: 'Hello World',
        tags: ['intro']
      });

    postId = res.body.post._id;

    expect(res.statusCode).toBe(201);
    expect(res.body.post.state).toBe('draft');

  });

  it('should publish post', async () => {

    const create = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Draft',
        content: 'Content'
      });

    const id = create.body.post._id;

    const res = await request(app)
      .patch(`/api/posts/${id}/publish`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.post.state).toBe('published');

  });

  it('should fetch published posts', async () => {

    const create = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Published Post',
        content: 'Content'
      });

    await request(app)
      .patch(`/api/posts/${create.body.post._id}/publish`)
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .get('/api/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.posts)).toBe(true);

  });

});