const TypePreferenceLib = require('../lib/TypePreference.lib');

module.exports = function (app) {
    // GET /typePreferences
    app.get('/typePreferences', TypePreferenceLib.getAll)

    // GET /typePreferences/:id
    app.get('/typePreferences/:id', TypePreferenceLib.getOne)

    // POST /typePreferences
    app.post('/typePreferences', TypePreferenceLib.postTypePreference)

    // PATCH /typePreferences/:id
    app.patch('/typePreferences/:id', TypePreferenceLib.patchTypePreference)

    // DELETE /typePreferences/:id
    app.delete('/typePreferences/:id', TypePreferenceLib.deleteTypePreference)
}