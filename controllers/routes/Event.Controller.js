const EventLib = require('../lib/Event.lib');
const JwtMiddleware = require('../../services/Authentification.Service');

module.exports = function (app) {
    // GET /events
    app.get('/events', JwtMiddleware.isAuthenticated, EventLib.getEvents)

    // GET /events/id
    app.get('/events/:id', JwtMiddleware.isAuthenticated, EventLib.getEvent)

    // POST /events
    app.post('/events', JwtMiddleware.isAuthenticated, EventLib.postEvent)

    // PATCH /events/id
    app.patch('/events/:id', JwtMiddleware.isAuthenticated, EventLib.patchEvent)

    // DELETE /events/id
    app.delete('/events/:id', JwtMiddleware.isAuthenticated, EventLib.deleteEvent)
}