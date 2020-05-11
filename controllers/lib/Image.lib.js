const stream = require('stream')
const db = require('../../models/index')
const ExtractToken = require('../../Utils/ExtractToken.Utils')
 
exports.uploadFile = (req, res) => {
  const token = ExtractToken.extractToken(req)
  db.Image.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    user: token.id
  }).then(() => {
    return res.status(201).json({ message: 'File uploaded successfully! -> filename = ' + req.file.originalname })
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Error', detail: err })
  })
}

exports.reUploadFile = (req, res) => {
  const token = ExtractToken.extractToken(req)
  const { id } = req.params
  db.Image.update({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
    user: token.id
  }, { where: { user : id }, returning: true },).then(image => {
    if (!image[1].length) {
      return res.status(404).json({ message: 'No Image found' })
    }
    return res.status(200).json({ message: 'File uploaded successfully! -> filename = ' + req.file.originalname })
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Error', detail: err })
  })
}
 
exports.getAll = (req, res) => {
  db.Image.findAll({ attributes: ['id', 'name', 'user'] }).then(images => {
    return res.status(200).json(images)
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Error', detail: err })
  })
}
 
exports.getOne = (req, res) => {
  const { id } = req.params
  db.Image.findOne({ where: { user: id } }).then(image => {
    if (!image) {
      return res.status(404).json({ message: 'No resultats found' })
    }
    var imageContents = Buffer.from(image.data, "base64")
    var readStream = new stream.PassThrough()
    readStream.end(imageContents)
    
    res.set('Content-disposition', 'attachment; filename=' + image.name)
    res.set('Content-Type', image.type)
 
    readStream.pipe(res)
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Error', detail: err })
  })
}

exports.delete = (req, res) => {
  const token = ExtractToken.extractToken(req)
  const { id } = req.params
  if (token.id !== id) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  db.destroy({ where: { id: id } }).then(image => {
    return res.status(204)
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Error', detail: err })
  })
}
