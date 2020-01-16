'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
  name: {
    type: String,
  },
  address:{
    type: String
  },
  description:{
      type: String
  },
  price:{
      type: String
  },
  img:{
      type: String
  },
  baseURL:{
      type: String
  },
  tags:{
    type: String
  },
  start: {
    type: Date,
  },
  end:{
      type: String
  },
  location:{
      type: String
  }
});

module.exports = mongoose.model('Event', EventSchema);