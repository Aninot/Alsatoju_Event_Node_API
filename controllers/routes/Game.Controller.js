const GameLib = require('../lib/Game.lib');

module.exports = function (app) {
    // GET /games
    app.get('/games', GameLib.getAll)

    // GET /games/:id
    app.get('/games/:id', GameLib.getOne)

    // POST /games
    app.post('/games', GameLib.postGame)

    // PATCH /games/:id
    app.patch('/games/:id', GameLib.patchGame)

    // DELETE /games/:id
    app.delete('/games/:id', GameLib.deleteGame)
}