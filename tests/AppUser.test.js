const expect = require('expect');
const request = require('supertest');
const app = require('./../server');
const AppUser = require('../models/AppUser.model')

describe('POST /app_users', () => {
    it('doit créer un nouveau App User', (done) => {
        request(app)
            .post('/app_users')
            .send({ email: 'testUnitaire@mail.com', password: 'password'})
            .expect(201)
            .expect(res => {
                expect(res.body.email).toBe('testUnitaire@mail.com')
                expect(res.body.password).toBe('password')
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

})
