const LikeLib = require('../lib/Like.lib')

module.exports = function (app) {
  // GET /likes
  app.get('/likes', LikeLib.getAll)

  // GET /likes/:id
  app.get('/likes/:id', LikeLib.getOne)

  // POST /likes
  app.post('/likes', LikeLib.postLike)

  // PATCH /likes/:id
  app.patch('/likes', LikeLib.patchLike)

  // DELETE /likes/:id
  app.delete('/likes/:id', LikeLib.deleteLike)
}
