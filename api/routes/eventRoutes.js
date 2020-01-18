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

    // Opération de scrapping événement
        app.route('/scrapper').get(function (req, res) {
            res.render('pages/scrapper-index');
        });
        app.route('/scrapper/launch').post(function (req, res) {
            var launchValues = {
                'start': req.body.start_date,
                'end': req.body.end_date
            };
            scrapper(launchValues);
            res.render('pages/scrapper-status', { launchValues: launchValues });
        });
};