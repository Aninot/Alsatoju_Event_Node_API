const AppUserLib = require('../lib/AppUser.lib');

module.exports = function (app) {
    // GET /app_users
    app.get('/app_users', AppUserLib.getAll)

    // GET /app_users/:id
    app.get('/app_users/:id', AppUserLib.getOne)

    // POST /app_users
    app.post('/app_users', AppUserLib.postAppUser)

    // PATCH /app_users/:id
    app.patch('/app_users/:id', AppUserLib.patchAppUser)

    // DELETE /app_users/:id
    app.delete('/app_users/:id', AppUserLib.deleteAppUser)

    // POST /login
    app.post('/login', AppUserLib.postLogin)
}