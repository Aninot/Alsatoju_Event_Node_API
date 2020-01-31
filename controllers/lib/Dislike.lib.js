const Dislike = require('../../models/Dislike.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let db = require(`../../models/index`);

// GET ALL
exports.getAll = function (req, res) {
  db.Dislike.findAndCountAll({}).then(Dislikes => {
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