const TypeGamesLib = require('../lib/TypeGames.lib');

module.exports = function (app) {
    // GET /typeGames
    app.get('/typeGames', TypeGamesLib.getAll)

    // GET /typeGames/:id
    app.get('/typeGames/:id', TypeGamesLib.getOne)

    // POST /typeGames
    app.post('/typeGames', TypeGamesLib.postTypeGames)

    // PATCH /typeGames/:id
    app.patch('/typeGames/:id', TypeGamesLib.patchTypeGames)

    // DELETE /typeGames/:id
    app.delete('/typeGames/:id', TypeGamesLib.deleteTypeGames)
}