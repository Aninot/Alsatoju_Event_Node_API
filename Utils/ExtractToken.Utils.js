const jwt = require('jsonwebtoken')

exports.extractToken = function (req) {
  // Extract the token
  const token = req.headers.authorization.split(' ')[1]
  return jwt.decode(token)
}
