const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const port = process.env.PORT || 3000
const app = express()
const options = { explorer: true }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Expose-Headers', 'X-Auth')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

require('./controllers/ControllerLoader')(app)

app.get('/', (req, res) => {
  res.status(200).send('Server listening !')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = { app }
