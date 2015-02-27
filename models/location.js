var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  country: String,
  province: String,
  city: String,
  postal: String,
  Latitude: String,
  Longitude: String
});

module.exports = mongoose.model('Location', LocationSchema);
