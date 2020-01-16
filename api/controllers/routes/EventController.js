const Event = require('./../lib/event');

module.exports = function (app) {

    // GET /events
    app.get('/events', Event.getEvents)

    // GET /events/id
    app.get('/events/:id', Event.getEvent)

    // POST /events
    app.post('/events', Event.postEvent)

    // PATCH /events/id
    app.patch('/events/:id', Event.patchEvent)

    // DELETE /events/id
    app.delete('/events/:id', Event.deleteEvent)
}