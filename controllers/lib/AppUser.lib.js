const AppUser = require('../../models/AppUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ForEach = require('../../services/ForEach.Service');
const dotenv = require('dotenv');
dotenv.config();
const privateKey = process.env.PRIVATE_KEY;
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
    case "number":
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
  limit = req.query.limit ? req.query.limit : null;
  sortBy = req.query.sort_by ? req.query.sort_by : 'id';
  sortOrder = req.query.sort_order ? req.query.sort_order : 'DESC';
  db.AppUser.findAll({
    where: filters ? filters : {},
    limit: limit,
    order: [
      [sortBy, sortOrder]
    ]
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
  db.AppUser.create(req.body).then(appUser => {
    res.status(201);
    res.json(appUser);
    res.end();
  }).catch(error => {
    res.status(400);
    console.log(error);
    res.json(error);
  });
};

// TODO: doit retourner l'objet mis à jour.
exports.patchAppUser = function (req, res) {
  body = req.body;
  // On check que le mail ait le bon format
  if (body.email && !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(body.email)) {
    // Si c'est pas le cas on rentre ici
    res.status(400);
    res.json({
      'message': 'Invalid email format'
    });
    // Pour arreter la lecture du code on s'arrete avec un return void
    return;
  }
  db.AppUser.update(body, {
    where: {
      id: req.params.id
    },
    returning: true
  }).then(appUser => {
    res.status(200);
    res.json(appUser[1][0]);
  }).catch(error => {
    res.status(500);
    res.json(error);
  });
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

exports.postLogin = async function (req, res) {
  try {
    const { password, email } = req.body

    // Check Pass and Email are present
    if (!password || !email) {
      return res.status(400).json({ message: 'Credentials missings' })
    }

    // Retrieve the User from 
    const appUser = await db.AppUser.findOne({ where: { email: email } })
    if (!appUser) {
      return res.status(400).json({ message: 'Wrong Mail or Pass' })
    }
  
    // Check the pass
    const validPass = await appUser.comparePassword(password)
    if (!validPass) {
      return res.status(400).json({ message: 'Wrong Mail or Pass' })
    }

    // Create the token
    jwt.sign({ id: appUser.id }, privateKey, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({ 'token': token })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Oops something went wrong", detail: error })
  }
}

exports.resetPassword = function (req, res) {
  email = req.body.email
  if (!email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
    res.status(400);
    res.json({ message: "No email provided or Invalid Format" });
  }

  db.AppUser.findOne({
    where: { email: req.body.email }
  }).then(user => {
    jwt.sign({ id: user.id },
      privateKey,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        res.json({ message: "email sent", "url": "" + token });
      });
  }).catch(error => {
    console.log(error);
  })
}

exports.patchPassword = function (req, res) {
  token = jwt.decode(req.query.token);
  password = req.body.password;

  if (!password || !token) {
    res.status(400);
    res.json({ message: "invalid token or no password provided" });
  }

  db.AppUser.update({ "password": password }, {
    where: { id: token.id }
  }).then(user => {
    // TODO: Implementer un system de mailing pour retourner le password
    res.status(200);
    res.json({ message: "Password updated" });
  }).catch(error => {
    res.status(500)
    console.log(error)
  })
}