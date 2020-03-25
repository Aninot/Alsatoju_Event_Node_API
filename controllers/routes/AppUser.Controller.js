const AppUserLib = require('../lib/AppUser.lib');

module.exports = function (app) {
    
    app.get('/app_users', AppUserLib.getAll)
    
    app.get('/app_users/:id', AppUserLib.getOne)
    
    app.post('/app_users', AppUserLib.postAppUser)
    
    app.patch('/app_users/:id', AppUserLib.patchAppUser)
    
    app.delete('/app_users/:id', AppUserLib.deleteAppUser)
    
    app.post('/login', AppUserLib.postLogin)
}