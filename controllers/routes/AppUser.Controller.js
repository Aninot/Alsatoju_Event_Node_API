const AppUserLib = require('../lib/AppUser.lib')
const JwtMiddleware = require('../../services/Authentification.Service')

module.exports = function (app) {
  app.get('/app_users', JwtMiddleware.isAuthenticated, AppUserLib.getAll)

  app.get('/app_users/myProfile', JwtMiddleware.isAuthenticated, AppUserLib.getMyProfile)

  app.get('/app_users/:id', JwtMiddleware.isAuthenticated, AppUserLib.getOne)

  app.post('/app_users', AppUserLib.postAppUser)

  app.patch('/app_users/:id', JwtMiddleware.isAuthenticated, AppUserLib.patchAppUser)

  app.delete('/app_users/:id', JwtMiddleware.isAuthenticated, AppUserLib.deleteAppUser)

  app.post('/login', AppUserLib.postLogin)

  app.get('/reset_password', AppUserLib.resetPassword)

  app.patch('/reset_password', AppUserLib.patchPassword)
}
