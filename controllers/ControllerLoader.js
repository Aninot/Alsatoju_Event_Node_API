const fs = require('fs')
const path = require('path')

// Getting an Array of the files in the controllers folder.
const files = fs.readdirSync(path.join(__dirname, '/routes/'))

module.exports = app => {
  files.forEach(fileName => {
    require(path.join(__dirname, '/routes/', fileName))(app)
  })
}
