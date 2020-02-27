const MatchingLib = require('../lib/Matching.lib');

module.exports = function (app) {
    // GET /matchings
    app.get('/matchings', MatchingLib.getAll)

    // GET /matchings/:id
    app.get('/matchings/:id', MatchingLib.getMyMatchs)

    // POST /matchings
    app.post('/matchings', MatchingLib.postMatching)

    // PATCH /matchings/:id
    app.patch('/matchings/:id', MatchingLib.patchMatching)

    // DELETE /matchings/:id
    app.delete('/matchings/:id', MatchingLib.deleteMatching)
}