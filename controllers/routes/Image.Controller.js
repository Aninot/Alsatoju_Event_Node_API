const ImageLib = require('../lib/Image.lib')
const JwtMiddleware = require('../../services/Authentification.Service')
const upload = require('../../config/multer.config')

module.exports = function (app) {
  app.get('/images', JwtMiddleware.isAuthenticated, ImageLib.getAll)

  app.get('/images/:id', JwtMiddleware.isAuthenticated, ImageLib.getOne)

  app.get('/my_profil_picture', JwtMiddleware.isAuthenticated, ImageLib.getMine)

  app.post('/images', JwtMiddleware.isAuthenticated, upload.single('image'), ImageLib.uploadFile)

  app.patch('/images/:id', JwtMiddleware.isAuthenticated, upload.single('image'), ImageLib.reUploadFile)

  app.delete('/images/:id', JwtMiddleware.isAuthenticated, ImageLib.delete)
}
