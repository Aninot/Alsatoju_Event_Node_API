const AppUser = require('../../models/AppUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ForEach = require('../../services/ForEach.Service');
const privateKey = "6G_/FKE@93P!F.D?LlsFH/Vdf%sY74$ghR5fhj6FJ-dghCJfzog$!ri";
let db = require('../../models/index');

var isValid = function (prop) {
  switch (prop) {
    //AppUser
    case "first_name":
      return "firstName";
    case "last_name":
      return "lastName";
    case "age_targeted":
      return "ageTargeted";
    case "height_in_centimeter":
      return "heightInCentimeter";
    case "sexuality_pref":
      return "sexualityPref";
    case "position_range":
      return "positionRange";
    case "geo_loc_position":
      return "geoLocPosition";
    case "email":
    case "username":
    case "gender":
    case "avatar":
    case "description":
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
  db.AppUser.findAll({
      where: filters ? filters : {}
    })
    .then(appUsers => {
      res.status(200);
      res.json(appUsers);
    }).catch(error => {
      res.status(400);
      res.json(error);
    });
};

exports.getOne = function (req, res) {
  db.AppUser.findOne({
    where: {
      id: req.params.id
    }
  }).then(appUsers => {
    if (appUsers) {
      res.status(200);
      res.json(appUsers);
    } else {
      res.status(404);
      res.json({
        "message": "Resource not found"
      })
    }
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postAppUser = function (req, res) {
  let body = req.body;
  // On check que le mail ait le bon format
  if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(body.email)) {
    // Si c'est pas le cas on rentre ici
    res.status(400);
    res.json({
      'message': 'Invalid email format'
    });
    // Pour arreter la lecture du code on s'arrete avec un return void
    return;
  }
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    db.AppUser.create(req.body).then(appUser => {
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
  if (body.email) {
    // On check que le mail ait le bon format
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(body.email)) {
      // Si c'est pas le cas on rentre ici
      res.status(400);
      res.json({
        'message': 'Invalid email format'
      });
      // Pour arreter la lecture du code on s'arrete avec un return void
      return;
    }
  }
  if (body.password) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      body.password = hash;
      db.AppUser.update(body, {
          where: {
            id: req.params.id
          },
          returning: true
        })
        .then(appUser => {
          res.status(200);
          res.json(appUser[1][0]);
        }).catch(error => {
          res.status(500);
          res.json(error);
        });
    });
  } else {
    db.AppUser.update(body, {
        where: {
          id: req.params.id
        }
      })
      .then(appUser => {
        res.status(200);
        res.json(appUser);
      }).catch(error => {
        res.status(500);
        res.json(error);
      });
  }
};

// here we only send back the status code
// 204 no content
exports.deleteAppUser = function (req, res) {
  db.AppUser.destroy({
    where: {
      id: req.params.id
    }
  }).then(appUsers => {
    res.status(204);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error);
  });
};

exports.postLogin = function (req, res) {
  let email = req.body.email;
  // On check que le mail ait le bon format
  if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
    // Si c'est pas le cas on rentre ici
    res.status(400);
    res.json({
      'message': 'Invalid email format'
    });
    // Pour arreter la lecture du code on s'arrete avec un return void
    return;
  }
  db.AppUser.findOne({
    where: {
      email: email
    }
  }).then(appUser => {
    if (!appUser) {
      res.status(400);
      res.json({
        'message': 'error while login'
      });
      res.end();
    }
    bcrypt.compare(req.body.password, appUser.password, function (err, result) {
      if (result) {
        jwt.sign({
          appUser
        }, privateKey, {
          algorithm: 'HS512',
          expiresIn: '24h'
        }, (err, token) => {
          if (err) {
            console.log(err);
          }
          res.json({
            'token': token
          });
        });
      } else {
        res.status(400);
        res.json({
          'message': 'error while login'
        });
        res.end();
      }
    });
  });
};