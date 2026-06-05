const request = require('supertest');
const app = require('../app');

describe('Authentication', () => {

  describe('POST /api/auth/register', () => {

    it('should register a user', async () => {

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          email: 'john@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);

    });

  });

  describe('POST /api/auth/login', () => {

    it('should login user', async () => {

      await request(app)
        .post('/api/auth/register')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          email: 'john@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();

    });

  });

});