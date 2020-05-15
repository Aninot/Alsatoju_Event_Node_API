const TypeGameLib = require('../lib/TypeGame.lib')

module.exports = function (app) {
  // GET /TypeGame
  app.get('/type_games', TypeGameLib.getAll)

  // GET /TypeGame/:id
  app.get('/type_games/:id', TypeGameLib.getOne)

  // POST /TypeGame
  app.post('/type_games', TypeGameLib.postTypeGame)

  // PATCH /TypeGame/:id
  app.patch('/type_games/:id', TypeGameLib.patchTypeGame)

  // DELETE /TypeGame/:id
  app.delete('/type_games/:id', TypeGameLib.deleteTypeGame)
}
