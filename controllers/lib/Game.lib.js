const Game = require('../../models/Game.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
  switch (prop) {
    case "user_id":
      return "userId";
    case "name":
    case "url":
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
  db.Game.findAndCountAll({ where: filters ? filters : {} }).then(Games => {
    if (Games) {
      res.status(200);
      res.json(Games);
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
  db.Game.findOne({ where: { id: req.params.id } }).then(game => {
    if (game) {
      res.status(200);
      res.json(game);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postGame = function (req, res) {
  db.Game.create({
    name: req.body.name,
    url: req.body.url
  }).then(Game => {
    res.status(201);
    res.json(Game);
    res.end();
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.patchGame = function (req, res) {
  db.Game.update({ where: { name: req.params.name } }).then(Game => {
    res.status(200);
    res.json(Game);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.deleteGame = function (req, res) {
  db.Game.destroy({ where: { id: req.params.id } }).then(Games => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};