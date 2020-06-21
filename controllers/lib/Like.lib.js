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

  db.Like.findAll({
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

exports.patchLike = async function (req, res) {
  const token = ExtractToken.extractToken(req)
  const { preferenceId, typeId } = req.body
  try {
    likeId = await db.sequelize.query('SELECT l.id FROM "Like" l LEFT JOIN "Preference" p on l.preference_id = p.id WHERE l.user_id = ' + token.id + ' AND p.type_id = ' + typeId)
    if (likeId) {
      result = await db.sequelize.query('UPDATE ONLY "Like" l set preference_id = ' + preferenceId + ' FROM "Preference" p WHERE l.user_id = ' + token.id + ' AND p.type_id = ' + typeId)
      res.status(200).json(result)
    } else {
      res.status(404).json({ message: "No previous Like of the same type to patch found."})
    }
  } catch (e) {
    console.log(e)
  }
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
