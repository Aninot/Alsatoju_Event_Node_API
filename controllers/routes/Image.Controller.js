const ImageLib = require('../lib/Image.lib');
const JwtMiddleware = require('../../services/Authentification.Service');
const upload = require('../../config/multer.config');

module.exports = function (app) {
  app.get('/images', JwtMiddleware.isAuthenticated, ImageLib.getAll)
  app.get('/images/:id', JwtMiddleware.isAuthenticated, ImageLib.getOne)
  app.post('/images', JwtMiddleware.isAuthenticated, upload.single("image"), ImageLib.uploadFile)
}