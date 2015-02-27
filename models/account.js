var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  username: String,
  slug: String,
  password: String,
  dateAdded: String,
  dateUpdated: String,
  email: String,
  activated: Boolean,
  apiToken: String,
  recoveryToken: String,
  firstName: String,
  lastName: String,
  dateBirth: String,
  avatarUrl: String,
  avatarEngine: String,
  facebookToken: String,
  twitterToken: String,
  googleToken: String,
  motto: String,
  admin: Boolean
});

module.exports = mongoose.model('Account', AccountSchema);
