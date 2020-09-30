const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');
const { getAgent } = require('../data/data-helpers');
const Gram = require('../lib/models/gram');

describe('user routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signup a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: '1234',
        profilePhotoUrl: 'a.jpeg'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'email@email.com',
      profile_photo_url: 'a.jpeg'
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      email: '1234@123.com',
      password: '123',
      profilePhotoUrl: 'a.jpeg'
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '1234@123.com',
        password: '123',
        profilePhotoUrl: 'a.jpeg'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: '1234@123.com',
      profile_photo_url: 'a.jpeg'
    });
  });

  it('verifies a user via GET', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: '1234@123.com',
        password: '1234',
        profilePhotoUrl: 'a.jpeg'
      });

    const response = await agent
      .get('/api/v1/auth/verify');
        
    expect(response.body).toEqual({
      id: expect.any(String),
      email: '1234@123.com'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
describe('gram routes', () => {

  it('creates a new post via POST', async() => {
    const response = await getAgent()
      .post('/api/v1/grams')
      .send({
        user_id: 1,
        photoUrl: 'a.jpeg',
        caption: 'whoa!',
        tags: ['yo', 'wow']
      });

    expect(response.body).toEqual({
      id: "501",
      userId: 5,
      photoUrl: 'a.jpeg',
      caption: 'whoa!',
      tags: ['yo', 'wow']
    });
  });

  it('finds all grams', async() => {

    const response = await request(app)
      .get('/api/v1/grams/');

    expect(response.body).toContainEqual({
      id: expect.any(String),
      userId: expect.any(Number),
      photoUrl: expect.any(String),
      caption: expect.any(String),
      tags: expect.any(Array)
    })
  })

});
