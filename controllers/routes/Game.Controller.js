const GameLib = require('../lib/Game.lib');

module.exports = function (app) {
    /**
     * @api {get} /games request all games informations
     * @apiName GetGames
     * @apiGroup Game
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *      {
     *          "key": "value",
     *          "otherKey": "otherValue"
     *      },
     *      ...
     *     ]
     * 
     */
    app.get('/games', GameLib.getAll)

    /**
     * @api {get} /games/:id request one user informations
     * @apiName GetGame
     * @apiGroup Game
     * 
     * @apiParam {Number} id game's unique ID.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "key": "value",
     *       "otherKey": "otherValue"
     *     }
     * 
     * @apiError GameNotFound The id of the Game was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "GameNotFound"
     *     }
     */
    app.get('/games/:id', GameLib.getOne)

    // POST /games
    app.post('/games', GameLib.postGame)

    // PATCH /games/:id
    app.patch('/games/:id', GameLib.patchGame)

    // DELETE /games/:id
    app.delete('/games/:id', GameLib.deleteGame)
}