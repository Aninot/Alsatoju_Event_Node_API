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
    logging: console.log,
    where: Sequelize.and(
      filters || {},
      { userId: token.id }
    ),
    include: [
      { model: db.AppUser, attributes: ['id'], as: 'user' },
      { model: db.Preference, all: true, as: 'preference', nested: true }
    ]
  }).then(Likes => {
    if (Likes) {
      res.status(200)
      res.json(Likes)
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

exports.getOne = function (req, res) {
  db.Like.findOne({
    where: { id: req.params.id },
    include: [
      { model: db.AppUser, attributes: ['id'], as: 'user' },
      { model: db.Preference, all: true, as: 'preference', nested: true }
    ]
  }).then(like => {
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
  const token = ExtractToken.extractToken(req)
  const { preferenceId, preference } = req.body
  db.Like.create({
    userId: token.id,
    preferenceId: preferenceId || preference
  }).then(Like => {
    res.status(201)
    res.json(Like)
    res.end()
  }).catch(error => {
    console.log(error)
    res.status(500)
    res.json(error)
  })
}

exports.patchLike = function (req, res) {
  const token = ExtractToken.extractToken(req)
  db.Like.update(req.body, {
    where: Sequelize.and(
      { id: req.params.id },
      { userId: token.id }
    ),
    returning: true
  }).then(Like => {
    res.status(200)
    res.json(Like[1][0])
  }).catch(error => {
    res.status(500)
    console.log(error)
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
