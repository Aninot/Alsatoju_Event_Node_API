const DislikeLib = require('../lib/Dislike.lib');

module.exports = function (app) {
    // GET /dislikes
    app.get('/dislikes', DislikeLib.getAll)

    // GET /dislikes/:id
    app.get('/dislikes/:id', DislikeLib.getOne)

    // POST /dislikes
    app.post('/dislikes', DislikeLib.postDislike)

    // PATCH /dislikes/:id
    app.patch('/dislikes/:id', DislikeLib.patchDislike)

    // DELETE /dislikes/:id
    app.delete('/dislikes/:id', DislikeLib.deleteDislike)
}