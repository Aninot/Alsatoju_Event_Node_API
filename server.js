const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'X-Auth');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

require('./controllers/controllerLoader')(app);

app.get('/', (req, res) => {
  res.status(200).send('Server listening !')
});

let port;
process.env.PORT ? port = process.env.PORT : port = 3000

app.listen(port, () => {
  console.log('Listening on port ' + port || 3000);
});

module.exports = { app }
