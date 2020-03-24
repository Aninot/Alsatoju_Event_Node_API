const TypeGamesLib = require('../lib/TypeGames.lib');

module.exports = function (app) {
    // GET /typePreferences
    app.get('/typeGames', TypeGamesLib.getAll)

    // GET /typePreferences/:id
    app.get('/typeGames/:id', TypeGamesLib.getOne)

    // POST /typePreferences
    app.post('/typeGames', TypeGamesLib.postTypePreference)

    // PATCH /typePreferences/:id
    app.patch('/typeGames/:id', TypeGamesLib.patchTypePreference)

    // DELETE /typePreferences/:id
    app.delete('/typeGames/:id', TypeGamesLib.deleteTypePreference)
}