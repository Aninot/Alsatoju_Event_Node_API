const TypePreference = require('../../models/TypePreference.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
  switch (prop) {
    case "type":
      return prop;
    default:
      return false;
  }
}

function getQueryParam(filterArray) {
  let filters = {};
  ForEach(filterArray, function (value, prop, obj) {
    if (isValid(prop)) {
      filters[isValid(prop)] = value;
    }
  });
  return filters;
}

// GET ALL
exports.getAll = function (req, res) {
  filters = getQueryParam(req.query)
  db.TypePreference.findAndCountAll({ where: filters ? filters : {} }).then(TypePreferences => {
    if (TypePreferences) {
      res.status(200);
      res.json(TypePreferences);
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
  db.TypePreference.findOne({ where: { id: req.params.id } }).then(typePreference => {
    if (typePreference) {
      res.status(200);
      res.json(typePreference);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postTypePreference = function (req, res) {
  db.TypePreference.create({
    type: req.body.type,
  }).then(TypePreference => {
    res.status(201);
    res.json(TypePreference);
    res.end();
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.patchTypePreference = function (req, res) {
  db.TypePreference.update({ where: { type: req.params.type } }).then(TypePreference => {
    res.status(200);
    res.json(TypePreference);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.deleteTypePreference = function (req, res) {
  db.TypePreference.destroy({ where: { id: req.params.id } }).then(TypePreferences => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};