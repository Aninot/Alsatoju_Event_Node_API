const GameLib = require('../lib/Game.lib');

module.exports = function (app) {
    // GET /app_users
    app.get('/games', GameLib.getAll)

    // GET /app_users/:id
    app.get('/games/:id', GameLib.getOne)

    // POST /app_users
    app.post('/games', GameLib.postGame)

    // PATCH /app_users/:id
    app.patch('/games/:id', GameLib.patchGame)

    // DELETE /app_users/:id
    app.delete('/games/:id', GameLib.deleteGame)
}