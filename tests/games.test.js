const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { game } = require('../models/Game.model');


describe('POST /games', () => {

  it('doit créer un nouveau game', (done) => {
    request(app)
      .post('/games')
      .send({name:"Test game name", url: "Test game url"})
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe("Test game name")
        expect(res.body.url).toBe("Test game url")
      })
      .end(done);
  })
});