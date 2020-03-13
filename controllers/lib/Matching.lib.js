const Matching = require('../../models/Matching.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
  switch (prop) {
    case "user_one":
        return "UserOneId";
    case "user_two":
        return "UserTwoId";
    case "response_user_one":
        return "responseUserOne";
    case "response_user_two":
        return "responseUserTwo";
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
  db.Matching.findAll({ 
    where: filters ? filters : {},
    include : [{
      model: db.AppUser,
      as: 'UserOne'
    },
    {
      model: db.AppUser,
      as: 'UserTwo'
    }]
  }).then(Matchings => {
    if (Matchings) {
      res.status(200);
      res.json(Matchings);
    } else {
      res.status(404);
      res.json({ "message": "No resources founded" })
    }
  }).catch(error => {
    console.log(error);
    res.status(400);
    res.json(error);
  });
};

exports.getMyMatchs = function (req, res) {
  console.log(req.params)
  db.Matching.findAll({ 
    where:
      Sequelize.or(
        { UserOneId: req.params.id }, 
        { UserTwoId: req.params.id }
      ),
    include : [{
      model: db.AppUser,
      as: 'UserOne'
    },
    {
      model: db.AppUser,
      as: 'UserTwo'
    }]
  }).then(matchings => {
    if (matchings) {
      res.status(200);
      res.json(matchings);
    } else {
      res.status(404);
      res.json({ "message": "Resource not found" })
    }
  }).catch(error => {
    console.log(error);
    res.status(400);
    res.json(error);
  });
};

exports.postMatching = function (req, res) {
  db.Matching.create({
    name: req.body.name,
    url: req.body.url
  }).then(Matching => {
    res.status(201);
    res.json(Matching);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.patchMatching = function (req, res) {
  db.Matching.update({ where: { name: req.params.name } }).then(Matching => {
    res.status(200);
    res.json(Matching);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
};

exports.deleteMatching = function (req, res) {
  db.Matching.destroy({ where: { id: req.params.id } }).then(Matchings => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};