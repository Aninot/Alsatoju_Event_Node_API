const AppUser   = require('../../models/AppUser.model');
const jwt       = require('jsonwebtoken');
const fs        = require('fs');
const bcrypt    = require('bcrypt');
let db          = require(`../../models/index`);

// GET ALL
exports.getAll = function (req, res) {
    db.app_user.findAll({}).then(appUsers => {
            res.status(200);
            res.json(appUsers);
        }).catch(error => {
            res.status(400);
            res.json(error);
        });
};

exports.getOne = function (req, res) {

};

exports.postAppUser = function (req, res) {

};

exports.patchAppUser = function (req, res) {
};

exports.deleteAppUser = function (req, res) {

};

exports.postLogin = function (req, res) {

};
