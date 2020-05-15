const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')

const games = [
  {
    id: null,
    name: 'TestGame1',
    url: 'TestUrl1'
  },
  {
    id: null,
    name: 'TestGame2',
    url: 'TestUrl2'
  }
]

describe('POST /games', () => {
  it('doit créer un nouveau game', (done) => {
    request(app)
      .post('/games')
      .send({ name: games[0].name, url: games[0].url })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe(games[0].name)
        expect(res.body.url).toBe(games[0].url)
        games[0].id = res.body.id
      })
      .end(done)
  })

  it('doit créer un 2eme game', (done) => {
    request(app)
      .post('/games')
      .send({ name: games[1].name, url: games[1].url })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe(games[1].name)
        expect(res.body.url).toBe(games[1].url)
        games[1].id = res.body.id
      })
      .end(done)
  })
})

describe('GET /games', () => {
  it('doit aller chercher tout les games', (done) => {
    request(app)
      .get('/games')
      .expect(200)
      .end(done)
  })

  it('doit aller chercher le 1er game qui vient d\'être créé', (done) => {
    request(app)
      .get('/games/' + games[0].id)
      .expect(res => {
        expect(res.body.name).toBe(games[0].name)
        expect(res.body.url).toBe(games[0].url)
        expect(res.body.id).toBe(games[0].id)
      })
      .expect(200)
      .end(done)
  })
})

describe('GET /games', () => {

})

describe('DELETE /games', () => {
  it('doit supprimer le 1er game', (done) => {
    request(app)
      .delete('/games/' + games[0].id)
      .expect(204)
      .end(done)
  })

  it('doit supprimer le 2eme game', (done) => {
    request(app)
      .delete('/games/' + games[1].id)
      .expect(204)
      .end(done)
  })
})

describe('GET /games/:id', () => {
  it('Essaye d\'aller chercher le game qu\'on viens de supprimer', (done) => {
    request(app)
      .get('/games/' + games[0].id)
      .expect(res => {
        expect(res.body.message).toBe('Resource not found')
      })
      .expect(404)
      .end(done)
  })
})
