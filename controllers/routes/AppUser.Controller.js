const AppUserLib = require('../lib/AppUser.lib');

module.exports = function (app) {
    /**
     * @api {get} /app_users request all users informations.
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
     * @api {get} /app_users/:id request one user informations.
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

    /**
     * @api {post} /app_users persist a new user in database.
     * @apiName PostAppUser
     * @apiGroup AppUser
     */
    app.post('/app_users', AppUserLib.postAppUser)

    /**
     * @api {patch} /app_users/:id update partially a user informations.
     * @apiName PatchAppUser
     * @apiGroup AppUser
     */
    app.patch('/app_users/:id', AppUserLib.patchAppUser)

    /**
     * @api {delete} /app_users/:id delete a user.
     * @apiName DeleteAppUser
     * @apiGroup AppUser
     */
    app.delete('/app_users/:id', AppUserLib.deleteAppUser)

    /**
     * @api {post} /login Allow a user to retrieve a token (valid for 24 hours).
     * @apiName PostLogin
     * @apiGroup Login
     */
    app.post('/login', AppUserLib.postLogin)
}