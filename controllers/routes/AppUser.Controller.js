const AppUserLib = require('../lib/AppUser.lib');

module.exports = function (app) {
    /**
     * @api {get} /app_users request all users informations
     * @apiName GetAppUsers
     * @apiGroup AppUser
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *      {
     *          "firstname": "John",
     *          "lastname": "Doe"
     *      },
     *      ...
     *     ]
     * 
     */
    app.get('/app_users', AppUserLib.getAll)

    /**
     * @api {get} /app_users/:id request one user informations
     * @apiName GetAppUser
     * @apiGroup AppUser
     * 
     * @apiParam {Number} id User's unique ID.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     * 
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
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