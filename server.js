var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/eventModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tomanino:tomanino1@ds263848.mlab.com:63848/heroku_rtll63l1');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/eventRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Event API server started on: ' + port);