const TypeGames = require('../../models/TypeGames.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let db = require(`../../models/index`);

const ForEach = require('../../services/ForEach.Service');

var isValid = function (prop) {
    switch (prop) {
        case "type":
        case "template":
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
    db.TypeGames.findAndCountAll({ where: filters ? filters : {} }).then(typeGames => {
        if (typeGames) {
            res.status(200);
            res.json(typeGames);
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
    db.TypeGames.findOne({ where: { id: req.params.id } }).then(typeGame => {
        if (typeGame) {
            res.status(200);
            res.json(typeGame);
        } else {
            res.status(404);
            res.json({ "message": "Resource not found" })
        }
    }).catch(error => {
        res.status(400);
        res.json(error);
    });
};

exports.postTypeGames = function (req, res) {
    db.TypeGames.create({
        type: req.body.type,
    }).then(typeGame => {
        res.status(201);
        res.json(typeGame);
        res.end();
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
};

exports.patchTypeGames = function (req, res) {
    db.TypeGames.update({ where: { type: req.params.type } }).then(typeGame => {
        res.status(200);
        res.json(typeGame);
    }).catch(error => {
        res.status(500);
        res.json(error);
    });
};

exports.deleteTypeGames = function (req, res) {
    db.TypeGames.destroy({ where: { id: req.params.id } }).then(typeGame => {
        // here 204 no content we only send back the status code
        res.status(204);
        res.end();
    }).catch(error => {
        res.status(400);
        res.json(error);
    });
};