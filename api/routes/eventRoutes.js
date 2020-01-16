'use strict';
module.exports = function(app) {
  var event = require('../controllers/eventController');

  // Global Routes for all events
  app.route('/events')
    .get(event.list_all_events)
    .post(event.create_event);

  // Get Event by his Tags
  //app.route('/events/:eventTags')
    //  .get(event.get_event_by_tag);
  // Precise Routes for one event
  app.route('/events/:eventId')
    .get(event.read_event)
    .put(event.update_event)
    .delete(event.delete_event);
};