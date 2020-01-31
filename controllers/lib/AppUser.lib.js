const AppUser = require('../../models/AppUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const privateKey = "6G#/FKE@93P!F.D?LlsFH/Vdf%sY74$ghR5fhj6FJ-dghCJfzog$!ri";
let db = require(`../../models/index`);

// GET ALL
exports.getAll = function (req, res) {
  // Exemple :
  // /app_users?param_name=test
  // req.query.param_name pour recupérer la valeur du QueryParam (ici: test)
  // TODO : check les values recu dans req.query
  db.AppUser.findAll({ where: req.query })
    .then(appUsers => {
      res.status(200);
      res.json(appUsers);
    }).catch(error => {
      res.status(400);
      res.json(error);
    });
};

exports.getOne = function (req, res) {
  db.AppUser.findOne({ where: { id: req.params.id } })
    .then(appUsers => {
      if (appUsers) {
        res.status(200);
        res.json(appUsers);
      } else {
        res.status(404);
        res.json({ "message": "Resource not found" })
      }
    }).catch(error => {
      res.status(400);
      res.json(error);
    });
};

exports.postAppUser = function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    db.AppUser.create({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      sexuality: req.body.sexuality,
      avatar: req.body.avatar,
      username: req.body.username,
      minAge: req.body.minAge,
      maxAge: req.body.maxAge,
      length: req.body.length,
      description: req.body.description
    }).then(appUser => {
      res.status(201);
      res.json(appUser);
      res.end();
    }).catch(error => {
      res.status(400);
      res.json(error);
    });
  });
};

// TODO: doit retourner l'objet mis à jour.
exports.patchAppUser = function (req, res) {
  body = req.body;
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      body.password = hash;
      db.AppUser.update(body, { where: { id: req.params.id }, returning: true })
        .then(appUser => {
          res.status(200);
          res.json(appUser[1][0]);
        }).catch(error => {
          res.status(500);
          res.json(error);
        });
    });
  } else {
    db.AppUser.update(body, { where: { id: req.params.id } })
      .then(appUser => {
        res.status(200);
        res.json(appUser);
      }).catch(error => {
        res.status(500);
        res.json(error);
      });
  }
};

exports.deleteAppUser = function (req, res) {
  db.AppUser.destroy({ where: { id: req.params.id } }).then(appUsers => {
    // here 204 no content we only send back the status code
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postLogin = function (req, res) {
  db.AppUser.findOne({ where: { email: req.body.email } })
    .then(appUser => {
      if (!appUser) {
        res.status(400);
        res.json({ 'message ': 'error while login' });
        res.end();
      }
      bcrypt.compare(req.body.password, appUser.password, function (err, result) {
        if (result) {
          jwt.sign({ appUser }, privateKey, { algorithm: 'HS512', expiresIn: '24h' }, (err, token) => {
            if (err) {
              console.log(err);
            }
            res.json({ 'token': token });
          });
        } else {
          res.status(400);
          res.json({ 'message': 'error while login' });
          res.end();
        }
      });
    });
};
