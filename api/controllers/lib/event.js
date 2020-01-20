const { mongoose }  = require('../../db/mongoose');
const { Event }     = require('../../models/eventModel');

// GET ALL
exports.getEvents = function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      res.send(err);
    }
    res.json(events);
  });
};

// GET ONE 
exports.getEvent = function(req, res) {
  Event.findById(req.params.eventId, function(err, event) {
    if (err) {
      res.send(err);
    }
    res.json(event);
  });
};

// POST
exports.postEvent = function(req, res) {
  var event = new Event(req.body);
  event.save(function(err, event) {
    if (err) {
      res.send(err);
    }
    res.json(event);
  });
};

// PATCH
exports.patchEvent = function(req, res) {
  Event.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, function(err, event) {
    if (err) {
      res.send(err);
    }
    res.json(event);
  });
};

// Delete
exports.deleteEvent = function(req, res) {
  Event.remove({ _id: req.params.eventId }, function(err, event) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Event successfully deleted' });
  });
};
