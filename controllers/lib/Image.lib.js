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
    res.status(201)
    res.json({ message: 'File uploaded successfully! -> filename = ' + req.file.originalname });
  }).catch(err => {
    console.log(err);
    res.status(500)
    res.json({ message: 'Error', detail: err });
  });
}
 
exports.getAll = (req, res) => {
  db.Image.findAll({attributes: ['id', 'name', 'user']}).then(images => {
    res.status(200)
    res.json(images)
  }).catch(err => {
    console.log(err)
    res.status(500)
    res.json({ message: 'Error', detail: err })
  });
}
 
exports.getOne = (req, res) => {
  db.Image.findOne({ where: { user: req.params.id } }).then(image => {
    if (!image) {
      res.status(404)
      return res.json({ message: 'No resultats found' })
    }
    var imageContents = Buffer.from(image.data, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(imageContents);
    
    res.set('Content-disposition', 'attachment; filename=' + image.name);
    res.set('Content-Type', image.type);
 
    readStream.pipe(res);
  }).catch(err => {
    console.log(err);
    res.json({ message: 'Error', detail: err });
  });
}