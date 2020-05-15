const PreferenceLib = require('../lib/Preference.lib')

module.exports = function (app) {
  // GET /preferences
  app.get('/preferences', PreferenceLib.getAll)

  // GET /preferences/:id
  app.get('/preferences/:id', PreferenceLib.getOne)

  // POST /preferences
  app.post('/preferences', PreferenceLib.postPreference)

  // PATCH /preferences/:id
  app.patch('/preferences/:id', PreferenceLib.patchPreference)

  // DELETE /preferences/:id
  app.delete('/preferences/:id', PreferenceLib.deletePreference)
}
