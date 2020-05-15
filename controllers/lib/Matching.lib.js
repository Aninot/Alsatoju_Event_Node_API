const Sequelize = require('sequelize')
const db = require('../../models/index')
const ExtractToken = require('../../Utils/ExtractToken.Utils')

// GET ALL
exports.getAll = function (req, res) {
  const token = ExtractToken.extractToken(req)

  db.Matching.findAll({
    where:
      // filter to retrieve the matching for the user
      Sequelize.or({
        UserOneId: token.id
      }, {
        UserTwoId: token.id
      }),
    attributes: [
      'id',
      'responseUserOne',
      'responseUserTwo',
      ['user_one_id', 'userOne'],
      ['user_two_id', 'userTwo']
    ]
  }).then(Matchings => {
    if (Matchings) {
      res.status(200)
      res.json(Matchings)
    } else {
      res.status(404)
      res.json({ message: 'No resources founded' })
    }
  }).catch(error => {
    console.log(error)
    res.status(400)
    res.json(error)
  })
}

exports.getMatch = function (req, res) {
  const token = ExtractToken.extractToken(req)

  db.Matching.findOne({
    where: Sequelize.and(
      { id: req.params.id },
      Sequelize.or(
        { UserOneId: token.id },
        { UserTwoId: token.id }
      )
    ),
    attributes: [
      'id',
      'responseUserOne',
      'responseUserTwo',
      ['user_one_id', 'userOne'],
      ['user_two_id', 'userTwo']
    ]
  }).then(match => {
    if (match) {
      res.status(200)
      res.json(match)
    } else {
      res.status(404)
      res.json({ message: 'Resource not found' })
    }
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}

exports.patchMatching = function (req, res) {
  const userId = req.body.id
  db.Matching.findAll({
    where: { id: req.params.id },
    attributes: [
      'id',
      'responseUserOne',
      'responseUserTwo',
      ['user_one_id', 'userOne'],
      ['user_two_id', 'userTwo']
    ]
  }).then(match => {
    if (match) {
      if (match.getDataValue('userOne') === userId) {
        match.set('responseUserOne', req.body.response)
        match.save().then(() => {
          res.status(200)
          res.json(match)
        })
      } else if (match.getDataValue('userTwo') === userId) {
        match.set('responseUserTwo', req.body.response)
        match.save().then(() => {
          res.status(200)
          res.json(match)
        })
      }
    } else {
      res.status(404)
      res.json({ message: 'Resource not found' })
    }
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}

exports.deleteMatching = function (req, res) {
  db.Matching.destroy({
    where: {
      id: req.params.id
    }
  }).then(Matchings => {
    // here 204 no content we only send back the status code
    res.status(204)
    res.end()
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}

exports.refresh = function (req, res) {
  const token = ExtractToken.extractToken(req)

  db.sequelize.query('SELECT do_matching(:id)', {
    replacements: { id: token.id }
  })
    .then(result => {
      db.Matching.findAll({
        where: Sequelize.or({
          UserOneId: token.id
        }, {
          UserTwoId: token.id
        }),
        attributes: [
          'id',
          'responseUserOne',
          'responseUserTwo',
          ['user_one_id', 'userOne'],
          ['user_two_id', 'userTwo']
        ]
      }).then(result => {
        if (result) {
          res.status(200)
          res.json(result)
        } else {
          res.status(404)
          res.json({ message: 'Resource not found' })
        }
      }).catch(error => {
        res.status(400)
        res.json(error)
      })
    })
    .catch(error => {
      res.status(400)
      res.json(error)
    })
}
