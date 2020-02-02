const Like = require('../../models/Like.model');
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
  filters = getQueryParam(req.query)
  db.Like.findAndCountAll({ where: filters ? filters : {} }).then(Likes => {
    if (Likes) {
      res.status(200);
      res.json(Likes);
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
  db.Like.findOne({ where: { id: req.params.id } }).then(like => {
    if (like) {
      res.status(200);
      res.json(like);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postLike = function (req, res) {
  db.Like.create({
    userId: req.body.userId,
    filmPreference: req.body.filmPreference,
    musicPreference: req.body.musicPreference,
    otherPreference: req.body.otherPreference
  }).then(Like => {
    res.status(201);
    res.json(Like);
    res.end();
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.patchLike = function (req, res) {
  db.Like.update({ where: { id: req.params.id } }).then(Like => {
    res.status(200);
    res.json(Like);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.deleteLike = function (req, res) {
  db.Like.destroy({ where: { id: req.params.id } }).then(Likes => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};