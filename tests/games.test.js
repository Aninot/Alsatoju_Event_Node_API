const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Game } = require('../models/Game.model');


const game = {
                id : null,
                name : "TestGame1",
                url : "TestUrl1"
             };

describe('POST /games', () => {

  it('doit créer un nouveau game', (done) => {
    request(app)
      .post('/games')
      .send({name: game.name, url: game.url})
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe(game.name)
        expect(res.body.url).toBe(game.url)
        game.id = res.body.id
      })
      .end(done);
  })
});

describe('DELETE /games', () => {

  it('doit supprimer un game', (done) => {
    request(app)
      .delete('/games/' + game.id)
      .expect(204)
      .end(done);
  })
});
