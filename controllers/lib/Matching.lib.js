const Sequelize = require('sequelize')
const db = require('../../models/index')
const ExtractToken = require('../../Utils/ExtractToken.Utils')

/**
 * GET ALL
 * Matchs that have a response from the two users.
 */
exports.getAll = function (req, res) {
  const token = ExtractToken.extractToken(req)

  db.Matching.findAll({
    where: Sequelize.and(
        { responseUserOne: true },
        { responseUserTwo: true }
      ),
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

/**
 * GET One
 * Match that is mine
 */
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

/**
 * PATCH
 * Match that is mine and that I've not responded.
 */
exports.patchMatching = function (req, res) {
  const token = ExtractToken.extractToken(req)
  db.Matching.findOne({
    where: Sequelize.and(
      { id: req.params.id },
      Sequelize.or(
        Sequelize.and(
          { UserOneId: token.id },
          { responseUserOne: null }
        ),
        Sequelize.and(
          { UserTwoId: token.id },
          { responseUserTwo: null }
        )
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
      if (match.dataValues.userOne === parseInt(token.id, 10)) {
        match.set('responseUserOne', req.body.response)
        match.save().then(() => {
          res.status(200)
          res.send(match)
        })
      } else if (match.dataValues.userTwo === parseInt(token.id, 10)) {
        match.set('responseUserTwo', req.body.response)
        match.save().then(() => {
          res.status(200)
          res.send(match)
        })
      } else {
        res.status(404).json({ message: 'Resource not found' })
      }
    } else {
      res.status(404).json({ message: 'Resource not found' })
    }
  }).catch(error => {
    console.log(error)
    res.status(400).json(error)
  })
}

/**
 * DELETE
 * Match (is disable)
 */
exports.deleteMatching = function (req, res) {
  res(204).end()
  // db.Matching.destroy({
  //   where: {
  //     id: req.params.id
  //   }
  // }).then(Matchings => {
  //   // here 204 no content we only send back the status code
  //   res.status(204)
  //   res.end()
  // }).catch(error => {
  //   res.status(400)
  //   res.json(error)
  // })
}

/**
 * GET ALL (new Matchs)
 * Launch the proc stock
 * & return all Match with no response from the current user
 */
exports.refresh = function (req, res) {
  const token = ExtractToken.extractToken(req)

  db.sequelize.query('SELECT do_matching(:id)', {
    replacements: { id: token.id }
  }).then(result => {
    db.Matching.findAll({
      where: Sequelize.or(
        Sequelize.and(
          { UserOneId: token.id },
          { responseUserOne: null }
        ),
        Sequelize.and(
          { UserTwoId: token.id },
          { responseUserTwo: null }
        )
      ),
      attributes: [
        'id',
        'responseUserOne',
        'responseUserTwo',
        ['user_one_id', 'userOne'],
        ['user_two_id', 'userTwo']
      ]
    }).then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'Resource not found' })
      }
    }).catch(error => {
      res.status(400).json(error)
    })
  }).catch(error => {
    res.status(400).json(error)
  })
}
