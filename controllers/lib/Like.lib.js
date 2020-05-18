const db = require('../../models/index')
const Sequelize = require('sequelize')
const ForEach = require('../../services/ForEach.Service')
const ExtractToken = require('../../Utils/ExtractToken.Utils')

var isValid = function (prop) {
  switch (prop) {
    case 'user_id':
      return 'userId'
    case 'preference':
      return prop
    default:
      return false
  }
}

function getQueryParam (filterArray) {
  const filters = {}
  ForEach.forEach(filterArray, function (value, prop, obj) {
    if (isValid(prop)) {
      filters[isValid(prop)] = value
    }
  })
  return filters
}

// GET ALL
exports.getAll = function (req, res) {
  const filters = getQueryParam(req.query)
  const token = ExtractToken.extractToken(req)

  db.Like.findAndCountAll({
    where: Sequelize.and(
      filters || {},
      { userId: token.id }
    )
  }).then(Likes => {
    if (Likes) {
      res.status(200)
      res.json(Likes)
    } else {
      res.status(404)
      res.json({ message: 'No resources founded' })
    }
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}

exports.getOne = function (req, res) {
  db.Like.findOne({ where: { id: req.params.id } }).then(like => {
    if (like) {
      res.status(200)
      res.json(like)
    } else {
      res.status(404)
      res.json({ message: 'Resource not found' })
    }
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}

exports.postLike = function (req, res) {
  db.Like.create({
    userId: req.body.userId,
    filmPreference: req.body.filmPreference,
    musicPreference: req.body.musicPreference,
    otherPreference: req.body.otherPreference
  }).then(Like => {
    res.status(201)
    res.json(Like)
    res.end()
  }).catch(error => {
    res.status(500)
    res.json(error)
  })
}

exports.patchLike = function (req, res) {
  db.Like.update({ where: { id: req.params.id } }).then(Like => {
    res.status(200)
    res.json(Like)
  }).catch(error => {
    res.status(500)
    res.json(error)
  })
}

exports.deleteLike = function (req, res) {
  db.Like.destroy({ where: { id: req.params.id } }).then(Likes => {
    // here 204 no content we only send back the status code
    res.status(204)
    res.end()
  }).catch(error => {
    res.status(400)
    res.json(error)
  })
}
