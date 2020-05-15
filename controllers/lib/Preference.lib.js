const db = require('../../models/index')
const ForEach = require('../../services/ForEach.Service')

var isValid = function (prop) {
  switch (prop) {
    case 'type_id':
    case 'type':
    case 'types':
      return 'typeId'
    case 'style':
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
  db.Preference.findAndCountAll({ where: filters || {} }).then(Preferences => {
    if (Preferences) {
      res.status(200).json(Preferences)
    } else {
      res.status(404).json({ message: 'No resources founded' })
    }
  }).catch(error => {
    console.log(error)
    res.status(400).json({ message: 'Error', detail: error })
  })
}

exports.getOne = function (req, res) {
  db.Preference.findOne({ where: { id: req.params.id } }).then(preference => {
    if (preference) {
      res.status(200).json(preference)
    } else {
      res.status(404).json({ message: 'Resource not found' })
    }
  }).catch(error => {
    console.log(error)
    res.status(400).json(error)
  })
}

exports.postPreference = function (req, res) {
  const { typeId, style } = req.body

  db.Preference.create({
    typeId: typeId,
    style: style
  }).then(Preference => {
    res.status(201).json(Preference).end()
  }).catch(error => {
    res.status(500).json(error)
  })
}

exports.patchPreference = function (req, res) {
  db.Preference.update({ where: { style: req.params.style } }).then(Preference => {
    res.status(200).json(Preference)
  }).catch(error => {
    res.status(500).json(error)
  })
}

exports.deletePreference = function (req, res) {
  db.Preference.destroy({ where: { id: req.params.id } }).then(Preferences => {
    res.status(204).end()
  }).catch(error => {
    res.status(400).json(error)
  })
}
