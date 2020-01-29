const Game   = require('../../models/Game.model');
const jwt       = require('jsonwebtoken');
const fs        = require('fs');
const bcrypt    = require('bcrypt');
let db          = require(`../../models/index`);

// GET ALL
exports.getAll = function (req, res) {
    db.Game.findAll({}).then(Games => {
            res.status(200);
            res.json(Games);
        }).catch(error => {
            res.status(400);
            res.json(error);
        });
};

exports.getOne = function (req, res) {
    db.Game.findOne({id: req.params.id}).then(Games => {
            res.status(200);
            res.json(Games);
    }).catch(error => {
            res.status(400);
            res.json(error);
    });
};

exports.postGame = function (req, res) {

};

exports.patchGame = function (req, res) {
};

exports.deleteGame = function (req, res) {

};