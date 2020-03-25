const TypePreferenceLib = require('../lib/TypePreference.lib');

module.exports = function (app) {
    // GET /type_preferences
    app.get('/type_preferences', TypePreferenceLib.getAll)

    // GET /type_preferences/:id
    app.get('/type_preferences/:id', TypePreferenceLib.getOne)

    // POST /type_preferences
    app.post('/type_preferences', TypePreferenceLib.postTypePreference)

    // PATCH /type_preferences/:id
    app.patch('/type_preferences/:id', TypePreferenceLib.patchTypePreference)

    // DELETE /type_preferences/:id
    app.delete('/type_preferences/:id', TypePreferenceLib.deleteTypePreference)
}