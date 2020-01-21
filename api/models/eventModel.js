const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
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

var Event = mongoose.model('Event', EventSchema);
module.exports = { Event }