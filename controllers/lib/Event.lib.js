const Event = require('../../models/Event.model');
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
  switch (prop) {
    case "base_url":
      return "baseUrl";
    case "name":
    case "address":
    case "description":
    case "price":
    case "img":
    case "tags":
    case "start":
    case "end":
    case "location":
      return prop;
    default:
      return false;
  }
}

function getQueryParam(filterArray) {
  let filters = {};
  ForEach.forEach(filterArray, function (value, prop, obj) {
    if (isValid(prop)) {
      filters[isValid(prop)] = value;
    }
  });
  return filters;
}

// GET ALL
exports.getEvents = function (req, res) {
  filters = getQueryParam(req.query)
  db.Event.findAndCountAll({ where: filters ? filters : {} }).then(Events => {
    if (Events) {
      res.status(200);
      res.json(Events);
    } else {
      res.status(404);
      res.json({ "message": "Resources not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

// GET ONE 
exports.getEvent = function (req, res) {
  db.Event.findOne({ where: { id: req.params.id } }).then(event => {
    if (event) {
      res.status(200);
      res.json(event);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

// POST
exports.postEvent = function (req, res) {
  db.Event.create({
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    baseUrl: req.body.baseUrl,
    tags: req.body.tags,
    start: req.body.start,
    end: req.body.end,
    location: req.body.location
  }).then(event => {
    res.status(201);
    res.json(event);
    res.end();
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

// PATCH : TODO
exports.patchEvent = function (req, res) {

};

// Delete
exports.deleteEvent = function (req, res) {
  db.Event.destroy({ where: { id: req.params.id } }).then(event => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};