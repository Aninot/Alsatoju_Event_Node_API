const Preference   = require('../../models/Preference.model');
const jwt       = require('jsonwebtoken');
const fs        = require('fs');
const bcrypt    = require('bcrypt');
let db          = require(`../../models/index`);

// GET ALL
exports.getAll = function (req, res) {
    db.Preference.findAndCountAll({}).then(Preferences => {
        if(Preferences) {
            res.status(200);
            res.json(Preferences);
        } else {
            res.status(404);
            res.json({"message":"No resources founded"})
        }
        }).catch(error => {
            res.status(400);
            res.json(error);
        });
};

exports.getOne = function (req, res) {
    db.Preference.findOne({ where: {id: req.params.id} }).then(preference => {
        if(preference) {
            res.status(200);
            res.json(preference);
        } else {
            res.status(404);
            res.json({"message" : "Resource not found"})
        }
    }).catch(error => {
            res.status(400);
            res.json(error);
    });
};

exports.postPreference = function (req, res) {
    db.Preference.create({
          typeId: req.body.typeId,
          style: req.body.style
        }).then(Preference => {
          res.status(201);
          res.json(Preference);
          res.end();
        }).catch(error => {
          res.status(500);
          res.json(error);
        });
};

exports.patchPreference = function (req, res) {
    db.Preference.update({ where: { style: req.params.style } }).then(Preference => {
            res.status(200);
            res.json(Preference);
          }).catch(error => {
            res.status(500);
            res.json(error);
          });
};

exports.deletePreference = function (req, res) {
    db.Preference.destroy({ where: { id: req.params.id } }).then(Preferences => {
        // here 204 no content we only send back the status code
        res.status(204);
        res.end();
      }).catch(error => {
        res.status(400);
        res.json(error);
      });
};