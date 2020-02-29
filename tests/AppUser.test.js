const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const AppUser = require('../models/AppUser.model')
const appUser = { id: null, password: null };

describe('POST /app_users', () => {
  it('doit créer un nouveau App User', (done) => {
    request(app)
      .post('/app_users')
      .send({ email: "testUnitaire@mail.com", password: "password" })
      .expect(201)
      .expect(res => {
        expect(res.body.email).toBe("testUnitaire@mail.com")
        expect(res.body.password).toBeDefined()
        appUser.password = res.body.password;
        appUser.id = res.body.id;
      })
      .end(done);
  });

  it('ne doit pas créer d\'AppUser sans la présence d\'un email', (done) => {
    request(app)
      .post('/app_users')
      .send({ password: 'password' })
      .expect(400)
      .end(done);
  });
});

describe('GET /app_users', () => {
  it('doit recevoir tous les AppUsers', (done) => {
    request(app)
      .get('/app_users')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
      .end(done);
  });

  it('doit retourner un App User', (done) => {
    request(app)
      .get('/app_users' + appUser.id)
      .expect(200)
      .expect(res => {
        expect(res.body.email).toBe("testUnitaire@mail.com");
        expect(res.body.password).toBe(appUser.password);
        expect(res.body.id).toBe(appUser.id);
      })
      .end(done);
  });
});

describe('DELETE /app_users/:id', () => {
  it('doit delete un AppUser', (done) => {
    request(app)
      .delete('/app_users')
      .expect(204)
      .end(done);
  });
});

describe('', () => {
  it('doit ajouter un user avec des préférence')
})
