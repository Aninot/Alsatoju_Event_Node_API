const Dislike = require('../../models/Dislike.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
  switch (prop) {
    case "user_id":
      return "userId";
    case "preference":
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
exports.getAll = function (req, res) {
  filters = getQueryParam(req.query);
  db.Dislike.findAndCountAll({ where: filters ? filters : {} }).then(Dislikes => {
    if (Dislikes) {
      res.status(200);
      res.json(Dislikes);
    } else {
      res.status(404);
      res.json({ "message": "No resources founded" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.getOne = function (req, res) {
  db.Dislike.findOne({ where: { id: req.params.id } }).then(dislike => {
    if (dislike) {
      res.status(200);
      res.json(dislike);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postDislike = function (req, res) {
  db.Dislike.create({
    userId: req.body.userId,
    filmPreference: req.body.filmPreference,
    musicPreference: req.body.musicPreference,
    otherPreference: req.body.otherPreference
  }).then(Dislike => {
    res.status(201);
    res.json(Dislike);
    res.end();
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.patchDislike = function (req, res) {
  db.Dislike.update({ where: { id: req.params.id } }).then(Dislike => {
    res.status(200);
    res.json(Dislike);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.deleteDislike = function (req, res) {
  db.Dislike.destroy({ where: { id: req.params.id } }).then(Dislikes => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};